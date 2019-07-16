import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DialogService } from './services/dialog/dialog.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { TableComponent } from './components/table/table.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavigationComponent,
        TableComponent,
        LogoComponent
    ],
    exports: [
        NavigationComponent,
        TableComponent,
        LogoComponent
    ],
    providers: [
        DialogService
    ]
})
export class SharedModule { }
