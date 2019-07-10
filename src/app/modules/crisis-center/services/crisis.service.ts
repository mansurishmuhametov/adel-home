import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Crisis } from '../models/crisis';
import { Crises } from '../models/mock-crises';
import { MessageService } from '@app/message.service';

@Injectable()
export class CrisisService {

    constructor(private messageService: MessageService) { }

    getCrises(): Observable<Crisis[]> {
        const crises = _.cloneDeep(Crises);

        return of(crises);
    }

    getCrisis(id: number): Observable<Crisis> {
        const crises = _.cloneDeep(Crises);
        const crisis = _.find(crises, { id: id });

        return of(crisis);
    }

    save(crisis: Crisis) {
        const old = _.find(Crises, { id: crisis.id });
        old.name = crisis.name;

        return of(true);
    }
}
