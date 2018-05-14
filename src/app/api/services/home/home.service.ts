import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://localhost:4201/api';

@Injectable()
export class HomeService {

	constructor(private http: Http) { }

	// get home
	home(): Observable<any>{
		return this.http
		.get(`${endpoint}`, { withCredentials : true})
		.map(res => res.json())
		.catch(this.handleError)
	}
  	
  	// error handler
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	}

}
