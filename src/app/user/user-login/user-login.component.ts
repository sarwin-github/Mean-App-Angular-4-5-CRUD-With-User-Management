import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {fadeIn} from '../../animations/fade-in';
import { UserLoginService } from '../../api/services/user/user-login.service';

@Component({
	selector: 'app-user-login',
	animations: [fadeIn],
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css'],
	providers: [UserLoginService]
})
export class UserLoginComponent implements OnInit {
	private postReq : any;

	user           : IUserInput;
	message        : string = sessionStorage.getItem('loginMessage');
	error          : string = sessionStorage.getItem('loginError');
	userLoginForm : FormGroup;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userLoginService: UserLoginService) {
			this.user = <IUserInput>{};
		}

	ngOnInit() {
		this.userLoginForm = this.formBuilder.group({
	      'email'      : [null, Validators.compose([Validators.required, Validators.email])],
	      'password'   : [null, Validators.compose([Validators.required, Validators.minLength(6)])]
	    });

		window.scroll(0,0);
	}

	/* loginUser - login user
	* parameter
	* 	- @event : event value
	*/

	loginUser(e){
		// initialize inputs
	  	let body  = {
	  		'email'      : this.user.email,
	  		'password'   : this.user.password,
	  	};

	  	// modify headers
	  	let headers = new Headers();
		  	headers.append('Content-Type', 'application/json');
		
		// create request options
		let options = new RequestOptions({headers: headers, withCredentials: true});

		// execute http post request
		this.postReq = this.userLoginService.postLogin(JSON.stringify(body), options).subscribe((result) => {
	  		// if error then throw error result 
	  		if(result.error){
	  			window.scroll(0, 0);
	  			sessionStorage.setItem('loginError', result.error);

	  			this.error = sessionStorage.getItem('loginError');
	  			this.error = this.error.split(',').join('<br>');
  			    return this.router.navigate(['user/login']);
	  		} 
	  		// if no error, execute login validation
	  		else {
	  			sessionStorage.removeItem('loginError');
	  			sessionStorage.setItem('loginMessage', 'Login was successful.');
	  			sessionStorage.setItem('token', 'Bearer ' + result.token);

	  			this.userLoginForm.reset();
	  			this.message = sessionStorage.getItem('loginMessage');
    	    	this.userLoginService.setUserLogin(true);
    			this.router.navigate(['user/profile']);
	  		}
	  	},
	  	// If error in server/api temporary navigate to error page
		(err) => {
			sessionStorage.setItem('sessionError', err);
			sessionStorage.setItem('sessionUrl', this.router.url);
			this.router.navigate(['error'])
		});	  
	}

	// Clear error message
	onAlertClose(): void {
		sessionStorage.removeItem('loginError');
		sessionStorage.removeItem('loginMessage');
	   	this.error   = undefined;
	   	this.message = undefined;
	}

	ngOnDestroy(){
		sessionStorage.removeItem('loginError');
		sessionStorage.removeItem('loginMessage');

		if(this.postReq) this.postReq.unsubscribe();
	}
}

interface IUserInput{
	name            : string;
	email           : string;
	password        : string;
	confirmPassword : string;
	address         : string;
}
