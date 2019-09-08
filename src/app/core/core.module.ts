import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { WebApiModule } from './modules/web-api/web-api.module';

import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule,
        WebApiModule
    ],
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
    providers: []
})
export class CoreModule { }
