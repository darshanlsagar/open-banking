import { Component } from "@angular/core";
import { Globals } from '../utils/globals.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Dashboard } from '../dashboard/dashboard.component';

declare var $;

@Component({
	selector: 'landing-page',
	templateUrl: 'landingpage.component.html',
	styleUrls: ['./landingpage.component.css']
})
export class LandingPage {

	loginForm: FormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	registrationForm: FormGroup = new FormGroup({
		firstName: new FormControl('', Validators.required),
		middleName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required),
	});

	constructor(public globals: Globals, public fb: FormBuilder) {

	}

	async login() {
		let req = this.loginForm.value;
		console.log(req);
		let sub = await this.globals.requestSubscriber({ url: this.globals.serverUrl+"/login", reqObj: req });
		sub.subscribe(
			(response) => {
				console.log(response);
				this.globals.userId = req.userId.value;
			}, (httpError) => {
				console.log(httpError);
				this.globals.displayPopup({msg:httpError.message});
			}
		)
		console.log("out")
		// this.launchConsentScreen();
	}

	register() {
		if (!this.registrationForm.valid) {
			let req = this.registrationForm.value;
			let sub = this.globals.requestSubscriber({ url: this.globals.serverUrl+"/registerUser", reqObj: req });
			sub.subscribe(
				(response) => {
					console.log(response);
					this.globals.displayPopup({msg:"Registration successful, You login using this credentials"})
				}, (httpError) => {
					console.log(httpError);
					this.globals.displayPopup({msg:httpError.message})
				}
			)
		} else {
			$("#registrationForm input")[0].dispatchEvent(this.globals.createEvent('blur'));
			$("#registrationForm input").each(function (index) {
				$(this).addClass("ng-touched");
			})
		}
	}

	launchConsentScreen(){
		let code = "";
		let openIdAcc = "";
		let consentId = "";

		let url = "https://api.natwest.useinfinite.io/authorize";
		let paramStr = `client_id=${this.globals.clientId}
		&response_type=${code}
		&scope=${openIdAcc}
		&redirect_uri=${location.href}
		&request=${consentId}`;
		window.location.href = url+"?"+paramStr;

	}

	cardAction(event) {
		console.log(event.target);
		if (!this.globals.userId) {
			$('#loginModal').modal('show');
		} else {
			this.globals.loadView(Dashboard);
		}
	}
}