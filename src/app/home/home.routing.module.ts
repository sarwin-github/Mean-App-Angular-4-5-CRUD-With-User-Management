import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserRegistrationComponent } from '../user/user-registration/user-registration.component';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent },
  	{ path: 'user/registration', component: UserRegistrationComponent }
];

@NgModule({
  imports: [
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    UserRegistrationComponent
  ]
})

export class HomeRoutingModule { }