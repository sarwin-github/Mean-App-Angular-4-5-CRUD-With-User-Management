import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const homeRoute: Routes = [
  	{ path: '', component: HomeComponent },
];

@NgModule({
  imports: [
  	RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent
  ]
})

export class HomeRoutingModule { }