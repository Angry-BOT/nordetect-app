import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('readings')
export class Reading {
  @ApiProperty({
    description: 'Unique identifier for the reading',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Device identifier',
    example: 'GH001',
    pattern: '^[A-Z]{2}\\d{3}$',
  })
  @Column({ length: 10 })
  deviceId: string;

  @ApiProperty({
    description: 'Timestamp of the reading',
    example: '2024-03-15T10:30:00Z',
  })
  @CreateDateColumn()
  timestamp: Date;

  @ApiProperty({
    description: 'Nitrogen level in ppm',
    example: 150.5,
    minimum: 0,
    maximum: 500,
  })
  @Column('decimal', { precision: 6, scale: 2 })
  nitrogen: number;

  @ApiProperty({
    description: 'Phosphorus level in ppm',
    example: 45.2,
    minimum: 0,
    maximum: 200,
  })
  @Column('decimal', { precision: 6, scale: 2 })
  phosphorus: number;

  @ApiProperty({
    description: 'pH level',
    example: 6.5,
    minimum: 0,
    maximum: 14,
  })
  @Column('decimal', { precision: 3, scale: 1 })
  ph: number;
}
