import { Component, OnInit } from "@angular/core";
import { Globals } from "../utils/globals.service";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import * as accounts from "../../assets/json/accounts.json";
import { AccDetails } from "../accdetails/accdetails.component";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: "loans-page",
  templateUrl: "details.component.html",
  styleUrls: ["./simple-sidebar.css"],
})
export class Details implements OnInit {
  accounts: FormArray = new FormArray([]);
  //accountDetails:any = [];
  constructor(public globals: Globals) {}

  ngOnInit() {
    this.getExchangeToken()
	  let httpOpts = {
	  	headers: new HttpHeaders({
		  	"Content-Type": "application/json"
		  })
  	}
  this.loadAccounts(accounts.Data.Account);
  }

  async getExchangeToken(){
    debugger;
	  let sub = await this.globals.requestSubscriber({url: this.globals.serverUrl+"/exchangetoken", reqObj: {code:this.globals.code}});
	  sub.subscribe(
		(response) => {
      debugger;
      this.globals.accessToken = response;
      this.getAccountsDetails(this.globals.accessToken);
			//console.log(response);
		}, (httpError) => {
			//console.log(httpError);
			this.globals.displayPopup({msg:httpError.message});
		}
	)
  }
  async getAccountsDetails(param){
    debugger;
    let sub = this.globals.requestGetSubscriber(param);
      sub.subscribe(
      (response) => {
        //debugger;
        //console.log("dat from get account "+response.Data.Account);
        this.accounts = response.Data.Account
      },
      (httpError) => {
        console.log(httpError);
        this.globals.displayPopup({ msg: httpError.message });
      }
      );
  }
  addAcc(acc) {
    return new FormGroup({
      AccountSubType: new FormControl(acc.AccountSubType),
      AccountId: new FormControl(acc.AccountId),
      Nickname: new FormControl(acc.Nickname),
    });
  }

  loadAccounts(accounts) {
    for (let a = 0; a < accounts.length; a++) {
      const acc = accounts[a];
      this.accounts.push(this.addAcc(acc));
    }
  }

  cardAction(acc) {
    this.globals.accountId = acc;
    this.globals.loadView(AccDetails);
  }
}
