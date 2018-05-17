import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { hostUrl } from '../../api-host-config/host-config';

const endpoint = hostUrl + '/api';

@Injectable()
export class UserProfileService {
	private isUserLoggedIn: any;

	constructor(private http: Http, private router: Router) { }

	// get user profile
	getProfile(): Observable<any>{
		return this.http
		.get(`${endpoint}/profile`)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// get user list
	getUserList(): Observable<any>{
		return this.http
		.get(`${endpoint}/list`)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// update user profile
	profileUpdate(body:any, id: string): Observable<any>{
		return this.http
		.put(`${endpoint}/update/${id}`, body)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// update user profile
	deleteUser(id:string): Observable<any>{
		return this.http
		.delete(`${endpoint}/delete/${id}`)
		.map(res => res.json())
		.catch(this.handleError)
	}


	// error handler
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	}
}
