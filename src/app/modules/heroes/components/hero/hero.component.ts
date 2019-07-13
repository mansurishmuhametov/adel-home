import { Component, OnInit } from '@angular/core';
import {
    mergeMap
} from 'rxjs/operators';

import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        of('Ell').pipe(
            mergeMap(name => of(`${name} Lad`))
        ).subscribe(fullName => console.log(fullName));
    }
}
