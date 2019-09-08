import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { Image } from '../../models/image';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnChanges {
    private images: Image[];
    private mainImage: Image;

    constructor() { }

    @Input()
    set Images(value: Image[]) {
        this.images = value;
    }
    get Images(): Image[] {
        return this.images;
    }

    get MainImage (): Image {
        return this.mainImage;
    }

    public ngOnChanges(): void {
        this.mainImage = _.head(this.images);
    }

    public select(image): void {
        this.mainImage = image;
    }

    public onMainImageClick(): void {
        // do smth
    }
}
