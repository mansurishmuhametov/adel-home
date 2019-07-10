import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    catchError,
    find,
    buffer,
    bufferTime,
    take,
    mergeMap
} from 'rxjs/operators';
import { TargetLocator } from 'selenium-webdriver';
import { timeout } from 'q';

import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { range } from 'rxjs/observable/range';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        // of('Ell')
        //     .subscribe((name) => {
        //         of(`${name} Lad`)
        //             .subscribe((full) => console.log(full));
        //     });

        of('Ell').pipe(
            mergeMap(name => of(`${name} Lad`))
        ).subscribe(fullName => console.log(fullName));
    }
}
