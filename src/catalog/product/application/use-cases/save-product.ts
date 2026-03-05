import { Product, PresentationPrimitive } from "../../domain/product";
import { ProductRepository } from "../product-repository";
import { TranslatorService } from "../ports/translator-servicie";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../../types";

export interface ProductPrimitives {
    id: string;
    name: string;
    baseUnit: string;
    presentations: PresentationPrimitive[];
}

@injectable() // Esto es para que se pueda inyectar esta clase con inversify
export class SaveProduct {
    private readonly productRepository: ProductRepository;
    
    constructor(
        @inject(TYPES.ProductRepository) productRepository: ProductRepository,
        @inject(TYPES.TranslatorService) private readonly translatorService: TranslatorService
    ) { // Inyectamos el repositorio de productos y el servicio de traducción usando inversify
        this.productRepository = productRepository;
    }

    public async execute(data: ProductPrimitives): Promise<void> {
        const translatedName = await this.translatorService.translateToEnglish(data.name);

        const translatedPresentations = await Promise.all(
            data.presentations.map(async (p) => ({
                ...p,
                name: await this.translatorService.translateToEnglish(p.name)
            }))
        );

        const product = Product.build(
            data.id,
            translatedName,
            data.baseUnit,
            translatedPresentations
        );
        await this.productRepository.save(product);
    }
}