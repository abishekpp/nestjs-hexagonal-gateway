import { CreateTransmittalInput } from "../../application/dto/inputs/create-transmittal.input";
import { TransmittalOutput } from "../../application/dto/outputs/transmittal.output";

export const TRANSMITTAL_SERVICE_CLIENT_PORT = Symbol('TRANSMITTAL_SERVICE_CLIENT_PORT');

export interface TransmittalServiceClientPort {
    createTransmittal(input: CreateTransmittalInput): Promise<TransmittalOutput>;
    getTransmittalById(id: string): Promise<TransmittalOutput | null>;
}