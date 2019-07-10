import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app-shared/shared.module';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageCrisesComponent } from './components/manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './components/manage-heroes/manage-heroes.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        AdminDashboardComponent,
        AdminComponent,
        ManageCrisesComponent,
        ManageHeroesComponent,
        AdminNavigationComponent
    ],
    providers: [],
})
export class AdminModule { }
