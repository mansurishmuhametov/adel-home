import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService
    ) { }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                const id = +params.get('id');
                this.refresh(id);
            });
    }

    refresh(id) {
        this.service.getHero(id)
            .subscribe(hero => this.hero = hero);
    }

    goToHeroes(hero: Hero) {
        const heroId = hero ? hero.id : null;
        this.router.navigate(['/heroes', { id: heroId, extra: 'aaa'}]);
    }

    goToPreviousHero(heroId: number) {
        const nextHeroId = --heroId;
        this.router.navigate(['/heroes', nextHeroId]);
    }

    goToNextHero(heroId: number) {
        const nextHeroId = ++heroId;
        this.router.navigate(['/heroes', nextHeroId]);
    }
}
