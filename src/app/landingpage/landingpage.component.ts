import { Component } from "@angular/core";
import { Globals } from '../utils/globals.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

declare var $;

@Component({
	selector:'landing-page',
	templateUrl:'landingpage.component.html',
	styleUrls: ['./landingpage.component.css']
})
export class LandingPage {

	loginForm: FormGroup = new FormGroup({
		userName: new FormControl(''),
		password: new FormControl(''),
	  });

	constructor(public global: Globals, public fb: FormBuilder){

	}

	login(){
		let req = this.loginForm.value;
		console.log(req);
		// this.global.requestSubscriber({reqObj: req});
	}

	cardAction(event){
		console.log(event.target);
		if(!this.global.userId){
			$('#loginModal').modal('show');
		} else {
			//// Launch Detail Page
		}
	}
}