import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {fadeIn} from '../../animations/fade-in';
import { UserProfileService } from '../../api/services/user/user-profile.service';

@Component({
  	selector: 'app-user-update',
  	animations: [fadeIn],
  	templateUrl: './user-update.component.html',
  	styleUrls: ['./user-update.component.css'],
  	providers: [UserProfileService]
})
export class UserUpdateComponent implements OnInit {
	private req     : any;
	private postReq : any;

  	user           : IUserInput;
  	userUpdateForm : FormGroup;

	error : string;
	token : string = sessionStorage.getItem('token');
	

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userProfileService: UserProfileService) {
			this.user = <IUserInput>{};
		}

	ngOnInit() {
		this.userUpdateForm = this.formBuilder.group({
	      'name'       : [null, Validators.compose([Validators.required])],
	      'address'    : [null, Validators.compose([Validators.required])]
	    });

		window.scroll(0,0);

		this.getUserProfile();  
	}

	/* getUserProfile - get user details for update
	*/

	getUserProfile(){
		// execute http get request
		this.req = this.userProfileService.getProfile().subscribe((result) => {
	  		this.user = result.user;
	  	},
	  	// If error in server/api temporary navigate to error page
		(err) => {
			sessionStorage.setItem('sessionError', err);
			sessionStorage.setItem('sessionUrl', this.router.url);
			this.router.navigate(['error'])
		});	
	}

	/* updateUser - update user
	* parameter
	* 	- @event : event value
	*/

	updateUser(e){
		// initialize inputs
	  	let body  = {
	  		'name'       : this.user.name,
	  		'address'    : this.user.address,
	  	};

		// execute http post request
		this.postReq = this.userProfileService.profileUpdate(JSON.stringify(body), this.user._id).subscribe((result) => {
	  		// if error then throw error result 
	  		if(result.error){
	  			window.scroll(0, 0);
	  			sessionStorage.setItem('updateError', result.error);

	  			this.error = sessionStorage.getItem('updateError');
	  			this.error = this.error.split(',').join('<br>');
  			    return this.router.navigate(['user/update']);
	  		} 
	  		// if no error, execute login validation
	  		else {
	  			sessionStorage.removeItem('updateError');
	  			sessionStorage.setItem('updateMessage', 'Successfully updated user profile.');
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
		sessionStorage.removeItem('updateError');
	   	this.error   = undefined;
	}

	ngOnDestroy(){
		sessionStorage.removeItem('updateError');
		if(this.postReq) this.postReq.unsubscribe();
	}
}

interface IUserInput{
	name    : string;
	email   : string;
	_id     : string;
	address : string;
}