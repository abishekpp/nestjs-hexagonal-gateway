import { Inject, Injectable } from '@nestjs/common';
import {
  WORKFLOW_SERVICE_CLIENT_PORT,
  type WorkflowServiceClientPort,
} from '../../ports/out/workflow-service-client.port';
import { WorkflowOutput } from '../dto/outputs/workflow.output';

@Injectable()
export class ListWorkflowsGatewayUseCase {
  constructor(
    @Inject(WORKFLOW_SERVICE_CLIENT_PORT)
    private readonly workflowServiceClient: WorkflowServiceClientPort,
  ) {}

  async execute(): Promise<WorkflowOutput[]> {
    return this.workflowServiceClient.listWorkflows();
  }
}
