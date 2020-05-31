import { Component, OnInit } from "@angular/core";
import { Globals } from '../utils/globals.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as accounts from '../../assets/json/accounts.json';

@Component({
	selector: 'loans-page',
	templateUrl: 'details.component.html',
	styleUrls: ['./simple-sidebar.css']
})
export class Details implements OnInit {

	accounts: FormArray = new FormArray([]);
	account: FormGroup = new FormGroup({
		AccountType: new FormControl(''),
		Nickname: new FormControl(''),
	})

	fileToUpload: File = null;

	constructor(public globals: Globals) { }

	ngOnInit(){
		this.loadAccounts();
	}

	loadAccounts(){

	}

}