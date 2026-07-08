import { Module } from '@nestjs/common';
import { TransmittalsHttpController } from './adapters/in/http/controllers/transmittals-http.controller';
import { CreateTransmittalGatewayUseCase } from './application/use-cases/create-transmittal-gateway.use-case';
import { GetTransmittalByIdGatewayUseCase } from './application/use-cases/get-transmittal-by-id-gateway.use-case';
import { TRANSMITTAL_SERVICE_CLIENT_PORT } from './ports/out/ transmittal-service-client.port';
import { TransmittalServiceGrpcAdapter } from './adapters/out/grpc-client/transmittal-service-grpc.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TRANSMITTAL_GRPC_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'transmittal',
            protoPath: join(
              process.cwd(),
              'src/modules/transmittals/adapters/out/grpc-client/proto/transmittal.proto',
            ),
            url: configService.get<string>('CORE_SERVICE_GRPC_URL', 'localhost:50052'),
          },
        }),
      },
    ]),
  ],
  controllers: [TransmittalsHttpController],
  providers: [
    CreateTransmittalGatewayUseCase,
    GetTransmittalByIdGatewayUseCase,
    {
      provide: TRANSMITTAL_SERVICE_CLIENT_PORT,
      useClass: TransmittalServiceGrpcAdapter,
    },
  ],
  exports: [],
})
export class TransmittalsModule {}
