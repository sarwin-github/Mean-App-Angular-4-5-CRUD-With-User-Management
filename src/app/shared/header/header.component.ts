import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserLoginService } from '../../api/services/user/user-login.service';

@Component({
	selector: 'layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [UserLoginService]
})
export class HeaderComponent implements OnInit {
	private req: any;
	loggedInUser;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private userLoginService: UserLoginService) { }

	ngOnInit() {
		this.req = this.router.events.subscribe(x => {
			this.loggedInUser = this.userLoginService.getUserLogin();
		});
	}

	userLogout(){
		this.req = this.userLoginService
			.logoutUser()
			.subscribe((data) => {
				window.scrollTo(0, 0);
		}, 
		// If error temporary navigate to error page
		(err) => this.router.navigate(['error']));
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}
