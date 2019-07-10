import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DialogService } from './services/dialog/dialog.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavigationComponent,
        TableComponent
    ],
    exports: [
        NavigationComponent,
        TableComponent
    ],
    providers: [
        DialogService
    ]
})
export class SharedModule { }
