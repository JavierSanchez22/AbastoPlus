import { injectable } from "inversify";
import { EventBus, DomainEventSubscriber } from "../../domain/events/event-bus";
import { DomainEvent } from "../../domain/events/domain-event";

@injectable()
export class InMemoryEventBus implements EventBus {
    // Este es el Map<Key, Array<Subscribers>>
    private subscriptions = new Map<string, DomainEventSubscriber<DomainEvent>[]>();

    public addSubscribers(eventName: string, subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        this.subscriptions.set(eventName, subscribers);
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            const subscribers = this.subscriptions.get(event.eventName);
            if (subscribers) {
                // Ejecuta cada suscriptor de la cola
                await Promise.all(subscribers.map(subscriber => subscriber.on(event)));
            }
        }
    }
}