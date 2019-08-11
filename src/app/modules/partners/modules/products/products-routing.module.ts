import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        children: []
    },
    {
        path: ':id',
        component: ProductDetailComponent
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
