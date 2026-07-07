import { CreateWorkflowInput } from '../../application/dto/inputs/create-workflow.input';
import { UpdateWorkflowStatusInput } from '../../application/dto/inputs/update-workflow-status.input';
import { WorkflowOutput } from '../../application/dto/outputs/workflow.output';

export const WORKFLOW_SERVICE_CLIENT_PORT = Symbol('WORKFLOW_SERVICE_CLIENT_PORT');

export interface WorkflowServiceClientPort {
  createWorkflow(input: CreateWorkflowInput): Promise<WorkflowOutput>;
  listWorkflows(): Promise<WorkflowOutput[]>;
  updateWorkflowStatus(input: UpdateWorkflowStatusInput): Promise<WorkflowOutput>;
}
