import { PresentationID } from './presentation/presentation-id';
import { PresentationName } from './presentation/presentation-name';
import { PresentationType } from './presentation/presentation-type';
import { PresentationNetQuantity } from './presentation/presentation-net-quantity';
import { PresentationUnitOfMeasure } from './presentation/presentation-unit-of-measure';

export class Presentation {
    constructor(
        public readonly id: PresentationID,
        public readonly name: PresentationName,
        public readonly type: PresentationType,
        public readonly netQuantity: PresentationNetQuantity,
        public readonly unitOfMeasure: PresentationUnitOfMeasure
    ) {}
}