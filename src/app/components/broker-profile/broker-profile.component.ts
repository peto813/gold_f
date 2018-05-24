import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest-service';

@Component({
  selector: 'app-broker-profile',
  templateUrl: './broker-profile.component.html',
  styleUrls: ['./broker-profile.component.css']
})
export class BrokerProfileComponent implements OnInit {

  constructor(private restService:RestService) { }
  userData;
  ngOnInit() {
  	this.userData= this.restService.getUserData()
  }

}
