import { ApiProperty } from '@nestjs/swagger';

export class CreateTransmittalDataResponseDto {
  @ApiProperty({ example: 'transmittal-id' })
  id!: string;

  @ApiProperty({ example: 'TRN-2026-0001' })
  transmittalNumber!: string;

  @ApiProperty({ example: 'DRAFT' })
  status!: string;

  @ApiProperty({ example: '2026-07-03T08:00:00.000Z' })
  createdAt!: string;
}