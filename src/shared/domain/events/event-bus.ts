import { DomainEvent } from "./domain-event";

export interface DomainEventSubscriber<T extends DomainEvent> {
    on(event: T): Promise<void>;
}

export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(eventName: string, subscribers: DomainEventSubscriber<DomainEvent>[]): void;
}