import { Component, OnInit } from '@angular/core';
import {DolartodayApiService } from '../../services/dolartoday-api.service'
import { RestService } from '../../services/rest-service';
import { UserService}  from '../../services/user.service';
// dolar today
  ///https://s3.amazonaws.com/dolartoday/data.json
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public isCollapsed = true;

	dolarToday:any;
	xChangerates:any;

  constructor(
    private userService:UserService,
    private restService:RestService
    ) { }


     logOut(){
       this.restService.logout();
     }

  ngOnInit() {
  	// this.dolarTodayData.getData().subscribe(data => {
   //    //return data;
   //    this.dolarToday = data;
   //  });




  	// this.dolarTodayData.getCurrencies().subscribe(data2 => {
   //    //return data;
   //    this.xChangerates = data2;
   //  });
  }

}
