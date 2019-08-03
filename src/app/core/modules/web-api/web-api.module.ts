import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { WebApiService } from './services/web-api.service';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        WebApiService,
        HttpClient,
        AngularFireDatabase
    ]
})
export class WebApiModule { }
