import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { StandPoseComponent } from './pages/stand-pose/stand-pose.component';
import { SitPoseComponent } from './pages/sit-pose/sit-pose.component';
import { BelancePoseComponent } from './pages/balance-pose/belance-pose.component';
import { MantraComponent } from './pages/mantra/mantra.component';
import { DetailAsanaComponent } from './pages/detail-asana/detail-asana.component';
import { PersonalAsanaComponent } from './pages/personal-asana/personal-asana.component';
import { SliderAsanaComponent } from './pages/slider-asana/slider-asana.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {path: '',pathMatch:'full',redirectTo:'/login'},
  {path: 'login', component: LoginComponent },
  {path: 'register', component :RegisterComponent},
  {path: 'home', component: HomeComponent,children:[
    {path:'standPose',component: StandPoseComponent},
    {path:'sitPose',component:SitPoseComponent},
    {path:'balance',component:BelancePoseComponent},
    {path:'mantra',component:MantraComponent},
    {path:'detail/:id', component: DetailAsanaComponent},
    {path: 'myAsana', component: PersonalAsanaComponent},
    {path: 'userDetail', component: UserDetailsComponent},
  ],canActivate:[AuthGuardGuard]},
  {path: 'sliderAsana', component: SliderAsanaComponent},
  { path: 'managementAsana', loadChildren: () => import('./management-asana/management-asana.module').then(m => m.ManagementAsanaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
