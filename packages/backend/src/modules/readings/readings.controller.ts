import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ReadingsService } from './readings.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { QueryReadingDto } from './dto/query-reading.dto';
import { Reading } from './entities/reading.entity';

@ApiTags('readings')
@Controller('api/readings')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new sensor reading' })
  @ApiBody({ type: CreateReadingDto })
  @ApiResponse({
    status: 201,
    description: 'Reading successfully created',
    type: Reading,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async create(@Body() createReadingDto: CreateReadingDto): Promise<Reading> {
    return await this.readingsService.create(createReadingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all readings (last 24 hours by default)' })
  @ApiQuery({ name: 'deviceId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'List of readings',
    type: [Reading],
  })
  async findAll(@Query() queryDto: QueryReadingDto): Promise<Reading[]> {
    return await this.readingsService.findAll(queryDto);
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get the most recent reading for each device' })
  @ApiResponse({
    status: 200,
    description: 'Latest readings by device',
    type: [Reading],
  })
  async findLatest(): Promise<Reading[]> {
    return await this.readingsService.findLatestByDevice();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get basic statistics' })
  @ApiResponse({
    status: 200,
    description: 'Basic statistics',
    schema: {
      type: 'object',
      properties: {
        totalReadings: { type: 'number' },
        deviceCount: { type: 'number' },
      },
    },
  })
  async getStats(): Promise<{ totalReadings: number; deviceCount: number }> {
    const [totalReadings, deviceCount] = await Promise.all([
      this.readingsService.getTotalReadings(),
      this.readingsService.getDeviceCount(),
    ]);

    return { totalReadings, deviceCount };
  }
}
