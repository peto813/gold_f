import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import { DateRange }    from '../model-classes/date-range-model';

@Component({
  selector: 'app-search-dates',
  templateUrl: './search-dates.component.html',
  styleUrls: ['./search-dates.component.css']
})
export class SearchDatesComponent implements OnInit {
	@Input() restService;
	@Input() userService;
	model:DateRange;
	//@Input() params;
  constructor(public activeModal: NgbActiveModal, private alertService: AlertService) { }

	  submitted = false;
	  // fromDate='';
	  // toDate='';
	  //model;

	onSubmit(){
  		this.submitted = true;
  		let data= {}
  		let company = this.userService.getCompanyData();
  		this.restService.queryDates(company.id, this.model).subscribe(data=>{
  			this.activeModal.close(data);
  		},
  		err=>{
  			let error= this.restService.getErrorMessage(err);
  			this.alertService.error(error);
  		});
	}

	  ngOnInit() {
		  	this.model = new DateRange(
		  		'',
		  		'',
		  		'custom'
		  	)
	  }

}
