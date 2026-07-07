import { Inject, Injectable } from '@nestjs/common';
import {
  TRANSMITTAL_SERVICE_CLIENT_PORT,
  type TransmittalServiceClientPort,
} from '../../ports/out/ transmittal-service-client.port';
import { TransmittalOutput } from '../dto/outputs/transmittal.output';

@Injectable()
export class GetTransmittalByIdGatewayUseCase {
  constructor(
    @Inject(TRANSMITTAL_SERVICE_CLIENT_PORT)
    private readonly transmittalServiceClient: TransmittalServiceClientPort,
  ) {}

  async execute(id: string): Promise<TransmittalOutput | null> {
    return this.transmittalServiceClient.getTransmittalById(id);
  }
}
