import { Component, OnInit } from '@angular/core';
import { Broker }    from '../../model-classes/broker';
import {UserService} from '../../../services/user.service';
import {RestService} from '../../../services/rest-service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddBrokerFormComponent} from '../../../components/add-broker-form/add-broker-form.component';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BrokerBalancesComponent } from '../../../components/broker-balances/broker-balances.component';
import { AddBrokerBalanceModalComponent } from '../../../components/add-broker-balance-modal/add-broker-balance-modal.component';
import {SortArrayService} from '../../../services/sort-array.service';



import { AddExistingBrokerComponent } from '../../../components/add-existing-broker/add-existing-broker.component';

function getCheckedObjects(transactions: Array<any>, param?:string, paramVal?:boolean): Array<any> {
	let results = []
	if (transactions && JSON.stringify(transactions).indexOf('checked') > -1) {
		//find checked rows
		for (let item = 0; item < transactions.length; item++) {
			
			if(param){
				if (transactions[item]['checked']==true&&transactions[item][param]==paramVal) {

					results.push(transactions[item]);
				}	
			}else{
				if (transactions[item].checked === true) {
					//append to array
					results.push(transactions[item]);
				}	
			}

		}
	}
	return results;
}
@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
	table_data:Array<Broker>;


  	constructor(
  		private userService: UserService,
  		private modalService: NgbModal,
  		private util:SortArrayService,
  		private alertService:AlertService,
  		private route:ActivatedRoute,
  		private restService:RestService,
  		private arrayService: SortArrayService
  		) { }


	ngOnInit() {
		  this.route.data.subscribe(data=>{
		  	console.log(data)

		  	this.table_data= data.brokers;
		  })
	}


	affiliateBroker(){
		const modalRef = this.modalService.open(AddExistingBrokerComponent);
    	modalRef.result.then((data:Broker) => {
    		console.log(data)
    		if(data){
    			this.table_data.push(data);
    			this.table_data= this.util.sortByDesc(this.table_data,'id');
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
        });
	}

  	registerBroker() {
    	const modalRef = this.modalService.open(AddBrokerFormComponent);
    	modalRef.componentInstance.modalData={};
    	//modalRef.componentInstance.modalData.update=false
    	modalRef.result.then((data:Broker) => {
    		if(data){
    			this.table_data.push(data);
    			this.table_data= this.util.sortByDesc(this.table_data,'id');
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
        });

  	}


  	balances(broker){
    	const modalRef = this.modalService.open(BrokerBalancesComponent);
    	modalRef.componentInstance.broker=broker;
    	let company = this.userService.getCompanyData();
    	//get role
    	for (var i = 0; i < broker.userprofile.roles.length; ++i) {
    		let role= broker.userprofile.roles[i];
    		if (company.id==role.company) {
    			modalRef.componentInstance.role=role;
    			break;
    		}
    	}
    	
    	modalRef.result.then((data:Broker) => {
    		if(data){
    			this.table_data.push(data);
    			this.table_data= this.util.sortByDesc(this.table_data,'id');
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
        });  

  	}

  	add_balance(broker){
    	const modalRef = this.modalService.open(AddBrokerBalanceModalComponent);
    	modalRef.componentInstance.broker=broker;
    	let company = this.userService.getCompanyData();
    	//get role
    	for (var i = 0; i < broker.userprofile.roles.length; ++i) {
    		let role= broker.userprofile.roles[i];
    		if (company.id==role.company) {
    			modalRef.componentInstance.role=role;
    			break;
    		}
    	}
    	
    	modalRef.result.then((data:any) => {
        console.log(data)
    		// if(data){
    		// 	this.table_data=this.arrayService.modifyInstance(this.table_data, 'id', data.id, data);

    		// }
	    }).catch(function (err) { // <- See this <<<<<<<<
        let errMsg = this.restService.getErrorMessage(err);
        console.log(errMsg);
        });  

  	}



	remBroker(broker:Broker) {
		if (confirm("¿Esta seguro(a) de que desea desincorporar a "+name+" como broker de la empresa?")) {
			this.restService.delBroker(broker).subscribe(response=>{
				let delId;
				if(response){
					
					for(var i=0; i<this.table_data.length;i++){
						let instance = this.table_data[i];
						if (instance.userprofile.id==response) {
							// code...
							delId= i;
							break;
						}
					}
					if(delId!=undefined){
						console.log(delId)
						this.table_data.splice(delId, 1);
					}
				}

			},
			err=>{
				console.log(err);
			});
		}

	}


  	getRole(broker){
  		let role= undefined;
  		let roles= broker.userprofile.roles;
  		const company = this.userService.getCompanyData();
  		for( var i= 0; i<roles.length;i++){
  			let instance= roles[i];
  			if (company.id==instance.company) {
  				role= instance;
  				break;
  			}
  		}
  		return role;
  	}

	anyChecked() {
	 		let checked= false;
	 		let checkedItems = getCheckedObjects(this.table_data);
	 		if (checkedItems.length >= 1 && ( JSON.stringify(this.table_data).indexOf('checked') > -1 )){
	 			checked=true;
	 		}else{
	 			checked=false;
	 		}

			return checked;
	}
}
