import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { USER_REPOSITORY } from './ports/out/user.repository.port';
import { PrismaUserRepository } from './adapters/out/persistence/prisma/prisma-user.repository.adapter';
import { UsersController } from './adapters/in/http/controllers/users.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
