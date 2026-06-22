import { BaseEvent } from 'src/shared/domain/domain-event.base';

export class UserCreatedEvent extends BaseEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
  ) {
    super('user.created');
  }
}

export class UserEmailVerifiedEvent extends BaseEvent {
  constructor(public readonly userId: string) {
    super('user.email_verified');
  }
}

export class UserProfileUpdatedEvent extends BaseEvent {
  constructor(public readonly userId: string) {
    super('user.profile_updated');
  }
}
