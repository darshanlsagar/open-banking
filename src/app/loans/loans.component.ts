import { Component } from "@angular/core";
import { Globals } from '../utils/globals.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'loans-page',
	templateUrl: 'loans.component.html',
	styleUrls: ['./simple-sidebar.css']
})
export class Loans {

	loanForm: FormGroup = new FormGroup({
		one: new FormControl(''),
		two: new FormControl(''),
	});
	fileToUpload: File = null;

	constructor(public globals: Globals) { }

	cardAction(event) {
		console.log(event.target);
		if (event.currentTarget.textContent == "NatWest") {
			this.launchConsentScreen()
		}
	}
	
	launchConsentScreen(){
		let resType = "code id_token";
		let scope = "openid accounts";

		let url = "https://api.natwest.useinfinite.io/authorize";
		let paramStr = `client_id=${this.globals.clientId}
		&response_type=${resType}
		&scope=${scope}
		&redirect_uri=${location.href}
		&request=${this.globals.consentId}`;
		window.location.href = url+"?"+paramStr;

	}
}