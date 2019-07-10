import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero } from '../../models/hero';
import { TableHead } from '@app-shared/components/table/model/table-head';
import { TableConfig } from '@app-shared/components/table/model/table-config';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
    selectedId: number;
    heads: TableHead[];
    heroes: Hero[];
    tableConfig: TableConfig;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                this.selectedId = +params.get('id');
                this.refreshHeroes();
            }
        );

        this.initTable();
    }

    refreshHeroes() {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    goToHeroDetail(heroId: number) {
        this.router.navigate(['/heroes', heroId]);
    }

    initTable() {
        this.initHeads();
        this.initConfig();
    }

    initHeads() {
        this.heads = [
            {
                name: '',
                match: 'id',
                width: 40,
                order: 0
            },
            {
                name: 'Название',
                match: 'name',
                width: 200,
                order: 1
            },
            {
                name: 'Сила',
                match: 'power',
                width: 300,
                order: 2
            }
        ];
    }

    initConfig() {
        this.tableConfig = {
            height: 100
        };
    }
}
