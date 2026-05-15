import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repo/user.repo';
import { ListAccountsQuery } from '../../presentation/inputs/list-accounts.input';

@Injectable()
export class ListAccountsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(filter: ListAccountsQuery) {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;

    const { data, total } = await this.userRepository.findAll({
      page,
      limit,
      search: filter.search,
    });
    return {
      items: data.map((user) => user.toPublicData()),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
