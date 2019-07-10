import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisCenterComponent } from './components/crisis-center/crisis-center.component';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './components/crisis-detail/crisis-detail.component';
import { CrisisCenterHomeComponent } from './components/crisis-center-home/crisis-center-home.component';
import { MessageComponent } from './components/message/message.component';

import { CanDeactivateGuard } from '@app/modules/shared/guards/can-deactivate/can-deactivate.guard';
import { CrisisDetailResolveService } from './guards/crisis-detail/crisis-detail-resolve.service';

const routes: Routes = [
    {
        path: 'home',
        component: CrisisCenterComponent,
        children: [
            {
                path: 'message',
                component: MessageComponent,
                outlet: 'content'
            },
            {
                path: 'list',
                component: CrisisListComponent,
                children: [
                    {
                        path: ':id',
                        component: CrisisDetailComponent,
                        canDeactivate: [CanDeactivateGuard],
                        resolve: {
                            crisis: CrisisDetailResolveService
                        }
                    },
                    {
                        path: '',
                        component: CrisisCenterHomeComponent
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
