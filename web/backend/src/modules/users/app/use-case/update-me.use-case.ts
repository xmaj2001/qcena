import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repo/user.repo';
import { UpdateAccountInput } from '../../presentation/inputs/update-account.input';

@Injectable()
export class UpdateMeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, input: UpdateAccountInput) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.updateProfile({
      name: input.name,
      image: input.image,
      gender: input.gender,
      birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
    });

    await this.userRepository.update(user);
    return user.toPublicData();
  }
}
