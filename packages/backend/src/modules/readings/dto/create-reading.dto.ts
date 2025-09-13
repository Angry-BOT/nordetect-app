import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

const VALIDATION_RANGES = {
  NITROGEN: {
    MIN: 0,
    MAX: 500,
  },
  PHOSPHORUS: {
    MIN: 0,
    MAX: 200,
  },
  PH: {
    MIN: 0,
    MAX: 14,
  },
} as const;

const DEVICE_ID_PATTERN = /^[A-Z]{2}\d{3}$/;

export class CreateReadingDto {
  @ApiProperty({
    description: 'Device identifier',
    example: 'GH001',
    pattern: DEVICE_ID_PATTERN.source,
  })
  @IsString()
  @Matches(DEVICE_ID_PATTERN, {
    message: 'Device ID must be in format XX000 (e.g., GH001)',
  })
  deviceId: string;

  @ApiProperty({
    description: 'Timestamp of the reading (optional, defaults to current time)',
    example: '2024-03-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  timestamp?: string;

  @ApiProperty({
    description: 'Nitrogen level in ppm',
    example: 150.5,
    minimum: VALIDATION_RANGES.NITROGEN.MIN,
    maximum: VALIDATION_RANGES.NITROGEN.MAX,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(VALIDATION_RANGES.NITROGEN.MIN)
  @Max(VALIDATION_RANGES.NITROGEN.MAX)
  @Transform(({ value }) => parseFloat(value))
  nitrogen: number;

  @ApiProperty({
    description: 'Phosphorus level in ppm',
    example: 45.2,
    minimum: VALIDATION_RANGES.PHOSPHORUS.MIN,
    maximum: VALIDATION_RANGES.PHOSPHORUS.MAX,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(VALIDATION_RANGES.PHOSPHORUS.MIN)
  @Max(VALIDATION_RANGES.PHOSPHORUS.MAX)
  @Transform(({ value }) => parseFloat(value))
  phosphorus: number;

  @ApiProperty({
    description: 'pH level',
    example: 6.5,
    minimum: VALIDATION_RANGES.PH.MIN,
    maximum: VALIDATION_RANGES.PH.MAX,
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(VALIDATION_RANGES.PH.MIN)
  @Max(VALIDATION_RANGES.PH.MAX)
  @Transform(({ value }) => parseFloat(value))
  ph: number;
}
