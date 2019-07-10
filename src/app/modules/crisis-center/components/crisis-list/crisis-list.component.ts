import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TableHead } from '@app-shared/components/table/model/table-head';
import { TableConfig } from '@app-shared/components/table/model/table-config';

import { Crisis } from '../../models/crisis';
import { CrisisService } from '../../services/crisis.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-crisis-list',
    templateUrl: './crisis-list.component.html',
    styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
    crises$: Observable<Crisis[]>;
    selectedId: number;
    heads: TableHead[];
    tableConfig: TableConfig;
    body: object[];

    constructor(
        private crisisService: CrisisService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        const self = this;

        this.crises$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.selectedId = +params.get('id');

                return this.crisisService.getCrises();
            })
        );

        this.crises$.subscribe((table) => {
            self.initTable(table);
        });
    }

    initTable(table) {
        this.body = table;

        this.initHeads();
        this.initConfig();
    }

    initHeads() {
        this.heads = [
            {
                name: 'ID',
                match: 'id',
                width: 40,
                order: 0
            },
            {
                name: 'Название',
                match: 'name',
                width: 400,
                order: 1
            }
        ];
    }

    initConfig() {
        this.tableConfig = {
            height: 150
        };
    }

    onSelect(crisis: Crisis): void {
        this.router.navigate(['/crisis', crisis.id]);
    }

    goToDetail(crisisId) {
        this.router.navigate(['./', crisisId], { relativeTo: this.route });
    }

    crisisSelected(row) {
        this.goToDetail(row.id);
    }
}
