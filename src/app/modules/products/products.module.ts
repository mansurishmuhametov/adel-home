import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsService } from './services/products.service';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        HttpClientModule
    ],
    declarations: [
        ProductsListComponent,
        ProductComponent
    ],
    providers: [
        ProductsService,
        HttpClient
    ]
})
export class ProductsModule { }
