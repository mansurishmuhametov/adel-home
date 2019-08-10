import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
    @Input()
    set Id(value: string) {
        this.id = value;
    }
    get Id(): string {
        return this.id;
    }

    get Product(): Product {
        return this.product;
    }

    set Image(value: string) {
        this.image = value;
    }

    get Image(): string {
        return this.image;
    }

    private id: string;
    private product: Product;
    private iconSrc: string;
    private image: string;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly productsService: ProductsService,
        private zone: NgZone
    ) { }

    public ngOnInit(): void {
        this.productsService.get(this.id)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(product => {
                this.product = product;
                this.productsService.getImage(this.product.ImageId)
                    .subscribe(image => {
                        this.zone.run(() => {
                            this.image = image;
                        });
                    });
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
