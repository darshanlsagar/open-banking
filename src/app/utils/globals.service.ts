import {
	Injectable,
	ViewContainerRef,
	ComponentFactoryResolver,
	Injector,
} from "@angular/core";
import {
	HttpClientModule,
	HttpClient,
	HttpHeaders,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

declare var Swal: any;

const defHttpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
		/* "Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type" */
	}),
};

@Injectable({
	providedIn: "root",
})
export class Globals {
	userId: string = "";
	userName: string = "Asdf";
	serverUrl: string = "http://20.44.226.11/forgeopenbanking";
	launcher: ViewContainerRef;
	code: string;
	clientId: string = "S0Q27-PqhEqUHn1rIDB97_8L6l1OtTobEi0zY_fPCyc=";
	consentId: string;
	accessToken: string;

	constructor(
		private httpCli: HttpClient,
		public injector: Injector,
		public resolver: ComponentFactoryResolver
	) { }

	loadView(view) {
		const factory = this.resolver.resolveComponentFactory(view);
		let component = factory.create(this.injector);
		this.launcher.clear();
		this.launcher.insert(component.hostView);
	}

	getHeader() {
		let header = {};
		////// build header required
		return header;
	}

	getHttpOptions(param) {
		let httpOptions = param.httpOptions?param.httpOptions:defHttpOptions;
		if (param.httpOptions) {
			httpOptions = { httpOptions, ...param.httpOptions };
		}
		return httpOptions;
	}

	invokeMethod(param, methodName?){
		let method = methodName ? param[methodName] : param[param.methodName];
        if(method){
            if(param.context){
                return method.call(param.context, param);
            } else {
                return method(param);
            }
        } else {
			console.log("Invokation Method Not Found");
		}
	}

	requestSubscriber(param) {
		let url = param.url ? param.url : this.serverUrl;
		let req = {};
		req["header"] = this.getHeader();
		req["body"] = param.reqObj;
		let httpOptions = this.getHttpOptions(param);
		/* this.httpCli.post(url, param.reqObj, httpOptions).subscribe(
			(response) => {
				param.resObj = response;
				this.invokeMethod(param, "callback");
				return response;
			}, (httpError) => {
				if(httpError.error instanceof ProgressEvent){
					param.error = httpError;
				} else {
					param.error = httpError.error;
				}
				this.invokeMethod(param, "callback");
				return param.error;
			}
		) */
		return this.httpCli.post(url, param.reqObj, httpOptions).pipe(
			map((res) => {
				let key = Object.keys(res)[0];
				return res[key];
			})
		);
	}

	postFile(fileToUpload: File): Observable<boolean> {
		const endpoint = "your-destination-url";
		const formData: FormData = new FormData();
		formData.append("fileKey", fileToUpload, fileToUpload.name);
		return this.httpCli.post(endpoint, formData).pipe(
			map((res) => {
				return true;
			})
		);
	}

	createEvent(name) {
		var e = document.createEvent("Event");
		e.initEvent(name, true, true);
		return e;
	}

    displayPopup(param){
        if(param.msg){
            param.text = param.msg;
        }
        Swal.fire(param).then((res)=>{
            param.popupState = res;
            this.invokeMethod(param, 'callback');
        })
	}
}
