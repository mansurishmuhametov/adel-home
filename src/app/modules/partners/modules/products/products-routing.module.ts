import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        children: []
    },
    {
        path: ':id',
        component: ProductUpdateComponent
    },
    {
        path: 'category/:category',
        component: ProductsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
