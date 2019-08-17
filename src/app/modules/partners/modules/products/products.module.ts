import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsService } from './services/products.service';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ClickStopPropagation } from '@app-shared/components/click-stop-propagation/click-stop-propagation';

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    declarations: [
        ProductsListComponent,
        ProductUpdateComponent,
        ClickStopPropagation
    ],
    providers: [
        ProductsService,
        HttpClient
    ]
})
export class ProductsModule { }
