import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repo/user.repo';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user.toPublicData();
  }
}
