import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
	url : any;
	sessionError : any;

	constructor(private router: Router) { }

	ngOnInit() {
		this.url          = this.getSessionUrl();
		this.sessionError = this.getSessionError();
	}

	// get session error from session storage
	getSessionError(): any{
		let storedItem:any = sessionStorage.getItem('sessionError');
        if(!storedItem) return false;
        	else return storedItem;
	}

	// get session url from session storage
	getSessionUrl(): any{
		let storedItem:any = sessionStorage.getItem('sessionUrl');
        if(!storedItem) return false;
        	else return storedItem;
	}

}
