import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Globals } from './utils/globals.service';
import { LandingPage } from './landingpage/landingpage.component';
import { Dashboard } from "./dashboard/dashboard.component";
import { Loans } from './loans/loans.component';

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
	var codeUrl = new URL(location.href.replace("#", "?"));
	if(codeUrl.href.indexOf("?") > -1){
		let code = codeUrl.searchParams.get("code");
		this.globals.code = code;
		this.globals.userId = localStorage.getItem("userId");
		// this.globals.userId = "Guest";
		this.globals.loadView(Dashboard);
	} else {
		localStorage.removeItem("userId");
		this.globals.loadView(LandingPage);
		this.requestToken();
	}
	this.cdRef.detectChanges();
  }

  async requestToken(){
	  let sub = await this.globals.requestSubscriber({url: this.globals.serverUrl+"/accountaccessconsent", reqObj: {}});
	  sub.subscribe(
		(response) => {
			this.globals.consentId = response.ConsentId;
			console.log(response);
		}, (httpError) => {
			console.log(httpError);
			this.globals.displayPopup({msg:httpError.message});
		}
	)
  }
  
}
