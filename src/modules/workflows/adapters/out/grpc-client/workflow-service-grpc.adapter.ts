import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateWorkflowInput } from 'src/modules/workflows/application/dto/inputs/create-workflow.input';
import { UpdateWorkflowStatusInput } from 'src/modules/workflows/application/dto/inputs/update-workflow-status.input';
import { WorkflowOutput } from 'src/modules/workflows/application/dto/outputs/workflow.output';
import { WorkflowServiceClientPort } from 'src/modules/workflows/ports/out/workflow-service-client.port';
import { WorkflowGrpcService } from './workflow-grpc.types';

@Injectable()
export class WorkflowServiceGrpcAdapter implements WorkflowServiceClientPort, OnModuleInit {
  private workflowGrpcService!: WorkflowGrpcService;

  constructor(
    @Inject('WORKFLOW_GRPC_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.workflowGrpcService = this.client.getService<WorkflowGrpcService>('WorkflowService');
  }

  async createWorkflow(input: CreateWorkflowInput): Promise<WorkflowOutput> {
    const response = await firstValueFrom(
      this.workflowGrpcService.createWorkflow({
        projectId: input.projectId,
        subject: input.subject,
        documentIds: input.documentIds,
        recipientIds: input.recipientIds,
        dueDate: input.dueDate,
        remarks: input.remarks,
        createdBy: input.createdBy,
      }),
    );

    return this.toOutput(response);
  }

  async listWorkflows(): Promise<WorkflowOutput[]> {
    const response = await firstValueFrom(this.workflowGrpcService.listWorkflows({}));

    return (response.workflows ?? []).map((workflow) => this.toOutput(workflow));
  }

  async updateWorkflowStatus(input: UpdateWorkflowStatusInput): Promise<WorkflowOutput> {
    const response = await firstValueFrom(
      this.workflowGrpcService.updateWorkflowStatus({
        id: input.id,
        status: input.status,
      }),
    );

    return this.toOutput(response);
  }

  private toOutput(response: {
    id: string;
    projectId: string;
    subject: string;
    documentIds?: string[];
    recipientIds?: string[];
    status: string;
    dueDate?: string;
    remarks?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    transmittalId?: string;
    transmittalNumber?: string;
  }): WorkflowOutput {
    return {
      id: response.id,
      projectId: response.projectId,
      subject: response.subject,
      documentIds: response.documentIds ?? [],
      recipientIds: response.recipientIds ?? [],
      status: response.status,
      dueDate: response.dueDate || undefined,
      remarks: response.remarks || undefined,
      createdBy: response.createdBy,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      completedAt: response.completedAt || undefined,
      transmittalId: response.transmittalId || undefined,
      transmittalNumber: response.transmittalNumber || undefined,
    };
  }
}
