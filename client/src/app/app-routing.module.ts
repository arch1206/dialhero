import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from "../authgaurd"
import { ListComponent } from './admin/list/list.component';
import { CreateComponent } from './admin/create/create.component';


const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"list",
    canActivate:[AdminGuard],
    component:ListComponent
  },
  {
    path:"create",
    canActivate:[AdminGuard],
    component:CreateComponent
  },
  {
    path:"**",
    redirectTo:"",
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
