import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './components/clients/clients.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const clientsRoutes: Routes = [
    {
        path: '',
        component: ClientsComponent,
        children: [
            {
                path: 'contacts',
                loadChildren: () => import('./modules/contacts/contacts.module')
                    .then(m => m.ContactsModule),
                data: { preload: true }
            },
            {
                path: 'products',
                loadChildren: () => import('./modules/products/products.module')
                    .then(m => m.ProductsModule),
                data: { preload: true }
            },
            {
                path: 'home',
                loadChildren: () => import('./modules/home/home.module')
                    .then(m => m.HomeModule),
                data: { preload: true }
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(clientsRoutes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }
