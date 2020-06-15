import { Component } from "@angular/core";
import { Globals } from '../utils/globals.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'dashboard-page',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['./simple-sidebar.css']
})
export class Dashboard {

	loanForm: FormGroup = new FormGroup({
		fullName: new FormControl(''),  
		email: new FormControl(''),
		phoneNumber: new FormControl(''),
		address: new FormControl(''),
		rentOrHome: new FormControl(''),
		sellOrBuy: new FormControl(''),
		prequalified: new FormControl(''),
		comments: new FormControl(''),     
	});
	fileToUpload: File = null;

	constructor(public globals: Globals) {
		let req = {'code':this.globals.code};
		/* let sub = this.globals.requestSubscriber({ url: this.globals.serverUrl+"/exchangetoken", reqObj: req });
		sub.subscribe(
			(response) => {
				console.log(response);
			}, (httpError) => {
				console.log(httpError);
				this.globals.displayPopup({msg:httpError.message});
			}
		) */
	}

	handleFileInput(files: FileList) {
		this.fileToUpload = files.item(0);
	}

	submit() {
		let req = this.loanForm.value;
		debugger;
		console.log(req); 
		//this.uploadFile();
		let sub = this.globals.requestSubscriber({url: this.globals.serverUrl+"/submitDetails", reqObj: req});
		sub.subscribe(
		  (response) => {
			  console.log(response);
		  }, (httpError) => {
			  console.log(httpError);
			  this.globals.displayPopup({msg:httpError.message});
		  }
	  )
	}

	uploadFile() {
		this.globals.postFile(this.fileToUpload).subscribe(data => {
			console.log("Success");
		}, error => {
			console.log(error);
		});
	}
}
