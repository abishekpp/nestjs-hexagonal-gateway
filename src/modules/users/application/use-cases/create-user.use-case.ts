import { ConflictException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../ports/out/user.repository.port';
import type { UserRepository } from '../../ports/out/user.repository.port';
import { CreateUserInput } from '../dto/inputs/create-user.input';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const user = User.create({
      id: randomUUID(),
      name: input.name,
      email: input.email,
    });

    return this.userRepository.create(user);
  }
}
