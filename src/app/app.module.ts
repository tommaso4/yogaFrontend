import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StandPoseComponent } from './pages/stand-pose/stand-pose.component';
import { SitPoseComponent } from './pages/sit-pose/sit-pose.component';
import { BelancePoseComponent } from './pages/balance-pose/belance-pose.component';
import { MantraComponent } from './pages/mantra/mantra.component';
import { CommonModule } from '@angular/common';
import { AsideBarComponent } from './component/aside-bar/aside-bar.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { DetailAsanaComponent } from './pages/detail-asana/detail-asana.component';
import { PersonalAsanaComponent } from './pages/personal-asana/personal-asana.component';
import { AsanaFilteredComponent } from './component/asana-filtered/asana-filtered.component';
import { HeartSvgComponent } from './component/heart-svg/heart-svg.component';
import { SliderAsanaComponent } from './pages/slider-asana/slider-asana.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { NotAuhtComponent } from './pages/not-auht/not-auht.component';
import { GratitudeComponent } from './pages/gratitude/gratitude.component';
import { AboutYogaComponent } from './pages/about-yoga/about-yoga.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StandPoseComponent,
    SitPoseComponent,
    BelancePoseComponent,
    MantraComponent,
    AsideBarComponent,
    NavigationComponent,
    DetailAsanaComponent,
    PersonalAsanaComponent,
    AsanaFilteredComponent,
    HeartSvgComponent,
    SliderAsanaComponent,
    UserDetailsComponent,
    NotAuhtComponent,
    GratitudeComponent,
    AboutYogaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
