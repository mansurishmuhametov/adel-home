import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientsComponent } from './components/clients/clients.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { HomeModule } from './modules/home/home.module';


@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        SharedModule,
        HomeModule
    ],
    declarations: [
        ClientsComponent,
        HeaderComponent,
        FooterComponent,
        HeaderTitleComponent
    ]
})
export class ClientsModule { }
