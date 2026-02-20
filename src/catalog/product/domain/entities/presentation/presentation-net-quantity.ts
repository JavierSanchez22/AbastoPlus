import { IntValueObject } from "../../../../../shared/domain/value-objects/int-value-object";

export class PresentationNetQuantity extends IntValueObject {
    constructor(value: number) {
        super(value);
        this.isPositive();
    }

    private isPositive(): void {
        if (this.value <= 0) { 
            throw new Error('No puede ser menor o igual a cero');
        }
    }
}