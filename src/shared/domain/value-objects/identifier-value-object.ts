import { ValueObject } from './value-object';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class IdentifierValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.isValidUUID(value);
    }

    private isValidUUID(value: string): void {
        if (!uuidValidate(value)) {
            throw new Error('El valor debe ser un ID válido');
        }
    }

    static randomID(): IdentifierValueObject {
        return new IdentifierValueObject(uuidv4());
    }
}