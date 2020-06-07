import { Component, OnInit } from "@angular/core";
import { Globals } from "../utils/globals.service";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import * as balance from "../../assets/json/balance.json";
import * as trans from "../../assets/json/transactions.json";
import { Details } from "../details/details.component";
import { Dashboard } from "../dashboard/dashboard.component";

declare var $;

@Component({
  selector: "loans-page",
  templateUrl: "accdetails.component.html",
  styleUrls: ["./simple-sidebar.css"],
})
export class AccDetails implements OnInit {
  accounts: FormArray = new FormArray([]);
  balAcc: FormGroup = new FormGroup({
    AccountId: new FormControl("Ac"),
    Amount: new FormControl("Am"),
    Currency: new FormControl("C"),
  });
balanceDetails:any = [];
  constructor(public globals: Globals) {}

  ngOnInit() {
    debugger;
   this.getTransactionDetails();
   this.getBalanceDetails();
  }
async getTransactionDetails(){
  let sub = this.globals.BalTransaction({
		url: this.globals.serverUrl + "/accounts/transactions",
		reqObj: {
      AccountId:this.globals.accountId
    }
	  });
	  sub.subscribe(
		(response) => {
      debugger;
		  console.log(response);
      this.loadTransactions(response.Data.Transaction);
		},
		(httpError) => {
		  console.log(httpError);
		  this.globals.displayPopup({ msg: httpError.message });
		}
	  ); 
    //this.loadBalance(balance.Data.Balance[0]);
}
async getBalanceDetails(){
  let sub = this.globals.BalTransaction({
		url: this.globals.serverUrl + "/accounts/balances",
		reqObj: {
      AccountId:this.globals.accountId
    }
	  });
	  sub.subscribe(
		(response) => {
      debugger;
		  console.log(response);
      this.balanceDetails = response.Data.Balance
		},
		(httpError) => {
		  console.log(httpError);
		  this.globals.displayPopup({ msg: httpError.message });
		}
	  ); 
    //this.loadBalance(balance.Data.Balance[0]);
}
  addAcc(acc) {
    return new FormGroup({
      AccountSubType: new FormControl(acc.AccountSubType),
      AccountId: new FormControl(acc.AccountId),
      Nickname: new FormControl(acc.Nickname),
    });
  }

  loadBalance(balance) {
    this.balAcc.setValue({
      AccountId: balance.AccountId,
      Amount: balance.Amount.Amount,
      Currency: balance.Amount.Currency,
    });
  }

  loadTransactions(transList) {
    let columns = [
      {
        data: "AccountId",
        title: "Account Id",
      },
      {
        data: "TransactionId",
        title: "Transaction Id",
      },
      {
        data: "CreditDebitIndicator",
        title: "Credit Debit Indicator",
      },
      {
        data: "Amount",
        title: "Amount",
      },
    ];
    let colData = [];
    for (let t = 0; t < transList.length; t++) {
      const trans = transList[t];
      let obj = {};
      obj["AccountId"] = trans.AccountId;
      obj["TransactionId"] = trans.TransactionId;
      obj["CreditDebitIndicator"] = trans.CreditDebitIndicator;
      obj["Amount"] = trans.Amount.Amount + " " + trans.Amount.Currency;
      colData.push(obj);
    }
    $("#transactionTable").DataTable({
      columns: columns,
      searching: false,
      ordering: false,
      paging: false,
      data: colData,
    });
  }

  backAction(e) {
    this.globals.loadView(Details);
  }

  loans(e) {
    this.globals.loadView(Dashboard);
  }
}
