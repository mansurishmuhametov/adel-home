import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICanComponentDeactivate } from '@app-shared/guards/can-deactivate/can-deactivate.guard';

import { Crisis } from '@app-modules/crisis-center/models/crisis';
import { CrisisService } from '@app-modules/crisis-center/services/crisis.service';
import { DialogService } from '@app-shared/services/dialog/dialog.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-crisis-detail',
    templateUrl: './crisis-detail.component.html',
    styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit, ICanComponentDeactivate {
    crisis$: Observable<Crisis>;
    crisis: Crisis;
    editName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private crisisService: CrisisService,
        public dialogService: DialogService
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { crisis: Crisis }) => {
                if (!data.crisis) {
                    return;
                }

                this.editName = data.crisis.name;
                this.crisis = data.crisis;
            }
        );
    }

    goToCrises(crisis: Crisis) {
        const crisisId = crisis ? crisis.id : null;
        this.router.navigate(['../', { id: crisisId, foo: 'foo'}], { relativeTo: this.route });
    }

    cancel() {
        this.goToCrises(null);
    }

    save(crisis) {
        const self = this;

        this.crisisService.save(crisis)
            .subscribe(() => {
                self.ngOnInit();
            });
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (this.isChanged()) {
            return this.dialogService.confirm('Discard changes ?');
        }

        return true;
    }

    isChanged() {
        return (this.crisis && this.crisis.name !== this.editName);
    }
}
