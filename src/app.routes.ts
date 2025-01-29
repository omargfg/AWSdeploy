import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/portada/login';
import { isAuthenticatedGuard } from './app/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './app/guards/is-not-authenticated.guard';
import authRoutes from './app/pages/auth/auth.routes';
import { RegisterPage, } from './app/pages/auth/portada/register';
import { Portada } from './app/pages/auth/portada';
import { RegisterSuccess } from './app/pages/auth/portada/registerSuccess';


export const appRoutes: Routes = [



    {
        path: 'main',
       // canActivate: [ isAuthenticatedGuard ],
        component:AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'Dashboard', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'notfound', component: Notfound },

        ]
    },

  {  path: '',
        //canActivate: [ isNotAuthenticatedGuard ],
        component: Portada,
        children:[
         {path:'login',component: Login},
         {path:'register',component: RegisterPage},
         {path:'success',component: RegisterSuccess},
         { path: '**', component: Login }
        ],

    },
    { path: '**', component: Notfound }
];
