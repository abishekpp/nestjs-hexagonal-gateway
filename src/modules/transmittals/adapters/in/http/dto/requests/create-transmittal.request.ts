import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransmittalRequestDto {
  @ApiProperty({
    example: 'project-uuid',
  })
  @IsString()
  projectId!: string;

  @ApiProperty({
    example: 'Issued for review - HVAC shop drawings',
  })
  @IsString()
  @MaxLength(255)
  subject!: string;

  @ApiProperty({
    example: ['document-id-1', 'document-id-2'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  documentIds!: string[];

  @ApiProperty({
    example: ['user-id-1', 'user-id-2'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  recipientIds!: string[];

  @ApiPropertyOptional({
    example: '2026-07-15',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    example: 'Please review and respond within 7 days.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  remarks?: string;
}