import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home/home.routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

import { UserGuard } from './api/guards/user/user.guard';
import { CustomRequestOptions } from './api/request-options/set-auth-header';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  providers: [UserGuard, { provide: RequestOptions, useClass: CustomRequestOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
