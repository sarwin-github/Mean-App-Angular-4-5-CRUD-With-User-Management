import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/fade-in';

@Component({
	selector: 'app-about',
	animations: [fadeIn],
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
