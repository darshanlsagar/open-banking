import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './landingpage/landingpage.component';
import { Dashboard } from './dashboard/dashboard.component';
import { LauncherDirective } from './utils/launcher.directive';

@NgModule({
  declarations: [
	AppComponent,
	LandingPage,
	Dashboard,

	LauncherDirective
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
