import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, combineLatest } from 'rxjs/operators';
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
                        item.imageId,
                        item.name,
                        item.price,
                        item.article,
                        item.priority,
                        item.type,
                        item.description,
                        item.count,
                        item.consist
                    );
                })
            );
    }

    public getImage(id): Observable<Image> {
        return this.webApiService.getById('/images', id)
            .pipe(
                map(item => {
                    if (!item || !item.id || !item.content) {
                        throw new Error('Could not load image');
                    }
                    return new Image(
                        item.id,
                        item.content
                    );
                })
            );
    }

    public updateImage(image: Image): Observable<string> {
        if (!image.Id) {
            return this.webApiService.put('/images', image);
        } else {
            return this.webApiService.update('/images', image);
        }
    }

    public updateProduct(product: Product): Observable<string> {
        if (product.Id) {
            return this.webApiService.update('/products', product);
        } else {
            return this.webApiService.put('/products', product);
        }
    }

    public delete(productId: string): Observable<any> {
        return this.get(productId)
            .pipe(
                mergeMap((product: Product) => {
                    const imgSub = this.webApiService.delete('/images', product.ImageId);
                    const productSub = this.webApiService.delete('/products', product.Id);

                    return combineLatest(imgSub, productSub);
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
                            item.article,
                            item.priority,
                            item.type,
                            item.description,
                            item.count,
                            item.consist
                        );

                        products.push(product);
                    });

                    return _.orderBy(products, ['name'], ['asc']);
                })
            );
    }
}
