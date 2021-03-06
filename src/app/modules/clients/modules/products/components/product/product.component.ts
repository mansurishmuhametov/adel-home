import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { takeUntil, first, delay } from 'rxjs/operators';
import { timer } from 'rxjs';
import * as _ from 'lodash';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Image } from '../../models/image';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
    @Input()
    set Product(value: Product) {
        this.product = value;
    }
    get Product(): Product {
        return this.product;
    }

    get Image(): Image {
        return this.image;
    }

    get IsLongRequest(): boolean {
        return this.isLongRequest;
    }

    private product: Product;
    private image: Image;
    private isLongRequest: boolean;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
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

        const imageId: string = _.head(this.product.Images);

        this.productsService.getImage(imageId)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(image => {
                this.image = image;
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
