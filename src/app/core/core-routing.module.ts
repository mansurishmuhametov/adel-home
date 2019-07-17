import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '@app-core/components/page-not-found/page-not-found.component';

import { AuthGuard } from '@app-modules/auth/guards/auth.guard';
import { PreloadingStrategyService } from '@app-core/services/preloading-strategy/preloading-strategy.service';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: '@app-modules/admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'crisis-center',
        loadChildren: '@app-modules/crisis-center/crisis-center.module#CrisisCenterModule',
        data: { preload: false }
    },
    {
        path: 'login',
        loadChildren: '@app-modules/auth/auth.module#AuthModule'
    },
    {
        path: 'heroes',
        loadChildren: '@app-modules/heroes/heroes.module#HeroesModule'
    },
    {
        path: 'contacts',
        loadChildren: '@app-modules/contacts/contacts.module#ContactsModule',
        data: { preload: true }
    },
    {
        path: '',
        loadChildren: '@app-modules/home/home.module#HomeModule',
        pathMatch: 'full',
        data: { preload: true }
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                enableTracing: false,
                // preloadingStrategy: PreloadAllModules,
                preloadingStrategy: PreloadingStrategyService
            }
        )
    ],
    exports: [RouterModule],
    providers: [
        PreloadingStrategyService
    ]
})
export class CoreRoutingModule { }
