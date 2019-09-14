import { ISlide } from '@app/modules/shared/image-slider/models/slide.interface';
import { Image } from './image';

export class Slide implements ISlide {
    constructor(
        private readonly content: string,
        private readonly value: Image
    ) { }

    get Content(): string {
        return this.content;
    }

    get Value(): Image {
        return this.value;
    }
}
