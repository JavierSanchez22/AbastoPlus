import { EnumValueObject } from '../../../../../shared/domain/value-objects/enum-value-object';

export class PresentationUnitOfMeasure extends EnumValueObject<string> {
    constructor(value: string) {
        super(value, ['kg', 'lb', 'g', 'ml', 'lt', 'unit']);
    }
}