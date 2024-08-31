import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { CarService } from './car.service';
import { FormsModule } from '@angular/forms';
import { ApplicationModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// @Component({
//   standalone: true,
//   imports: [AppComponent],
//   template: `
//     <h1>My App</h1>
//     <app-app></app-app>
//   `
// })
export class MyStandaloneComponent {}

@NgModule({
  declarations: [
    //AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
     FormsModule,  ApplicationModule
  ],
  providers: [CarService],
  // bootstrap: [AppComponent]
})
export class AppModule { }
/////////////////////

