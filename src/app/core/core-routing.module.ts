import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from '@app-core/components/page-not-found/page-not-found.component';

import { AuthGuard } from '@app-modules/auth/guards/auth.guard';
import { PreloadingStrategyService } from '@app-core/services/preloading-strategy/preloading-strategy.service';

const routes: Routes = [
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
        path: 'contacts',
        loadChildren: () => import('@app-modules/contacts/contacts.module').then(m => m.ContactsModule),
        data: { preload: true }
    },
    {
        path: 'products',
        loadChildren: () => import('@app-modules/products/products.module').then(m => m.ProductsModule),
        data: { preload: true }
    },
    {
        path: '',
        loadChildren: () => import('@app-modules/home/home.module').then(m => m.HomeModule),
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
