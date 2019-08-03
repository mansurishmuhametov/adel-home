import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from '@app-modules/auth/guards/auth.guard';
import { PreloadingStrategyService } from '@app-core/services/preloading-strategy/preloading-strategy.service';

const routes: Routes = [
    {
        path: 'clients',
        loadChildren: () => import('@app-modules/clients/clients.module')
            .then(m => m.ClientsModule),
        data: { preload: true }
    },
    {
        path: 'partners',
        loadChildren: () => import('@app-modules/partners/partners.module')
            .then(m => m.PartnersModule),
        data: { preload: false }
    },
    {
        path: 'admin',
        loadChildren: () => import('@app-modules/admin/admin.module').then(m => m.AdminModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'crisis-center',
        loadChildren: () => import('@app-modules/crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
        data: { preload: false }
    },
    {
        path: 'login',
        loadChildren: () => import('@app-modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'heroes',
        loadChildren: () => import('@app-modules/heroes/heroes.module').then(m => m.HeroesModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clients'
    },
    {
        path: '**',
        redirectTo: ''
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
