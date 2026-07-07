import { Observable } from 'rxjs';

interface CreateWorkflowGrpcRequest {
  projectId: string;
  subject: string;
  documentIds: string[];
  recipientIds: string[];
  dueDate?: string;
  remarks?: string;
  createdBy: string;
}

interface ListWorkflowsGrpcRequest {
  [key: string]: never;
}

interface UpdateWorkflowStatusGrpcRequest {
  id: string;
  status: string;
}

interface WorkflowGrpcResponse {
  id: string;
  projectId: string;
  subject: string;
  documentIds: string[];
  recipientIds: string[];
  status: string;
  dueDate?: string;
  remarks?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  transmittalId?: string;
  transmittalNumber?: string;
}

interface ListWorkflowsGrpcResponse {
  workflows: WorkflowGrpcResponse[];
}

export interface WorkflowGrpcService {
  createWorkflow(data: CreateWorkflowGrpcRequest): Observable<WorkflowGrpcResponse>;
  listWorkflows(data: ListWorkflowsGrpcRequest): Observable<ListWorkflowsGrpcResponse>;
  updateWorkflowStatus(data: UpdateWorkflowStatusGrpcRequest): Observable<WorkflowGrpcResponse>;
}
