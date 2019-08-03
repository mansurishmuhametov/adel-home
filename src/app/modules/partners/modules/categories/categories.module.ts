import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesService } from './services/categories.service';

import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoriesListComponent,
        CategoryDetailComponent
    ],
    imports: [
        CommonModule,
        CategoriesRoutingModule
    ],
    providers: [
        CategoriesService
    ]
})
export class CategoriesModule { }
