import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsService } from './services/products.service';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        HttpClientModule
    ],
    declarations: [
        ProductsListComponent,
        ProductComponent,
        ProductDetailComponent,
        ImageSliderComponent
    ],
    providers: [
        ProductsService,
        HttpClient
    ]
})
export class ProductsModule { }
