import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';

import * as _ from 'lodash';

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
