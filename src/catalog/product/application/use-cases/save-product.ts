import { Product, PresentationPrimitive } from "../../domain/product";
import { ProductRepository } from "../product-repository";
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
    
    constructor(@inject(TYPES.ProductRepository) productRepository: ProductRepository) { // Inyectamos el repositorio de productos usando inversify
        this.productRepository = productRepository;
    }

    public async execute(data: ProductPrimitives): Promise<void> {

        const product = Product.build(
            data.id,
            data.name,
            data.baseUnit,
            data.presentations
        );
        await this.productRepository.save(product);
    }
}