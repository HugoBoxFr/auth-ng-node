import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
      path: "admin",
      component: AdminComponent,
      canActivate: [AuthGuard] // You have to be connected to create a new post
  }
  // ,{
  //   path: "posts/create",
  //   component: PostCreatePageComponent,
  //   canActivate: [AuthGuard] // You have to be connected to create a new post
  // },
  // {
  //   path: "posts/:id",
  //   component: PostDetailsPageComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
