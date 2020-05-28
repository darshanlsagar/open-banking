import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Globals } from './utils/globals.service';
import { LandingPage } from './landingpage/landingpage.component';
import { Dashboard } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'open-banking';
  loggedIn = "aks";

  constructor(public globals: Globals,
	private cdRef:ChangeDetectorRef
	){}

  ngOnInit(){
  }

  ngAfterViewInit(){
	this.globals.loadView(Dashboard);
	this.cdRef.detectChanges();

  }
  
}
