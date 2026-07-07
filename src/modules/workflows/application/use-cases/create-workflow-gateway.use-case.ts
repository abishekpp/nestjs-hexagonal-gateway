import { Inject, Injectable } from '@nestjs/common';
import {
  WORKFLOW_SERVICE_CLIENT_PORT,
  type WorkflowServiceClientPort,
} from '../../ports/out/workflow-service-client.port';
import { CreateWorkflowInput } from '../dto/inputs/create-workflow.input';
import { WorkflowOutput } from '../dto/outputs/workflow.output';

@Injectable()
export class CreateWorkflowGatewayUseCase {
  constructor(
    @Inject(WORKFLOW_SERVICE_CLIENT_PORT)
    private readonly workflowServiceClient: WorkflowServiceClientPort,
  ) {}

  async execute(input: CreateWorkflowInput): Promise<WorkflowOutput> {
    return this.workflowServiceClient.createWorkflow(input);
  }
}
