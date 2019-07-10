import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CoreModule } from '@app/core/core.module';

import { AppComponent } from '@app-core/components/app/app.component';

import { AuthGuard } from '@app/modules/auth/guards/auth.guard';

import { AuthService } from '@app/modules/auth/services/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        // CoreModule have to be the last, cause default route
        CoreModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(router: Router) {
        const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
        // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
