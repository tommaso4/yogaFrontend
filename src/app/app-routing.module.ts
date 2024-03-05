import { HomeComponent } from './pages/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAsanaComponent } from './pages/create-asana/create-asana.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component :RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'createAsana', component: CreateAsanaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
