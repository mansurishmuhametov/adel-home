import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    private category: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) { }

    public counts = [1, 2, 3, 4, 5, 6];

    ngOnInit() {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const category: string = params.get('category') || null;

                    return of(category);
                })
            )
            .subscribe(category => this.category = category);
    }
}
