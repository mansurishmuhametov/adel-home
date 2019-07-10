import { Injectable } from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot,
         ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';

import { CrisisService } from '../../services/crisis.service';
import { Crisis } from '../../models/crisis';

@Injectable()
export class CrisisDetailResolveService implements Resolve<Crisis> {
    constructor(
        private crisisService: CrisisService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
        const id = +route.paramMap.get('id');

        return this.crisisService.getCrisis(id).pipe(
            mergeMap(crisis => {
                if (crisis) {
                    return of(crisis);
                } else {
                    this.router.navigate(['crisis-center/home/list'], { relativeTo: this.activatedRoute });

                    return of(null);
                }
            })
        );
    }
}
