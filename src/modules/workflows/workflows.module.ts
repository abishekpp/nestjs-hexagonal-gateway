import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { WorkflowsHttpController } from './adapters/in/http/controllers/workflows-http.controller';
import { WorkflowServiceGrpcAdapter } from './adapters/out/grpc-client/workflow-service-grpc.adapter';
import { CreateWorkflowGatewayUseCase } from './application/use-cases/create-workflow-gateway.use-case';
import { ListWorkflowsGatewayUseCase } from './application/use-cases/list-workflows-gateway.use-case';
import { UpdateWorkflowStatusGatewayUseCase } from './application/use-cases/update-workflow-status-gateway.use-case';
import { WORKFLOW_SERVICE_CLIENT_PORT } from './ports/out/workflow-service-client.port';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'WORKFLOW_GRPC_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'workflow',
            protoPath: join(
              process.cwd(),
              'src/modules/workflows/adapters/out/grpc-client/proto/workflow.proto',
            ),
            url: configService.get<string>('CORE_SERVICE_GRPC_URL', 'localhost:50052'),
          },
        }),
      },
    ]),
  ],
  controllers: [WorkflowsHttpController],
  providers: [
    CreateWorkflowGatewayUseCase,
    ListWorkflowsGatewayUseCase,
    UpdateWorkflowStatusGatewayUseCase,
    {
      provide: WORKFLOW_SERVICE_CLIENT_PORT,
      useClass: WorkflowServiceGrpcAdapter,
    },
  ],
})
export class WorkflowsModule {}
