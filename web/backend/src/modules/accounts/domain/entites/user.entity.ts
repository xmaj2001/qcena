import { BaseDomain } from 'src/shared/base/base-domain.base';
import {
  UserCreatedEvent,
  UserEmailVerifiedEvent,
  UserProfileUpdatedEvent,
} from '../events/user.events';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UserGenderEnum } from './enums/user.gender.enum';

interface UserProps {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  gender?: UserGenderEnum;
  birthDate?: Date | null;
}

export class UserEntity extends BaseDomain {
  private props: UserProps;

  private constructor(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  // ── create — novo user ────────────────────────────────────────────────────
  static create(input: {
    name: string;
    email: string;
    image?: string;
    gender?: UserGenderEnum;
    birthDate?: Date;
  }): UserEntity {
    if (!input.name.trim()) throw new BadRequestException('Nome é obrigatório');
    if (!input.email.includes('@'))
      throw new BadRequestException('Email inválido');

    const user = new UserEntity({
      name: input.name.trim(),
      email: input.email.toLowerCase(),
      emailVerified: false,
      image: input.image ?? null,
      gender: input.gender ?? UserGenderEnum.MALE,
      birthDate: input.birthDate ?? null,
    });

    user.addEvent(new UserCreatedEvent(user.id, user.email, user.name));
    return user;
  }

  // ── reconstruct — vem do banco ────────────────────────────────────────────
  static reconstruct(
    props: UserProps & {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ): UserEntity {
    const { id, createdAt, updatedAt, ...rest } = props;
    return new UserEntity(rest, id, createdAt, updatedAt);
  }

  // ── Getters ───────────────────────────────────────────────────────────────
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get emailVerified() {
    return this.props.emailVerified;
  }
  get image() {
    return this.props.image;
  }
  get gender() {
    return this.props.gender;
  }
  get birthDate() {
    return this.props.birthDate;
  }

  // ── Métodos de negócio ────────────────────────────────────────────────────
  verifyEmail(): void {
    if (this.props.emailVerified)
      throw new ConflictException('Email já verificado');
    this.props.emailVerified = true;
    this.touch();
    this.addEvent(new UserEmailVerifiedEvent(this.id));
  }

  updateProfile(input: {
    name?: string;
    image?: string;
    gender?: UserGenderEnum;
    birthDate?: Date;
  }): void {
    if (input.name !== undefined) {
      if (!input.name.trim())
        throw new BadRequestException('Nome não pode ser vazio');
      this.props.name = input.name.trim();
    }
    if (input.image !== undefined) this.props.image = input.image;
    if (input.gender !== undefined) this.props.gender = input.gender;
    if (input.birthDate !== undefined) this.props.birthDate = input.birthDate;

    this.touch();
    this.addEvent(new UserProfileUpdatedEvent(this.id));
  }

  isVerified(): boolean {
    return this.props.emailVerified;
  }

  // ── Persistência ──────────────────────────────────────────────────────────
  toPersistence() {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
      emailVerified: this.props.emailVerified,
      image: this.props.image ?? null,
      gender: this.props.gender ?? null,
      birthDate: this.props.birthDate ?? null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  toPublicData() {
    return {
      id: this.id,
      name: this.props.name,
      image: this.props.image,
      gender: this.props.gender,
      birthDate: this.props.birthDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
