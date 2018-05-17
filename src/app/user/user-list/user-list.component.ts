import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fadeIn } from '../../animations/fade-in';
import { UserProfileService } from '../../api/services/user/user-profile.service';

@Component({
	selector: 'app-user-list',
	animations: [fadeIn],
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
	providers: [UserProfileService]
})
export class UserListComponent implements OnInit {
	private req : any;
	token : string = sessionStorage.getItem('token');
	users : any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private userProfileService: UserProfileService) { }

	ngOnInit() {
		// execute http get request
		this.req = this.userProfileService.getUserList().subscribe((result) => {
	  		this.users = result.users;
	  		console.log(result);
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
