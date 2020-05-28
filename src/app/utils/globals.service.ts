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

const xlmxHttpOptions = {
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
	serverUrl: string = "";
	launcher: ViewContainerRef;

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
		let httpOptions = xlmxHttpOptions;
		if (param.httpOptions) {
			httpOptions = { httpOptions, ...param.httpOptions };
		}
		return httpOptions;
	}

	requestSubscriber(param) {
		let url = this.serverUrl;
		let req = {};
		req["header"] = this.getHeader();
		req["body"] = param.reqObj;
		let httpOptions = this.getHttpOptions(param);
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
}
