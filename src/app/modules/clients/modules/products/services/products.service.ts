import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, delay } from 'rxjs/operators';
import * as _ from 'lodash';

import { Product } from '../models/product';
import { ProductFilter } from '../models/product-filter';
import { WebApiService } from '@app-core/modules/web-api/services/web-api.service';

@Injectable()
export class ProductsService {
    constructor(
        private webApiService: WebApiService
    ) { }

    public get(id: string): Observable<Product> {
        return this.webApiService.getById('/products', id)
            .pipe(
                map(item => {
                    return new Product(
                        item.id,
                        item.imageId,
                        item.name,
                        item.price,
                        item.priority,
                        item.type,
                        item.description,
                        item.count
                    );;
                })
            );
    }

    public getImage(id): Observable<string> {
        return this.webApiService.getById('/images', id)
            .pipe(
                map((image) => {
                    if (image) {
                        return `data:image/jpg;base64,${image.content}`;
                    } else {
                        return null;
                    }
                })
            );
    }

    public getAll(filter: ProductFilter): Observable<Product[]> {
        return this.webApiService.get('/products')
            .pipe(
                map((productsJson) => {
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

                    return _.orderBy(products, ['priority', 'name'], ['asc', 'asc']);
                })
            );
    }
}
