import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './components/partners/partners.component';
import { notifierConfig } from './configurations/notifier.config';

@NgModule({
    declarations: [
        PartnersComponent
    ],
    imports: [
        CommonModule,
        PartnersRoutingModule,
        NotifierModule.withConfig(notifierConfig)
    ]
})
export class PartnersModule { }