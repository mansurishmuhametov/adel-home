import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, delay } from 'rxjs/operators';
import * as _ from 'lodash';

import { Product } from '../models/product';
import { ProductFilter } from '../models/product-filter';
import { WebApiService } from '@app-core/modules/web-api/services/web-api.service';
import { Image } from '../models/image';

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
                        item.name,
                        item.price,
                        item.article,
                        item.priority,
                        item.type,
                        item.description,
                        item.consist,
                        item.count,
                        item.images
                    );;
                })
            );
    }

    public getImage(id): Observable<Image> {
        return this.webApiService.getById('/images', id)
            .pipe(
                map(item => {
                    if (!item || !item.id || !item.content) {
                        // 01
                        debugger;
                        throw ('Could not load image');
                    }
                    return new Image(
                        item.id,
                        item.content
                    );
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
                            item.name,
                            item.price,
                            item.article,
                            item.priority,
                            item.type,
                            item.description,
                            item.consist,
                            item.count,
                            item.images
                        );

                        products.push(product);
                    });

                    return _.orderBy(products, ['priority', 'name'], ['asc', 'asc']);
                })
            );
    }
}
