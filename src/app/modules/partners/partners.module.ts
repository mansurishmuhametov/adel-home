import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './components/partners/partners.component';

@NgModule({
    declarations: [
        PartnersComponent
    ],
    imports: [
        CommonModule,
        PartnersRoutingModule
    ]
})
export class PartnersModule { }
