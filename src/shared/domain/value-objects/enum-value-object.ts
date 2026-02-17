import { ValueObject } from './value-object';
export abstract class EnumValueObject<T> extends ValueObject<T> {
    constructor(value: T, public readonly validValues: T[]) {
        super(value);
        this.ensureValueIsValid(value);
    }

    private ensureValueIsValid(value: T): void {
        if (!this.validValues.includes(value)) {
            throw new Error(`El objeto <${value}> no es valido. El valor valido es: ${this.validValues.join(', ')}`);
        }
    }

    public checkValueIsValid(value: T): void {
        this.ensureValueIsValid(value);
        }
    }