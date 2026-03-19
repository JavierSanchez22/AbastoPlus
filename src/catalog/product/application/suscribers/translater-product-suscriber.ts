import { injectable, inject } from "inversify";
import { DomainEventSubscriber } from "../../../../shared/domain/events/event-bus";
import { ProductCreatedEvent } from "../../domain/events/product-created-event";
import { TranslatorService } from "../ports/translator-servicie";
import { ProductRepository } from "../product-repository";
import { TYPES } from "../../../../types";

@injectable()
export class TranslateProductSubscriber implements DomainEventSubscriber<ProductCreatedEvent> {
    
    constructor(
        @inject(TYPES.ProductRepository) private readonly repository: ProductRepository,
        @inject(TYPES.TranslatorService) private readonly translator: TranslatorService
    ) {}

    async on(event: ProductCreatedEvent): Promise<void> {
        const payload = event.payload;

        // Se debe buscar el producto dentro de la base de datos
        const product = await this.repository.findById(payload.id);
        if (!product) return;  // Si no se encuentra entonces regresamos

        console.log(`[Event Bus] Traduciendo producto ${payload.id} en segundo plano...`);

        // Se ejecuta la lógica de traducción (lo que estaba dentro de el save product)
        const translatedName = await this.translator.translateToEnglish(payload.productName);

        const translatedPresentations = await Promise.all(
            payload.presentations.map(async (p: any) => ({
                ...p,
                name: await this.translator.translateToEnglish(p.name)
            }))
        );

        // Se inyecta la traducción a la Entidad
        product.updateTranslations(translatedName, translatedPresentations);

        // Se actualiza la base de datos
        await this.repository.save(product);
        
        console.log(`[Event Bus] Producto ${payload.id} actualizado a inglés correctamente.`);
    }
}