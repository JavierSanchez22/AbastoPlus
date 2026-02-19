import { EnumValueObject } from "../../../../shared/domain/value-objects/enum-value-object";

export enum ProductBaseUnitEnum {
    KILOGRAMO = 'kg',
    GRAMO = 'g',
    LIBRAS = 'lb',
    MILILITROS = 'ml',
    LITROS = 'lt',
    UNIDAD = 'unidad'
}

export class ProductBaseUnit extends EnumValueObject<ProductBaseUnitEnum> {
    constructor(value: ProductBaseUnitEnum) {
        super(value, Object.values(ProductBaseUnitEnum));
        this.isValidBaseUnit(value);
    }

    private isValidBaseUnit(value: ProductBaseUnitEnum): void {
        if (!Object.values(ProductBaseUnitEnum).includes(value)) {
            throw new Error(`Las unidades deben de ser: kg, g, lb, ml, lt, unidad`);
        }
    }
}   