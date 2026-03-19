import { Product, PresentationPrimitive } from "../../domain/product";
import { ProductRepository } from "../product-repository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../../types";
import { EventBus } from "../../../../shared/domain/events/event-bus";
import { ProductCreatedEvent } from "../../domain/events/product-created-event";

export interface ProductPrimitives {
    id: string;
    name: string;
    baseUnit: string;
    presentations: PresentationPrimitive[];
}

@injectable()
export class SaveProduct {
    
    constructor(
        @inject(TYPES.ProductRepository) private readonly productRepository: ProductRepository,
        @inject(TYPES.EventBus) private readonly eventBus: EventBus
    ) {}

    public async execute(data: ProductPrimitives): Promise<void> {
        // Se construye el producto en español
        const product = Product.build(
            data.id,
            data.name,
            data.baseUnit,
            data.presentations
        );
        
        // Se guarda en la base de datos
        await this.productRepository.save(product);
        
        // Se dispara el evento al Bus pasando los primitivos (el Payload)
        await this.eventBus.publish([
            new ProductCreatedEvent(
                product.getProductId().value, 
                product.getProductName().value,
                data.presentations
            )
        ]);
    }
}