import { IUserRepository } from 'src/modules/accounts/domain/repo/user.repo';
import { UserEntity } from 'src/modules/accounts/domain/entites/user.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { User } from 'src/shared/infra/prisma/generated/prisma/client';
import { UserGenderEnum } from '../../domain/entites/enums/user.gender.enum';

@Injectable()
export class UserPrismaRepo implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: user.toPersistence(),
    });
  }

  async update(user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: user.toPersistence(),
    });
  }

  async delete(user: UserEntity): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.toEntity(user) : null;
  }

  async findAll(filter: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ data: UserEntity[]; total: number }> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: filter.search } },
          { email: { contains: filter.search } },
        ],
      },
      skip: (filter.page - 1) * filter.limit, //TODO: Não usar skip pois se tiver muito dado ele fica lento, mas quando tiver pouco é mais rápido
      take: filter.limit, //TODO: Não usar take pois se tiver muito dado ele fica lento, mas quando tiver pouco é mais rápido
    });
    const total = await this.prisma.user.count({
      where: {
        OR: [
          { name: { contains: filter.search } },
          { email: { contains: filter.search } },
        ],
      },
    });
    return { data: users.map((user) => this.toEntity(user)), total };
  }

  private toEntity(data: User): UserEntity {
    const user = UserEntity.reconstruct({
      id: data.id,
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      image: data.image,
      gender: data.gender as UserGenderEnum,
      birthDate: data.birthDate as Date | null,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    return user;
  }
}
