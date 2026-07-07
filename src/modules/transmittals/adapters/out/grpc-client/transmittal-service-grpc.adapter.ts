import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TransmittalServiceClientPort } from 'src/modules/transmittals/ports/out/ transmittal-service-client.port';
import { TransmittalGrpcService } from './transmittal-grpc.types';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTransmittalInput } from 'src/modules/transmittals/application/dto/inputs/create-transmittal.input';
import { CreateTransmittalOutput } from 'src/modules/transmittals/application/dto/outputs/create-transmittal.output';
import { TransmittalOutput } from 'src/modules/transmittals/application/dto/outputs/transmittal.output';

@Injectable()
export class TransmittalServiceGrpcAdapter implements TransmittalServiceClientPort, OnModuleInit {
  private transmittalGrpcService!: TransmittalGrpcService;

  constructor(
    @Inject('TRANSMITTAL_GRPC_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.transmittalGrpcService =
      this.client.getService<TransmittalGrpcService>('TransmittalService');
  }

  async createTransmittal(input: CreateTransmittalInput): Promise<CreateTransmittalOutput> {
    const response = await firstValueFrom(
      this.transmittalGrpcService.createTransmittal({
        projectId: input.projectId,
        subject: input.subject,
        documentIds: input.documentIds,
        recipientIds: input.recipientIds,
        dueDate: input.dueDate,
        remarks: input.remarks,
        createdBy: input.createdBy,
      }),
    );

    return {
      id: response.id,
      transmittalNumber: response.transmittalNumber,
      status: response.status,
      createdAt: response.createdAt,
    };
  }

  async getTransmittalById(id: string): Promise<TransmittalOutput | null> {
    const response = await firstValueFrom(this.transmittalGrpcService.getTransmittalById({ id }));

    if (!response) {
      return null;
    }

    return {
      id: response.id,
      transmittalNumber: response.transmittalNumber,
      projectId: response.projectId,
      subject: response.subject,
      documentIds: response.documentIds ?? [],
      recipientIds: response.recipientIds ?? [],
      status: response.status,
      dueDate: response.dueDate,
      remarks: response.remarks,
      createdBy: response.createdBy,
      createdAt: response.createdAt,
    };
  }
}
