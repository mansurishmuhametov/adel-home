import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnersComponent } from './components/partners/partners.component';

const partnersRoutes: Routes = [
    {
        path: '',
        component: PartnersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(partnersRoutes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }
