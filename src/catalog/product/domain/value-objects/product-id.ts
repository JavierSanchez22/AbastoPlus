import { IdentifierValueObject } from "../../../../shared/domain/value-objects/identifier-value-object";

export class ProductID extends IdentifierValueObject {
    constructor(value: string) {
        super(value);
    }
}