import { Module } from '@nestjs/common';
import { TransmittalsHttpController } from './adapters/in/http/controllers/transmittals-http.controller';
import { CreateTransmittalGatewayUseCase } from './application/use-cases/create-transmittal-gateway.use-case';
import { GetTransmittalByIdGatewayUseCase } from './application/use-cases/get-transmittal-by-id-gateway.use-case';
import { TRANSMITTAL_SERVICE_CLIENT_PORT } from './ports/out/ transmittal-service-client.port';
import { TransmittalServiceGrpcAdapter } from './adapters/out/grpc-client/transmittal-service-grpc.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TRANSMITTAL_GRPC_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'transmittal',
                    protoPath: join(__dirname, 'src/modules/transmittals/adapters/out/grpc-client/proto/transmittal.proto',),
                    url:  process.env.TRANSMITTAL_SERVICE_GRPC_URL ?? 'localhost:50052',
                },
            }
        ])
    ],
    controllers: [TransmittalsHttpController],
    providers: [
        CreateTransmittalGatewayUseCase,
        GetTransmittalByIdGatewayUseCase,
        {
            provide: TRANSMITTAL_SERVICE_CLIENT_PORT,
            useClass: TransmittalServiceGrpcAdapter
        }
    ],
    exports: [],
})
export class TransmittalsModule {}
