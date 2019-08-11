import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { ProductsService } from '../../services/products.service';
import { ProductFilter } from '../../models/product-filter';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
    private category = '';
    private destroy$ = new Subject<boolean>();
    private isLoading = false;
    private index: number = 1;

    get IsLoading(): boolean {
        return this.isLoading;
    }

    get Products(): Product[] {
        return this.products;
    }

    get Index(): number {
        return this.index;
    }

    set Index(value) {
        this.index = value;
    }

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService
    ) { }

    private products: Product[];

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const category: string = params.get('category') || null;

                    return of(category);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(category => {
                this.category = category;
                this.refresh();
            });
    }

    public refresh(): void {
        const filter: ProductFilter = new ProductFilter(Category[this.category]);

        const timer: any = setTimeout(() => {
            this.isLoading = true;
        }, 1000);

        this.productsService.getAll(filter)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(products => {
                clearTimeout(timer);

                this.products = products;
                this.isLoading = false;
            });
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public goToDetail(id): void {
        this.router.navigate(['./', id], { relativeTo: this.activatedRoute });
    }
}
