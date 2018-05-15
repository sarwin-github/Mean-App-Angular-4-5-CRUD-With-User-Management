import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { fadeIn } from '../animations/fade-in';
import { HomeService } from '../api/services/home/home.service';

@Component({
	selector: 'app-home',
	animations: [fadeIn],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [HomeService]
})
export class HomeComponent implements OnInit {
	private req : any;

	constructor(
		private homeService: HomeService, 
        private router: Router) { }

	ngOnInit() {
		this.req = this.homeService.home().subscribe((data) => {
			console.log(data);
		});
	}

	ngOnDestroy(){
    	this.req.unsubscribe();
  	}
}
