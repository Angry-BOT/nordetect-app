import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { QueryReadingDto } from './dto/query-reading.dto';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {}

  async create(createReadingDto: CreateReadingDto): Promise<Reading> {
    try {
      const reading = this.readingRepository.create({
        ...createReadingDto,
        timestamp: createReadingDto.timestamp ? new Date(createReadingDto.timestamp) : new Date(),
      });

      return await this.readingRepository.save(reading);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException('Failed to create reading: ' + message);
    }
  }

  async findAll(queryDto: QueryReadingDto = {}): Promise<Reading[]> {
    const { deviceId, startDate, endDate, limit = 1000 } = queryDto;
    
    // Default to last 24 hours if no date range provided
    const defaultStartDate = new Date();
    defaultStartDate.setHours(defaultStartDate.getHours() - 24);

    const queryBuilder = this.readingRepository.createQueryBuilder('reading');

    if (deviceId) {
      queryBuilder.andWhere('reading.deviceId = :deviceId', { deviceId });
    }

    if (startDate) {
      queryBuilder.andWhere('reading.timestamp >= :startDate', { startDate: new Date(startDate) });
    } else {
      queryBuilder.andWhere('reading.timestamp >= :defaultStartDate', { defaultStartDate });
    }

    if (endDate) {
      queryBuilder.andWhere('reading.timestamp <= :endDate', { endDate: new Date(endDate) });
    }

    return await queryBuilder
      .orderBy('reading.timestamp', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findLatestByDevice(): Promise<Reading[]> {
    const query = `
      SELECT r.*
      FROM readings r
      INNER JOIN (
        SELECT deviceId, MAX(timestamp) as max_timestamp
        FROM readings
        GROUP BY deviceId
      ) latest ON r.deviceId = latest.deviceId AND r.timestamp = latest.max_timestamp
      ORDER BY r.deviceId ASC
    `;

    return await this.readingRepository.query(query);
  }

  async findOne(id: string): Promise<Reading> {
    const reading = await this.readingRepository.findOne({ where: { id } });
    
    if (!reading) {
      throw new NotFoundException(`Reading with ID ${id} not found`);
    }
    
    return reading;
  }

  async getDeviceCount(): Promise<number> {
    const result = await this.readingRepository
      .createQueryBuilder('reading')
      .select('COUNT(DISTINCT reading.deviceId)', 'count')
      .getRawOne();
    
    return parseInt(result.count, 10);
  }

  async getTotalReadings(): Promise<number> {
    return await this.readingRepository.count();
  }
}
