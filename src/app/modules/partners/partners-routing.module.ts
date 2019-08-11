import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnersComponent } from './components/partners/partners.component';

const partnersRoutes: Routes = [
    {
        path: '',
        component: PartnersComponent,
        children: [
            {
                path: 'categories',
                loadChildren: () => import('./modules/categories/categories.module')
                    .then(m => m.CategoriesModule),
                data: { preload: false }
            },
            {
                path: 'products',
                loadChildren: () => import('./modules/products/products.module')
                    .then(m => m.ProductsModule),
                data: { preload: false }
            },
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: '',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(partnersRoutes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }
