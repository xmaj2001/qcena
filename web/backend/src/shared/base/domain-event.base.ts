export abstract class BaseEvent {
  public readonly _eventName: string;
  public readonly occurredAt: Date;
  constructor(eventName: string) {
    this._eventName = eventName;
    this.occurredAt = new Date();
  }
}
