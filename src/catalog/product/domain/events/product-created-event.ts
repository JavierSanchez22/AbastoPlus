import { DomainEvent } from "../../../../shared/domain/events/domain-event";

export class ProductCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME = "catalog.product_created";

    constructor(
        productId: string,
        name: string,
        presentations: any[]
    ) {
        super(ProductCreatedEvent.EVENT_NAME, {
            id: productId,
            productName: name,
            presentations: presentations
        });
    }
}