import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ManageCrisesComponent } from './components/manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './components/manage-heroes/manage-heroes.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '@app-modules/auth/guards/auth.guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: 'crises', component: ManageCrisesComponent },
            { path: 'heroes', component: ManageHeroesComponent },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: '', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
