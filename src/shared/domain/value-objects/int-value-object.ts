import { ValueObject } from "./value-object";
export abstract class IntValueObject extends ValueObject<number> {
    constructor (value: number) {
        super(value);
        this.isInt(value);
    }

    private isInt(value: number): void {
        if (!Number.isInteger(value)) {
            throw new Error('El valor debe ser un número entero');
        }
    }
}