import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fadeIn } from '../../animations/fade-in';
import { slideInOut } from '../../animations/slide-in';
import { UserProfileService } from '../../api/services/user/user-profile.service';

@Component({
	selector: 'app-user-profile',
	animations: [fadeIn, slideInOut],
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	providers: [UserProfileService],
})
export class UserProfileComponent implements OnInit {
	private req : any;
	private deleteReq : any;

	token   : string = sessionStorage.getItem('token');
	message : string = sessionStorage.getItem('updateMessage');
	user    : IUserInput;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private userProfileService: UserProfileService) { this.user = <IUserInput>{}; }

	ngOnInit() {
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

	/* deleteUser - delete user
	* parameter
	* 	- @event : event value
	*/

	deleteUser(e){
		// execute http post request
		this.deleteReq = this.userProfileService.deleteUser(this.user._id).subscribe((result) => {
			sessionStorage.clear();
	  		sessionStorage.setItem('loginMessage', 'Account has been successfully deleted.');
	  		this.router.navigate(['user/login']);
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
		sessionStorage.removeItem('updateMessage');
	   	this.message = undefined;
	}

	ngOnDestroy(){
		sessionStorage.removeItem('updateMessage');
		this.req.unsubscribe();
		if(this.deleteReq) this.deleteReq.unsubscribe();
	}
}

interface IUserInput{
	email   : string;
	_id     : string;
}