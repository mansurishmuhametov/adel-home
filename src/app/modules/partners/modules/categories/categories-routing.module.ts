import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '',
                component: CategoriesListComponent
            },
            {
                path: ':id',
                component: CategoryDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
