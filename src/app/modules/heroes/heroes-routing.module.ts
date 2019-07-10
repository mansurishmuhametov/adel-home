import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroComponent } from './components/hero/hero.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const heroesRoutes: Routes = [
    {
        path: '',
        component: HeroComponent,
        children: [
            {
                path: '', component: HeroListComponent,
                data: { animation: 'heroes' }
            },
            {
                path: ':id',
                component: HeroDetailComponent,
                data: { animation: 'hero' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(heroesRoutes)],
    exports: [RouterModule]
})
export class HeroesRoutingModule { }
