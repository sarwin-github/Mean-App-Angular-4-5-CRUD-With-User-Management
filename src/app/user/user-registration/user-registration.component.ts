import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {fadeIn} from '../../animations/fade-in';
import { UserRegistrationService } from '../../api/services/user/user-registration.service';
import { UserLoginService } from '../../api/services/user/user-login.service';
import { PasswordValidation } from '../../api/guards/password-validation/password-validation';

@Component({
	selector: 'app-user-registration',
	animations: [fadeIn],
	templateUrl: './user-registration.component.html',
	styleUrls: ['./user-registration.component.css'],
	providers: [UserRegistrationService, UserLoginService]
})
export class UserRegistrationComponent implements OnInit {
	private req     : any;
	private postReq : any;
	private loginReq : any;

	user           : IUserInput;
	userSignupForm : FormGroup;

	message        : string;
	error          : string;
	

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userRegistrationService: UserRegistrationService,
		private userLoginService: UserLoginService) {
			this.user = <IUserInput>{};
		}

	ngOnInit() {
		this.userSignupForm = this.formBuilder.group({
	      'email'      : [null, Validators.compose([Validators.required, Validators.email])],
	      'password'   : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
	      'confirmPassword' : [null, Validators.compose([Validators.required, Validators.minLength(6)])],
	      'name'       : [null, Validators.compose([Validators.required])],
	      'address'    : [null, Validators.compose([Validators.required])]
	    }, { validator: PasswordValidation.MatchPassword });

		window.scroll(0,0);
	}

	/* signupUser - create new user
	* parameter
	* 	- @event : event value
	*/

	signUpUser(e){
		this.user.email           = this.userSignupForm.get('email').value;
		this.user.password        = this.userSignupForm.get('password').value;
		this.user.confirmPassword = this.userSignupForm.get('confirmPassword').value;
		this.user.name            = this.userSignupForm.get('name').value;
		this.user.address         = this.userSignupForm.get('address').value;

		// initialize inputs
	  	let body  = {
	  		'email'    : this.user.email,
	  		'password' : this.user.password,
	  		'confirm-password': this.user.confirmPassword,
	  		'name'     : this.user.name,
	  		'address'  : this.user.address,
	  	};

		// execute http post request
		this.postReq = this.userRegistrationService.postSignUp(JSON.stringify(body)).subscribe((result) => {
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

    			// After successful signup execute login request to server
    			this.loginReq = this.userLoginService.postLogin(JSON.stringify(body)).subscribe((user) => {
		  			sessionStorage.setItem('loginMessage', 'Login was successful.');
		  			sessionStorage.setItem('token', 'Bearer ' + user.token);

		  			this.userSignupForm.reset();
		  			this.message = sessionStorage.getItem('loginMessage');
	    	    	this.userLoginService.setUserLogin(true);
	    			this.router.navigate(['user/profile']);
	  			});
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

		if(this.postReq) this.postReq.unsubscribe();
		if(this.loginReq) this.loginReq.unsubscribe();
	}
}

interface IUserInput{
	name            : string;
	email           : string;
	password        : string;
	confirmPassword : string;
	address         : string;
}
