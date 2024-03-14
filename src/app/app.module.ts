import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateAsanaComponent } from './pages/create-asana/create-asana.component';
import { StandPoseComponent } from './pages/stand-pose/stand-pose.component';
import { SitPoseComponent } from './pages/sit-pose/sit-pose.component';
import { BelancePoseComponent } from './pages/balance-pose/belance-pose.component';
import { MantraComponent } from './pages/mantra/mantra.component';
import { CommonModule } from '@angular/common';
import { AsideBarComponent } from './component/aside-bar/aside-bar.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { DetailAsanaComponent } from './pages/detail-asana/detail-asana.component';
import { PersonalAsanaComponent } from './pages/personal-asana/personal-asana.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreateAsanaComponent,
    StandPoseComponent,
    SitPoseComponent,
    BelancePoseComponent,
    MantraComponent,
    AsideBarComponent,
    NavigationComponent,
    DetailAsanaComponent,
    PersonalAsanaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
