import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './portada/login';
import { Error } from './error';
import { RegisterPage } from './portada/register';

export default [

    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: RegisterPage },
    { path: '', redirectTo: 'login',pathMatch: 'full'},
] as Routes;
