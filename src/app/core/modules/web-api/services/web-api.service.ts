import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
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
        updates[`${ url }/${ newPostKey }`] = entity;

        return fromPromise(repository.update(updates))
            .pipe(map(() => {
                return newPostKey;
            }));
    }

    public update(url: string, entity: any): Observable<string> {        
        const repository = this.firebase.database.ref();
        const postKey = entity.id;
        const updates = {};

        updates[`${ url }/${ postKey }`] = entity;

        return fromPromise(repository.update(updates))
            .pipe(map(() => {
                return postKey;
            }));
    }

    public delete(url: string, entityId: string): Observable<any> {        
        const repository = this.firebase.database.ref();
        const source: string = `${ url }/${ entityId }`;

        return fromPromise(repository.child(source).remove());
    }

    public getById(url: string, id: string): Observable<any> {
        const repository = this.firebase.database.ref(url);
        const subject: Subject<any> = new Subject<any>();

        /**
         * todo: тех долг
         * setTimeout это костыль
         * сложность в том, что при повторном обращение с теми же параметрами
         * данные возвращаются синхронно и subject.next(result);
         * отрабатывает раньше, чем return subject;
         * setTimeout решает эту сложность
         */
        setTimeout(() => {
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

                    subject.next(result);
                });
        }, 0);

        return subject;
    }
}
