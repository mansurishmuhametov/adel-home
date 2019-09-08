import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, combineLatest } from 'rxjs/operators';
import * as _ from 'lodash';

import { Product } from '../models/product';
import { ProductFilter } from '../models/product-filter';
import { WebApiService } from '@app-core/modules/web-api/services/web-api.service';
import { Image } from '../models/image';
import { of, never, forkJoin, Subject, Scheduler } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(
        private webApiService: WebApiService,
        private readonly zone: NgZone
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
                        item.count,
                        item.consist,
                        item.images
                    );
                })
            );
    }

    public getImages(imageIds: string[]): Observable<any> {
        const subject: Subject<any> = new Subject<any>();
        
        const images$: Observable<Image>[] = _.map(imageIds, (id: string) => {
            return this.webApiService.getById('/images', id)
                .pipe(
                    map(item => {
                        if (!item || !item.id || !item.content) {
                            // 01
                            debugger;
                            throw new Error('Could not load image');
                        }

                        const im =  new Image(
                            item.id,
                            item.content
                        );

                        subject.next(im);

                        return im;
                    }
                ))

        });

        return forkJoin(images$);
    }

    public update(inputProduct: Product, images: Image[]): Observable<string> {
        return this.updateImages(images)
            .pipe(mergeMap((imageIds) => {
                const product: Product = new Product(
                    inputProduct.Id,
                    inputProduct.Name,
                    inputProduct.Price,
                    inputProduct.Article,
                    inputProduct.Priority,
                    inputProduct.Type,
                    inputProduct.Description,
                    inputProduct.Count,
                    inputProduct.Consist,
                    imageIds
                );
                
                return this.updateProduct(product);
            }));
    }

    public updateImages(images: Image[]): Observable<any> {
        const ids$: Observable<string>[] = _.map(images, img => {
            return this.updateImage(img);
        });

        return forkJoin(...ids$);
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
                    const deleteImages = this.deleteImages(product.Images);
                    const productSub = this.webApiService.delete('/products', product.Id);

                    return combineLatest(deleteImages, productSub);
                })
            );
    }

    public deleteImages(imageIds: string[]): any {
        const removes$: any[] = _.map(imageIds, (id: string) => {
            return this.webApiService.delete('/images', id);
        });

        return combineLatest(removes$);
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
                            item.count,
                            item.consist,
                            item.images
                        );

                        products.push(product);
                    });

                    return _.orderBy(products, ['name'], ['asc']);
                })
            );
    }
}
