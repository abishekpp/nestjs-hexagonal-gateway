import { Inject, Injectable } from "@nestjs/common";
import { TRANSMITTAL_SERVICE_CLIENT_PORT } from "../../ports/out/ transmittal-service-client.port";
import type { TransmittalServiceClientPort } from "../../ports/out/ transmittal-service-client.port";
import { CreateTransmittalInput } from "../dto/inputs/create-transmittal.input";
import { CreateTransmittalOutput } from "../dto/outputs/create-transmittal.output";

@Injectable()
export class CreateTransmittalGatewayUseCase {
    constructor(
        @Inject(TRANSMITTAL_SERVICE_CLIENT_PORT)
        private readonly transmittalServiceClientPort: TransmittalServiceClientPort
    ) {}

    async execute(input: CreateTransmittalInput): Promise<CreateTransmittalOutput> {
        return this.transmittalServiceClientPort.createTransmittal(input);
    }
}