import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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

    get IconSrc(): string {
        return this.iconSrc;
    }

    private id: string;
    private product: Product;
    private iconSrc: string;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly productsService: ProductsService
    ) { }

    public ngOnInit(): void {
        this.productsService.get(this.id)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(product => {
                this.product = product;
                this.iconSrc = `data:image/jpg;base64,${ this.product.Image }`;
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
