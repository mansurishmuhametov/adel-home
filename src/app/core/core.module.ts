import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import { WebApiModule } from './modules/web-api/web-api.module';

import { HeaderComponent } from '@app-core/components/header/header.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { FooterComponent } from './components/footer/footer.component';
import { WebApiService } from './modules/web-api/services/web-api.service';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule,
        WebApiModule
    ],
    declarations: [
        HeaderComponent,
        HeaderTitleComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        WebApiService
    ]
})
export class CoreModule { }
