import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fadeIn } from '../../animations/fade-in';
import { UserProfileService } from '../../api/services/user/user-profile.service';

@Component({
	selector: 'app-user-profile',
	animations: [fadeIn],
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
	providers: [UserProfileService],
})
export class UserProfileComponent implements OnInit {
	private req : any;
	token : string = sessionStorage.getItem('token');
	user : any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private userProfileService: UserProfileService) {}

	ngOnInit() {
		// modify headers
	  	let headers = new Headers();
		  	headers.append('Content-Type', 'application/json');
			headers.append('Authorization', this.token);

		// create request options
		let options = new RequestOptions({headers: headers, withCredentials: true});

		// execute http get request
		this.req = this.userProfileService.getProfile(options).subscribe((result) => {
	  		this.user = result.user;
	  	},
	  	// If error in server/api temporary navigate to error page
		(err) => {
			sessionStorage.setItem('sessionError', err);
			sessionStorage.setItem('sessionUrl', this.router.url);
			this.router.navigate(['error'])
		});	  
	}


	ngOnDestroy(){
		this.req.unsubscribe();
	}
}
