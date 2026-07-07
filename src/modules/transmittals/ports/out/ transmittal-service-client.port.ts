import { CreateTransmittalInput } from '../../application/dto/inputs/create-transmittal.input';
import { CreateTransmittalOutput } from '../../application/dto/outputs/create-transmittal.output';
import { TransmittalOutput } from '../../application/dto/outputs/transmittal.output';

export const TRANSMITTAL_SERVICE_CLIENT_PORT = Symbol('TRANSMITTAL_SERVICE_CLIENT_PORT');

export interface TransmittalServiceClientPort {
  createTransmittal(input: CreateTransmittalInput): Promise<CreateTransmittalOutput>;
  getTransmittalById(id: string): Promise<TransmittalOutput | null>;
}
