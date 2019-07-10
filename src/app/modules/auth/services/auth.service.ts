import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {
    isLoggedIn = false;
    redirectUrl: string;

    constructor() { }

    login(): Observable<boolean> {
        return of(true).pipe(
            delay(2000),
            tap(val => this.isLoggedIn = true)
        );
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
