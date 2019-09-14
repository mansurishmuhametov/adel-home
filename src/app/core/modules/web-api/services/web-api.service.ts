import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as _ from 'lodash';
import { map, mergeMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebApiService {
    constructor(
        private readonly firebase: AngularFireDatabase
    ) { }

    public get(url: string, filter: any = null): Observable<any[]> {
        return this.firebase.list(url)
            .valueChanges();

        // Пример: запросы к firebase с фильтрами
        // return this.firebase.list(url, ref => {
        //     return ref.orderByChild('category').equalTo('clothes').limitToFirst(10)
        // }).valueChanges();
    }

    public put(url: string, entity: any): Observable<string> {
        const repository = this.firebase.database.ref();
        const newPostKey = repository.child(url).push().key;
        const updates = {};

        entity.id = newPostKey;
        updates[`${url}/${newPostKey}`] = entity;

        return fromPromise(repository.update(updates))
            .pipe(map(() => {
                return newPostKey;
            }));
    }

    public update(url: string, entity: any): Observable<string> {
        const repository = this.firebase.database.ref();
        const postKey = entity.id;
        const updates = {};

        updates[`${url}/${postKey}`] = entity;

        return fromPromise(repository.update(updates))
            .pipe(map(() => {
                return postKey;
            }));
    }

    public delete(url: string, entityId: string): Observable<any> {
        const repository = this.firebase.database.ref();
        const source = `${url}/${entityId}`;

        return fromPromise(repository.child(source).remove());
    }

    public getById(url: string, id: string): Observable<any> {
        return this.firebase.list(url, ref => {
            return ref.orderByChild('id').equalTo(id).limitToFirst(1);
        }).valueChanges()
            .pipe(
                take(1),
                map((item: any[]) => {
                    return _.head(item);
                })
            );
    }
}
