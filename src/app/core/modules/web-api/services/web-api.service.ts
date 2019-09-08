import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject, AsyncSubject } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WebApiService {
    constructor(
        private readonly http: HttpClient,
        private readonly firebase: AngularFireDatabase
    ) { }

    public get(url: string): Observable<any[]> {
        return this.firebase.list(url)
            .valueChanges();
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

    public getById(url: string, id: string): Subject<any> {
        const repository = this.firebase.database.ref(url);
        const asyncSubject: Subject<any> = new AsyncSubject<any>();

        repository
            .orderByChild('id')
            .equalTo(id)
            .on('value', (entity) => {
                let result: any;

                if (!entity.val()) {
                    result = null;
                } else {
                    result = _.head(Object.values(entity.val()));
                }

                asyncSubject.next(result);
                asyncSubject.complete();
            });

        return asyncSubject;
    }
}
