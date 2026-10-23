import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            {
                path: 'categorias',
                loadComponent: () => import('./app/features/categorias/categoria-master/categoria-master.componet')
                    .then((m) => m.CategoriaMasterComponet)
            },
            {
                path: 'marcas',
                loadComponent: () => import('./app/features/marcas/marca-home/marca-home.component')
                    .then((m) => m.MarcaHomeComponent)
            },
            {
                path: 'productos',
                loadComponent: () => import('./app/features/productos/producto-home/producto-home.component')
                    .then((m) => m.ProductoHomeComponent)
            },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    {
        path: 'login',
        loadComponent: () => import('./app/core/auth/login/component/login.component').then((m) => m.LoginComponent)
    },
    { path: '**', redirectTo: '/notfound' }
];
