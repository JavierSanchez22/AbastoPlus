import { StringValueObject } from "../../../../shared/domain/value-objects/string-value-object";

export class ProductName extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.charactersMin(value);
    }

    private charactersMin(value: string): void {
        if (value.length < 10) {
            throw new Error('El nombre del producto no puede ser menor a 10 caracteres'); 
        }
    }
}