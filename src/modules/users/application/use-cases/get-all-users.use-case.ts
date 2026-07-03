import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../ports/out/user.repository.port';
import type { UserRepository } from '../../ports/out/user.repository.port';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
