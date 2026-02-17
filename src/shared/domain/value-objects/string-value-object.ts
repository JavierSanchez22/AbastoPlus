import { ValueObject } from './value-object';
export abstract class StringValueObject extends ValueObject<string> {
    constructor(value: string){
        super(value);
        this.isString(value);
    }

    private isString(value: string): void {
        if (typeof value !== 'string') {
            throw new Error('El valor debe ser una cadena de texto');
        }
    }
}