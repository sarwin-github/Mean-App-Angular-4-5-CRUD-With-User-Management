import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { UserRegistrationComponent } from '../user/user-registration/user-registration.component';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent },
  	{ path: 'user/registration', component: UserRegistrationComponent }
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
    HomeComponent,
    UserRegistrationComponent
  ]
})

export class HomeRoutingModule { }