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
                data: { preload: true }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(partnersRoutes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }
