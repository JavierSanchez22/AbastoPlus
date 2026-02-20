import { EnumValueObject } from '../../../../../shared/domain/value-objects/enum-value-object';

export class PresentationType extends EnumValueObject<string> {
    constructor(value: string) {
        super(value, ['bag', 'sack', 'box', 'can', 'jar', 'bottle']);
    }
}