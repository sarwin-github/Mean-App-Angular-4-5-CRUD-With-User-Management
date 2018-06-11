import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { HomeComponent } from './home.component';
import { ErrorComponent } from '../error/error.component';
import { UserListComponent } from '../user/user-list/user-list.component';
import { UserLoginComponent } from '../user/user-login/user-login.component';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { UserRegistrationComponent } from '../user/user-registration/user-registration.component';
import { UserUpdateComponent } from '../user/user-update/user-update.component';

import { UserLoginService } from '../api/services/user/user-login.service';
import { UserGuard } from '../api/guards/user/user.guard';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'error', component: ErrorComponent },
  	{ path: 'user', 
      children: [
        { path: 'registration', component: UserRegistrationComponent },
        { path: 'login', component: UserLoginComponent },
        { 
          path: 'list', 
          canActivate: [UserGuard],  
          component: UserListComponent 
        },
        { 
          path: 'profile', 
          canActivate: [UserGuard],  
          component: UserProfileComponent 
        },
        { 
          path: 'update', 
          canActivate: [UserGuard],  
          component: UserUpdateComponent 
        }
    ]}
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    AboutComponent,
    HomeComponent,
    ErrorComponent,
    UserListComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserRegistrationComponent,
    UserUpdateComponent
  ],
  providers: [UserLoginService]
})

export class HomeRoutingModule { }