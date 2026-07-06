import { Observable } from "rxjs";

interface CreateTransmittalGrpcRequest {
  projectId: string;
  subject: string;
  documentIds: string[];
  recipientIds: string[];
  dueDate?: string;
  remarks?: string;
  createdBy: string;
}

interface CreateTransmittalGrpcResponse {
  id: string;
  transmittalNumber: string;
  status: string;
  createdAt: string;
}

interface GetTransmittalByIdGrpcRequest {
  id: string;
}

interface TransmittalGrpcResponse {
  id: string;
  transmittalNumber: string;
  projectId: string;
  subject: string;
  documentIds: string[];
  recipientIds: string[];
  status: string;
  dueDate?: string;
  remarks?: string;
  createdBy: string;
  createdAt: string;
}

export interface TransmittalGrpcService {
  createTransmittal(
    data: CreateTransmittalGrpcRequest,
  ): Observable<CreateTransmittalGrpcResponse>;

  getTransmittalById(
    data: GetTransmittalByIdGrpcRequest,
  ): Observable<TransmittalGrpcResponse>;
}