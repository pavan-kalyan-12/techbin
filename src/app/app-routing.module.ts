import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerComponent } from './manager/manager.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path:'login:id', component:LoginComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'manager', component: ManagerComponent},
    {path:"**",component : LoginComponent}
  ];
  @NgModule({
    imports: [RouterModule.forRoot(rootRouterConfig)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }