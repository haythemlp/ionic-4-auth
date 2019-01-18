import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
