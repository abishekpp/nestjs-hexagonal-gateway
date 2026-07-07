import { Inject, Injectable } from '@nestjs/common';
import {
  WORKFLOW_SERVICE_CLIENT_PORT,
  type WorkflowServiceClientPort,
} from '../../ports/out/workflow-service-client.port';
import { UpdateWorkflowStatusInput } from '../dto/inputs/update-workflow-status.input';
import { WorkflowOutput } from '../dto/outputs/workflow.output';

@Injectable()
export class UpdateWorkflowStatusGatewayUseCase {
  constructor(
    @Inject(WORKFLOW_SERVICE_CLIENT_PORT)
    private readonly workflowServiceClient: WorkflowServiceClientPort,
  ) {}

  async execute(input: UpdateWorkflowStatusInput): Promise<WorkflowOutput> {
    return this.workflowServiceClient.updateWorkflowStatus(input);
  }
}
