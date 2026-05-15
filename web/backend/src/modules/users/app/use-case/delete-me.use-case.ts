import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repo/user.repo';

@Injectable()
export class DeleteMeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.delete(user);
    return { success: true, message: 'Conta eliminada com sucesso' };
  }
}
