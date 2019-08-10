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
    set Product(value: Product) {
        this.product = value;
    }
    get Product(): Product {
        return this.product;
    }

    get Image(): string {
        return this.image;
    }

    private product: Product;
    private image: string;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly productsService: ProductsService,
        private zone: NgZone
    ) { }

    public ngOnInit(): void {
        this.productsService.getImage(this.product.ImageId)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(image => {
                /**
                 * todo: тех долг
                 * каким-то образом из-за сервиса (скорее всего из-за firebase)
                 * теряется контекст
                 */
                this.zone.run(() => {
                    this.image = image;
                });
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
