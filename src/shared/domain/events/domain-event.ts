export abstract class DomainEvent {
    readonly occurredOn: Date;

    constructor(
        readonly eventName: string, // Nombre del evento
        readonly payload: any       // Payload
    ) {
        this.occurredOn = new Date();
    }
}