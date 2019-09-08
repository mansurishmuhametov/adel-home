import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { ISlide } from '../../models/slide.interface';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnChanges {
    private slides: ISlide[];
    private mainImage: ISlide;

    constructor() { }

    @Input()
    set Slides(value: ISlide[]) {
        this.slides = value;
    }
    get Slides(): ISlide[] {
        return this.slides;
    }

    get MainImage (): ISlide {
        return this.mainImage;
    }

    public ngOnChanges(): void {
        this.mainImage = _.head(this.slides);
    }

    public select(image): void {
        this.mainImage = image;
    }

    public onMainImageClick(): void {
        // do smth
    }
}
