import { Component } from '@angular/core';
import { sharedService } from './services/shared-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  { 
	loading=false;
  constructor(

    private sharedScope:sharedService
    ) {

  	this.sharedScope.notify.subscribe(loader=>{
  		this.loading= loader;
  	})

  }

	title = 'Gold Manager Plus'; 
	// public loading = false;

	// public loader(loading:boolean) {
	//  this.loading = loading;
	// }

}
