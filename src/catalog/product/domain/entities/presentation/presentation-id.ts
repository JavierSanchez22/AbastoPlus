import { IdentifierValueObject } from "../../../../../shared/domain/value-objects/identifier-value-object";
import { v4 as uuidv4 } from 'uuid';

export class PresentationID extends IdentifierValueObject {
    public static randomID(): PresentationID {
        return new PresentationID(uuidv4());
    }
}