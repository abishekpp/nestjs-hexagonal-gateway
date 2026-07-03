export interface TransmittalOutput {
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