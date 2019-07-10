import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Hero } from '../models/hero';
import { Heroes } from '../data/mock-heroes';
import { MessageService } from '@app/message.service';

@Injectable()
export class HeroService {

    constructor(private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        // TODO: send the message _after_ fetching the heroes
        this.messageService.add('HeroService: fetched heroes');
        return of(Heroes);
    }

    getHero(id: number): Observable<Hero> {
        // TODO: send the message _after_ fetching the heroes
        this.messageService.add('HeroService: fetched heroes');
        const hero = _.find(Heroes, { id: id });

        return of(hero);
    }
}
