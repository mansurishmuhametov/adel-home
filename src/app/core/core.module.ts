import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app-shared/shared.module';

import { HeaderComponent } from '@app-core/components/header/header.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule
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
    providers: []
})
export class CoreModule { }
