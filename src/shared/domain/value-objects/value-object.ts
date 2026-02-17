export abstract class ValueObject<T> {
    readonly value: T;

    constructor(value: T){
        this.value = value;
        this.isValid(value);
    }

    private isValid(value: T): void {  
        if (value === null || value === undefined) {
            throw new Error('El valor no puede ser nulo o indefinido')
        }
    }

    toString(): string {
        return String(this.value);
    }
}