import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

const xlmxHttpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		/* "Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type" */
	})
};

@Injectable({
	providedIn:'root'
})
export class Globals {
	userId:string = "";
	userName:string = "";
	serverUrl:string = "";

	constructor(private httpCli: HttpClient){

	}

	getHeader() {
		let header = {}
		////// build header required
		return header;
	}

	getHttpOptions(param) {
		let httpOptions = xlmxHttpOptions;
		if (param.httpOptions) {
			httpOptions = { httpOptions, ...param.httpOptions };
		}
		return httpOptions;
	}

	requestSubscriber(param) {
		let url = this.serverUrl;
		let req = {};
		req['header'] = this.getHeader();
		req['body'] = param.reqObj;
		let httpOptions = this.getHttpOptions(param);
		return this.httpCli.post(url, param.reqObj, httpOptions).pipe(
			map(res => {
				let key = Object.keys(res)[0]
				return res[key];
			})
		);
	}
	
}