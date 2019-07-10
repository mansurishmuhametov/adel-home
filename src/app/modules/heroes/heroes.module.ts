import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '@app-shared/shared.module';

import { HeroComponent } from './components/hero/hero.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

import { HeroService } from './services/hero.service';
import { MessageService } from '@app/message.service';

@NgModule({
    imports: [
        CommonModule,
        HeroesRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        HeroComponent,
        HeroListComponent,
        HeroDetailComponent
    ],
    providers: [
        HeroService,
        MessageService
    ]
})
export class HeroesModule { }
