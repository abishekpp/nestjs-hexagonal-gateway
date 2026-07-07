import { WorkflowOutput } from '../../../../application/dto/outputs/workflow.output';
import { WorkflowDataResponseDto } from '../dto/responses/workflow.response';

export function toWorkflowResponse(output: WorkflowOutput): WorkflowDataResponseDto {
  return {
    id: output.id,
    projectId: output.projectId,
    subject: output.subject,
    documentIds: output.documentIds,
    recipientIds: output.recipientIds,
    status: output.status,
    dueDate: output.dueDate,
    remarks: output.remarks,
    createdBy: output.createdBy,
    createdAt: output.createdAt,
    updatedAt: output.updatedAt,
    completedAt: output.completedAt,
    transmittalId: output.transmittalId,
    transmittalNumber: output.transmittalNumber,
  };
}
