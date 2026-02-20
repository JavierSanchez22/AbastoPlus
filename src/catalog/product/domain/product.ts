import { ProductName } from "./value-objects/product-name";
import { ProductID } from "./value-objects/product-id";
import { ProductBaseUnit, ProductBaseUnitEnum } from "./value-objects/product-base-unit";
import { Presentation } from "./entities/presentation";
import { PresentationID } from './entities/presentation/presentation-id';
import { PresentationName } from './entities/presentation/presentation-name';
import { PresentationType } from './entities/presentation/presentation-type';
import { PresentationNetQuantity } from './entities/presentation/presentation-net-quantity';
import { PresentationUnitOfMeasure } from './entities/presentation/presentation-unit-of-measure';

export interface PresentationPrimitive {
    id: string;
    name: string;
    type: string;
    netQuantity: number;
    unitOfMeasure: string; 
}

export class Product {
    private readonly productId: ProductID;
    private readonly productName: ProductName;
    private readonly productBaseUnit: ProductBaseUnit;
    private _presentations: Presentation[];
    
    private constructor(productId: ProductID, productName: ProductName, productBaseUnit: ProductBaseUnit, presentations: Presentation[] = []) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseUnit = productBaseUnit;
        this._presentations = [];
    }

    get presentations(): Presentation[] {
    return [...this._presentations];
    }

    public static build(id: string, name: string, baseUnit: string, presentations: PresentationPrimitive[] = []): Product {
        
        const product = new Product(
            new ProductID(id),
            new ProductName(name),
            new ProductBaseUnit(baseUnit as ProductBaseUnitEnum)
        );

        for (const p of presentations) {
            const presentationEntity = new Presentation(
                new PresentationID(p.id),
                new PresentationName(p.name),
                new PresentationType(p.type),
                new PresentationNetQuantity(p.netQuantity),
                new PresentationUnitOfMeasure(p.unitOfMeasure)
            );

            product.addPresentation(presentationEntity);
        }
        
        return product
    }

    public addPresentation(presentation: Presentation): void {
        if (presentation.unitOfMeasure.value !== this.productBaseUnit.value) {
            throw new Error(
                `Error: La unidad de medida de la presentación (${presentation.unitOfMeasure.value}) debe coincidir con la unidad base del producto (${this.productBaseUnit.value}).`);
        }
        // Menor o igual a 5 presentaciones por producto
        if (this._presentations.length >= 5) {
            throw new Error(
                `Error: El producto "${this.productName.value}" ya tiene el máximo permitido de 5 presentaciones.`);
        }
        this._presentations.push(presentation);
    }
}