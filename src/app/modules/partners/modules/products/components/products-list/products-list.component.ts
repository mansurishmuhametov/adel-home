import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { NotifierService } from 'angular-notifier';

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

    get IsLoading(): boolean {
        return this.isLoading;
    }

    get Products(): Product[] {
        return this.products;
    }

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly productsService: ProductsService,
        private readonly notifier: NotifierService
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

    public goToUpdate(): void {
        this.router.navigate(['./update'], { relativeTo: this.activatedRoute });
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
                // 01
                debugger;
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
        this.router.navigate(['./update', id], { relativeTo: this.activatedRoute });
    }

    public delete(id): void {
        const isConfirm = confirm('Удалить ?');

        if (!isConfirm) {
            return;
        }

        this.productsService.delete(id)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((result: any) => {
                this.notifier.notify('success', 'Удалено успешно');
                this.refresh();
            },
                (error: string) => {
                    this.notifier.notify('error', 'Ошибка при удаление');
                });
    }
}
