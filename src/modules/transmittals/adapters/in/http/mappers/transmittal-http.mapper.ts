import { CreateTransmittalOutput } from '../../../../application/dto/outputs/create-transmittal.output';
import { TransmittalOutput } from '../../../../application/dto/outputs/transmittal.output';
import { CreateTransmittalDataResponseDto } from '../dto/responses/create-transmittal.response';
import { TransmittalDataResponseDto } from '../dto/responses/transmittal.response';

export class TransmittalHttpMapper {
  static toCreateResponse(
    output: CreateTransmittalOutput,
  ): CreateTransmittalDataResponseDto {
    return {
      id: output.id,
      transmittalNumber: output.transmittalNumber,
      status: output.status,
      createdAt: output.createdAt,
    };
  }

  static toResponse(output: TransmittalOutput): TransmittalDataResponseDto {
    return {
      id: output.id,
      transmittalNumber: output.transmittalNumber,
      projectId: output.projectId,
      subject: output.subject,
      documentIds: output.documentIds,
      recipientIds: output.recipientIds,
      status: output.status,
      dueDate: output.dueDate,
      remarks: output.remarks,
      createdBy: output.createdBy,
      createdAt: output.createdAt,
    };
  }
}