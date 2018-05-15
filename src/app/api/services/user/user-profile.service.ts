import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://localhost:4201/api';

@Injectable()
export class UserProfileService {
	private isUserLoggedIn: any;

	constructor(private http: Http, private router: Router) { }

	// get user profile
	getProfile(option:any): Observable<any>{
		return this.http
		.get(`${endpoint}/profile`, option)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// get user list
	getUserList(option:any): Observable<any>{
		return this.http
		.get(`${endpoint}/list`, option)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// update user profile
	profileUpdate(body:any, option:any, id: string): Observable<any>{
		return this.http
		.put(`${endpoint}/update/${id}`,body, option)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// update user profile
	deleteUser(option:any, id:string): Observable<any>{
		return this.http
		.delete(`${endpoint}/delete/${id}`, option)
		.map(res => res.json())
		.catch(this.handleError)
	}


	// error handler
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	}
}
