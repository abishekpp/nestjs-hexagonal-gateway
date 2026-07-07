import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkflowDataResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  projectId!: string;

  @ApiProperty()
  subject!: string;

  @ApiProperty({ type: [String] })
  documentIds!: string[];

  @ApiProperty({ type: [String] })
  recipientIds!: string[];

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  dueDate?: string;

  @ApiPropertyOptional()
  remarks?: string;

  @ApiProperty()
  createdBy!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional()
  completedAt?: string;

  @ApiPropertyOptional()
  transmittalId?: string;

  @ApiPropertyOptional()
  transmittalNumber?: string;
}
