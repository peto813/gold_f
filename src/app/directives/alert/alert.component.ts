import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private alertService: AlertService) { }
  message:any;
  ngOnInit() {
  	   this.alertService.getMessage().subscribe(message => { this.message = message; });
  }



  public closeAlert() {
  	this.message='';
  }

}