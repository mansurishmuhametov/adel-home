import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    ngOnInit() {
        this.categoriesService.getAll()
            .subscribe(data => {
                // 01
                debugger;
            });
    }
}
