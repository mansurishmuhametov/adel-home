import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Product } from '../models/product';
import { Category } from '../models/category';
import { map, find, delay } from 'rxjs/operators';
import * as productsList from '../data/products.json';
import * as _ from 'lodash';
import { ProductFilter } from '../models/product-filter';

@Injectable()
export class ProductsService {

    constructor(
        private http: HttpClient
    ) { }

    public getAll(): Observable<Product[]> {
        return of(productsList)
            .pipe(
                map(products => {
                    const result: Product[] = _.map(products, item => {
                        const price = _.parseInt(item.price);

                        return new Product(item.id, item.name, item.category, price, item.description, item.isInStock, item.imageId);
                    });

                    return result;
                })
            );
    }

    public get(id: string): Observable<any> {
        return of(productsList)
            .pipe(
                delay(1000),
                map(items => {
                    const jsonProd: any = _.find(items, item => item.id === id);
                    let result: Product = null;

                    if (jsonProd) {
                        const price = _.parseInt(jsonProd.price);

                        result = new Product(jsonProd.id, jsonProd.name, jsonProd.category, price, jsonProd.description, jsonProd.isInStock, jsonProd.imageId);
                    }

                    return result;
                })
            );
    }

    public getIds(filter: ProductFilter): Observable<string[]> {
        return of(productsList)
            .pipe(
                map(products => {
                    const filtered: any[] = _.filter(products, item => item.category === filter.Category);
                    const sorted: any[] = _.orderBy(filtered, ['isInStock', 'name'], ['desc', 'asc']);
                    const ids: string[] = _.map(sorted, item => item.id);

                    return ids;
                })
            );
    }
}
