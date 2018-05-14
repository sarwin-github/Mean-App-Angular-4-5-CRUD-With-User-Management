import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegistrationService } from '../../api/services/user/user-registration.service';

@Component({
	selector: 'app-user-registration',
	animations: [
	    trigger(
	      'enterAnimation', [
	        transition(':enter', [
	          style({opacity: 0}),
	          animate('300ms', style({opacity: 1}))
	        ]),
	        transition(':leave', [
	          style({opacity: 1}),
	          animate('300ms', style({opacity: 0}))
	        ])
	    ])
	],
	templateUrl: './user-registration.component.html',
	styleUrls: ['./user-registration.component.css'],
	providers: [UserRegistrationService]
})
export class UserRegistrationComponent implements OnInit {
	private req     : any;
	private postReq : any;

	user           : IUserInput;
	message        : string;
	error          : string;
	userSignupForm : FormGroup;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userRegistrationService: UserRegistrationService) {
			this.user = <IUserInput>{};
		}

	ngOnInit() {
		this.userSignupForm = this.formBuilder.group({
	      'email'      : [null, Validators.compose([Validators.required, Validators.email])],
	      'password'   : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
	      'confirmPassword' : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
	      'name'       : [null, Validators.compose([Validators.required])],
	      'address'    : [null, Validators.compose([Validators.required])]
	    });

		window.scroll(0,0);
	}

	/* signupUser - create new user
	* parameter
	* 	- @event : event value
	*/

	signUpUser(e){
		// initialize inputs
	  	let body  = {
	  		'email'      : this.user.email,
	  		'password'   : this.user.password,
	  		'confirm-password': this.user.confirmPassword,
	  		'name'       : this.user.name,
	  		'address'    : this.user.address,
	  	};

	  	// modify headers
	  	let headers = new Headers();
		  	headers.append('Content-Type', 'application/json');
		
		// create request options
		let options = new RequestOptions({headers: headers, withCredentials: true});

		// execute http post request
		this.postReq = this.userRegistrationService.postSignUp(JSON.stringify(body), options).subscribe((result) => {
	  		// if error then throw error result 
	  		if(result.error){
	  			window.scroll(0, 0);
	  			sessionStorage.setItem('signupError', result.error);

	  			this.error = sessionStorage.getItem('signupError');
	  			this.error = this.error.split(',').join('<br>');
  			    return this.router.navigate(['user/registration']);
	  		} 
	  		// if no error, execute login validation
	  		else {
	  			sessionStorage.removeItem('signupError');
	  			sessionStorage.setItem('signupMessage', 'Registration was successful.');

	  			this.userSignupForm.reset();

	  			this.message = sessionStorage.getItem('signupMessage');
    	    	this.userRegistrationService.setUserLogin(true);
    			this.router.navigate(['user/registration']);
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
		sessionStorage.removeItem('signupError');
		sessionStorage.removeItem('signupMessage');
	   	this.error   = undefined;
	   	this.message = undefined;
	}

	ngOnDestroy(){
		sessionStorage.removeItem('signupError');
		sessionStorage.removeItem('signupMessage');
		this.req.unsubscribe();
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
