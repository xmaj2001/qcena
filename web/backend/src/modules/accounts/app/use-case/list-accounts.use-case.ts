import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repo/user.repo';
import { ListAccountsQuery } from '../../presentation/inputs/list-accounts.input';
import { SendEmailPort } from 'src/shared/transports/sendEmail/send-email-port';

@Injectable()
export class ListAccountsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sendEmailPort: SendEmailPort,
  ) {}

  async execute(filter: ListAccountsQuery) {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;

    const { data, total } = await this.userRepository.findAll({
      page,
      limit,
      search: filter.search,
    });
    // teste email
    await this.sendEmailPort.send({
      to: 'xmaj2001@gmail.com',
      subject: 'teste',
      html: '<p>teste</p>',
    });
    return {
      data: data.map((user) => user.toPublicData()),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
