import { HomeComponent } from './pages/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAsanaComponent } from './pages/create-asana/create-asana.component';
import { StandPoseComponent } from './pages/stand-pose/stand-pose.component';
import { SitPoseComponent } from './pages/sit-pose/sit-pose.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'register', component :RegisterComponent},
  {path: 'home', component: HomeComponent,children:[
    {path:'standPose',component: StandPoseComponent},
    {path:'sitPose',component:SitPoseComponent}
  ]},
  {path: 'createAsana', component: CreateAsanaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
