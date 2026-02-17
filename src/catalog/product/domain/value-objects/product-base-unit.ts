import { EnumValueObject } from "../../../../shared/domain/value-objects/enum-value-object";

export enum ProductBaseUnitEnum {
    KILOGRAMO = 'kg',
    LIBRAS = 'lb',
    ONZAS = 'oz'
}

export class ProductBaseUnit extends EnumValueObject<ProductBaseUnitEnum> {
    constructor(value: ProductBaseUnitEnum) {
        super(value, Object.values(ProductBaseUnitEnum));
        this.isValidBaseUnit(value);
    }

    private isValidBaseUnit(value: ProductBaseUnitEnum): void {
        if (!Object.values(ProductBaseUnitEnum).includes(value)) {
            throw new Error(`Las unidades deben de ser: kg, lb u oz`);
        }
    }
}   