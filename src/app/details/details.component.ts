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

  constructor(public globals: Globals) {}

  ngOnInit() {
	let httpOpts = {
		headers: new HttpHeaders({
			"Content-Type": "application/json"
		})
	}
    /* let sub = this.globals.requestSubscriber({
      url: this.globals.serverUrl + "/accounts",
      reqObj: {},
      httpOptions: httpOpts
    });
    sub.subscribe(
      (response) => {
        console.log(response);
        this.loadAccounts(response.Data.Account);
      },
      (httpError) => {
        console.log(httpError);
        this.globals.displayPopup({ msg: httpError.message });
      }
    ); */
    this.loadAccounts(accounts.Data.Account);
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
    this.globals.loadView(AccDetails);
  }
}
