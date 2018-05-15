import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserLoginService } from '../../services/user/user-login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private userLoginService: UserLoginService, private router: Router){}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.userLoginService.getUserLogin()) return true;
		else {
			console.log("Route is authenticated.");
			sessionStorage.setItem('loginError', "You are not allowed to access this URL. Please login to continue.");
			sessionStorage.setItem('returnURL', this.router.url);
			this.router.navigate(['user/login']);
			return false;
		}
	}
}
