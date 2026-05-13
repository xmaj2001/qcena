import { BaseEvent } from './domain-event.base';
import { BaseEntity } from './entity.base';

export abstract class BaseDomain extends BaseEntity {
  private _domainEvents: BaseEvent[] = [];

  get domainEvents(): BaseEvent[] {
    return [...this._domainEvents];
  }

  protected addEvent(event: BaseEvent): void {
    this._domainEvents.push(event);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}
