import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebApiService {
    constructor(
        private readonly http: HttpClient,
        private readonly db: AngularFireDatabase
    ) { }

    public get(url: string, params: any = null): Observable<any> {
        return this.db.list(url)
            .valueChanges();
    }
}
