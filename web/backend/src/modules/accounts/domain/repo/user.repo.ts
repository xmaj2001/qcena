import { UserEntity } from '../entites/user.entity';

export abstract class IUserRepository {
  abstract create(user: UserEntity): Promise<void>;
  abstract update(user: UserEntity): Promise<void>;
  abstract delete(user: UserEntity): Promise<void>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(filter: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ data: UserEntity[]; total: number }>;
}
