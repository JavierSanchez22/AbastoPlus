import { ProductName } from "./value-objects/product-name";
import { ProductID } from "./value-objects/product-id";
import { ProductBaseUnit, ProductBaseUnitEnum } from "./value-objects/product-base-unit";

export class Product {
    private readonly productId: ProductID;
    private readonly productName: ProductName;
    private readonly productBaseUnit: ProductBaseUnit;
    
    private constructor(productId: ProductID, productName: ProductName, productBaseUnit: ProductBaseUnit) {
        this.productId = productId;
        this.productName = productName;
        this.productBaseUnit = productBaseUnit;
    }

    public static build(id: string, name: string, baseUnit: string): Product {
        return new Product(
            new ProductID(id),
            new ProductName(name),
            new ProductBaseUnit(baseUnit as ProductBaseUnitEnum)
        );
    }
}