import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Transaction }    from '../../model-classes/transaction-model';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accounts:Array<any>;
	table_data:Array<Transaction>;
  message;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private alertService: AlertService
  	) {

  	}

  updateAccounts(accounts){
    this.accounts = accounts;
  }

  ngOnInit() {
		  this.route.data.subscribe(response=>{
        console.log(response)
		  	this.table_data= response.transactions.data;
        this.message= response.transactions.message;
        this.accounts = response.transactions.accounts;
        if (this.message) {
            this.alertService.warning(this.message);
        }

		  })
  }

}
