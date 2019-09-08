import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { ISlide } from '../../models/slide.interface';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnChanges {
    private slides: ISlide[];
    private mainSlide: ISlide;
    private isDelete: boolean;

    constructor() { }

    @Output()
    public onSelect = new EventEmitter<ISlide>();

    @Input()
    set Slides(value: ISlide[]) {
        this.slides = value;
    }
    get Slides(): ISlide[] {
        return this.slides;
    }

    @Input()
    set IsDelete(value: boolean) {
        this.isDelete = value;
    }
    get IsDelete(): boolean {
        return this.isDelete;
    }

    get MainSlide (): ISlide {
        return this.mainSlide;
    }

    public ngOnChanges(): void {
        this.mainSlide = _.head(this.slides);
        this.onSelect.emit(this.mainSlide);
    }

    public select(slide): void {
        this.mainSlide = slide;
        this.onSelect.emit(slide);
    }

    public onMainSlideClick(): void {
        // do smth
    }
}
