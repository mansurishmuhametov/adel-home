import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

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

    private image: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService,
        private readonly zone: NgZone
    ) { }

    public ngOnInit(): void {
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

                this.initImage(this.product.ImageId);
            });
    }

    public initImage(imageId: string): void {
        this.productsService.getImage(imageId)
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
