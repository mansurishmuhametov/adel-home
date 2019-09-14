import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil, switchMap, first, delay, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs';
import * as _ from 'lodash';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Image } from '../../models/image';
import { Slide } from '../../models/slide';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private id: string;
    private product: Product;

    public get Product(): Product {
        return this.product;
    }

    get Image(): string {
        return this.image;
    }

    get Slides(): Slide[] {
        return this.slides;
    }

    get IsLongRequest(): boolean {
        return this.isLongRequest;
    }

    private image: string;
    private slides: Slide[] = [];
    private isLongRequest: boolean;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly productsService: ProductsService
    ) { }

    public ngOnInit(): void {
        timer(2000)
            .pipe(
                first(),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.isLongRequest = true;
            });

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const id: string = params.get('id') || null;

                    return of(id);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(id => {
                this.id = id;
                this.refresh();
            });
    }

    public refresh(): void {
        this.productsService.get(this.id)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(product => {
                this.product = product;

                this.initImages(this.product.Images);
            });
    }
    
    public initImages(imageIds: string[]): void {
        this.productsService.getImages(imageIds)
            .pipe(
                map((images) => {
                    return images;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((images: Image[]) => {
                _.forEach(images, img => this.addSlide(img));
            });
    }

    private addSlide(image: Image): void {
        const slides: Slide[] = _.clone(this.slides);
        const slide = new Slide(image.Content, image);
        
        slides.push(slide);

        this.slides = slides;
    }

    public initImage(imageId: string): void {
        this.productsService.getImage(imageId)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(image => {                
                this.image = image.Content;
                const img: Image = new Image('1', this.image);
                const imgslider = new Slide(image.Content, img);
                this.slides = [imgslider];
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
