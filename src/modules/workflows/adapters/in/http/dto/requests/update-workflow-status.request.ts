import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateWorkflowStatusRequestDto {
  @ApiProperty({
    example: 'COMPLETED',
    enum: ['COMPLETED'],
  })
  @IsIn(['COMPLETED'])
  status!: 'COMPLETED';
}
