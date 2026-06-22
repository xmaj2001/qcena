import { Injectable } from '@nestjs/common';
import {
  ListAccountsUseCase,
  FindUserByIdUseCase,
  UpdateMeUseCase,
  DeleteMeUseCase,
} from '../use-case';
import { ListAccountsQuery } from '../../presentation/inputs/list-accounts.input';
import { UpdateAccountInput } from '../../presentation/inputs/update-account.input';

@Injectable()
export class UserClientService {
  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateMeUseCase: UpdateMeUseCase,
    private readonly deleteMeUseCase: DeleteMeUseCase,
  ) {}

  async listAccounts(filter: ListAccountsQuery) {
    return this.listAccountsUseCase.execute(filter);
  }

  async findById(id: string) {
    return this.findUserByIdUseCase.execute(id);
  }

  async updateMe(userId: string, input: UpdateAccountInput) {
    return this.updateMeUseCase.execute(userId, input);
  }

  async deleteMe(userId: string) {
    return this.deleteMeUseCase.execute(userId);
  }
}
