import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';

import { Product } from '../models/product';
import { ProductFilter } from '../models/product-filter';
import { WebApiService } from '@app-core/modules/web-api/services/web-api.service';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
    private products: Product[] = null;

    constructor(
        private webApiService: WebApiService
    ) { }

    public get(id: string): Observable<Product> {
        return this.getAll()
            .pipe(
                map(products => {
                    const result: any = _.find(products, item => item.Id === id);

                    return result;
                })
            );
    }

    public getIds(filter: ProductFilter): Observable<string[]> {
        return this.getAll()
            .pipe(
                map(products => {
                    const ids: string[] = _.map(products, item => item.Id);

                    return ids;
                })
            );
    }

    public getImage(id): Observable<any> {
        return this.webApiService.getById('/images', id)
            .pipe(
                map((image) => {
                    if (image) {
                        return `data:image/jpg;base64,${image.content}`;
                    } else {
                        return null;
                    }
                }));
    }

    private getAll(): Observable<Product[]> {
        if (this.products && this.products.length) {
            return of(this.products);
        }

        const subject: Subject<any[]> = new Subject();

        this.webApiService.get('/products')
            .pipe()
            .subscribe(productsJson => {
                const products: Product[] = [];

                _.forEach(productsJson, item => {
                    const product = new Product(
                        item.id,
                        item.imageId,
                        item.name,
                        item.price,
                        item.priority,
                        item.type,
                        item.description,
                        item.count
                    );

                    products.push(product);
                });

                this.products = _.orderBy(products, ['priority', 'name'], ['asc', 'asc']);
                subject.next(this.products);
            });

        return subject;
    }
}
