import { Product, PresentationPrimitive } from "../../domain/product";
import { ProductRepository } from "../product-repository";

export interface ProductPrimitives {
    id: string;
    name: string;
    baseUnit: string;
    presentations: PresentationPrimitive[];
}

export class SaveProduct {
    private readonly productRepository: ProductRepository;
    
    constructor(productRepository: ProductRepository) {
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