import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//import { BuyModalComponent }  from '../modals/buy-modal/buy-modal.component';
import {AnalyzeMultModalComponent} from '../analyze-mult-modal/analyze-mult-modal.component';
import {FundirMultModalComponent} from '../fundir-mult-modal/fundir-mult-modal.component';
import {BuyformComponent} from '../buyform/buyform.component';
import {SellFormComponent} from '../sell-form/sell-form.component';
import {TransactionDetailsComponent} from '../transaction-details/transaction-details.component';
import { SaleDetailsComponent } from '../sale-details/sale-details.component';
import { SearchDatesComponent } from '../search-dates/search-dates.component';
import { FormsModule } from '@angular/forms';
import { MassSellModalComponent } from '../mass-sell-modal/mass-sell-modal.component';
import { RestService } from '../../services/rest-service';
import { AlertService } from '../../services/alert.service';
import {UserService} from '../../services/user.service';
import { AnalizeMeltComponent } from '../../components/analize-melt/analize-melt.component';
import { Transaction }    from '../model-classes/transaction-model';
import {SortArrayService} from '../../services/sort-array.service';
import { AbonoDetailModalComponent } from '../../components/abono-detail-modal/abono-detail-modal.component';
//function used to get an array of checked objects
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
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {

	@Input() table_data:Array<Transaction>;
	@Output() updateBalance = new EventEmitter<any>();

  constructor(private userService: UserService, private alertService:AlertService,private modalService: NgbModal, private restService:RestService, private util:SortArrayService) { }

  searchCriteria='dia';
  transactionRange = {from:new Date(), to:new Date()};
  closeResult:string;



  	registerPurchase() {
    	const modalRef = this.modalService.open(BuyformComponent);
    	modalRef.componentInstance.modalData={};
    	//modalRef.componentInstance.modalData.update=false
    	modalRef.result.then((response:any) => {
    		if(response && response.data){
    			this.table_data= response.data;
    			this.table_data= this.util.sortByDesc(this.table_data,'id');
    			//console.log('askadskajsk')
    			this.updateBalance.emit(response.accounts);
    			//this.accounts = response.transactions.accounts;
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
        });

  	}

	fundir(transaction){
		let modalRef = this.modalService.open(AnalizeMeltComponent);
		let transactionModel:Transaction = transaction;
		modalRef.componentInstance.modalData={};
		modalRef.componentInstance.modalData=transactionModel;

    	modalRef.result.then((response) => {
    		if(response && response.data){
    			//find and update object
    			let newData =this.util.modifyInstance(
    				this.table_data,
    				'id',
    				response.data.id,
    				response.data
    			)
    			this.table_data=this.util.sortByDesc(newData,'id');
    			this.updateBalance.emit(response.accounts);
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
	    });


		
	}




	private getSpan(transaction:any):number{
		let span = 1;
		if (transaction.tipo ==='abono') {
			span=4;
		}
		return span;
	}

  	sellMass() {

  		let transacciones = getCheckedObjects(this.table_data);
  		//pass transactions to modal 
  		if(transacciones.length>=1){
	  		const modalRef = this.modalService.open(MassSellModalComponent);
	  		modalRef.componentInstance.modalData={};
	  		modalRef.componentInstance.modalData.transacciones=transacciones;
  		}


	 }

  sell(transaction:Transaction) {
    const modalRef = this.modalService.open(SellFormComponent);
    modalRef.componentInstance.modalData={};
    modalRef.componentInstance.modalData=transaction;
    modalRef.result.then((response?:any) => {
    		if(response && response.data){
    			this.table_data= response.data;
    			this.updateBalance.emit(response.accounts);
    			//this.table_data= this.util.sortByDesc(this.table_data,'id');
    		}
	    }).catch(function (err) { // <- See this <<<<<<<<
    });
  }

	  queryDate(params){
	  	let company = this.userService.getCompanyData();
	  	this.restService.queryDates(String(company.id),params).subscribe(data=>{
	  		this.alertService.success('Resultados disponibles');
	  		this.table_data = data.transactions;
		    this.transactionRange.from = data.range.mindate;
		    this.transactionRange.to = data.range.maxdate;
	  	})
	  }

	  isAbono(transaction){
	  	if (transaction.tipo == 'abono' && transaction.user.role=='broker') {
	  		return true
	  	}
	  	return false;
	  }

	  transactionDetails(transaction){
	  	let view;
	  	
	  	if (transaction.tipo.toLowerCase()==='compra'){
	  		//const modalRef = this.modalService.open(TransactionDetailsComponent);
	  		//modalRef.componentInstance.modalData=transaction;
	  		view= TransactionDetailsComponent;
	  	}else if(transaction.tipo.toLowerCase()==='venta') {
	  		//const modalRef = this.modalService.open(SaleDetailsComponent);
	  		//modalRef.componentInstance.modalData=transaction;
	  		view= SaleDetailsComponent;
	  	}else if(transaction.tipo.toLowerCase()==='abono'){
	  		view= AbonoDetailModalComponent;
	  	}

	  	const modalRef = this.modalService.open(view);
	  	modalRef.componentInstance.modalData=transaction;
	  }


  	fundirMass(){
  		//get checked items
  		let transacciones = getCheckedObjects(this.table_data, 'fundido', false);
  		//pass them to modal 
  		if(transacciones.length>=1){
	  		const modalRef = this.modalService.open(FundirMultModalComponent);
	  		modalRef.componentInstance.modalData={};
	  		modalRef.componentInstance.modalData.transacciones=transacciones;
  		}
  		
  	}


  	analisisMass(){
  		//get checked items
  		let modalData = getCheckedObjects(this.table_data, 'legal', false);
  		//pass them to modal 
  		if(modalData.length>=1){
	  		const modalRef = this.modalService.open(AnalyzeMultModalComponent);
	  		modalRef.componentInstance.modalData={};
	  		modalRef.componentInstance.modalData.transacciones=modalData;
  		}
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


	getSign(transaction){
		if(transaction && transaction.tipo && transaction.tipo.toLowerCase()==='compra'){
			return '+';
		}else if(transaction && transaction.tipo && transaction.tipo.toLowerCase()==='venta'){
			return '-';
		}else{
			return 'N/A';
		}
		
	}

	searchDates(){
		if(this.searchCriteria==='fechas'){
			const modalRef = this.modalService.open(SearchDatesComponent);
			modalRef.componentInstance.restService = this.restService;
			modalRef.componentInstance.userService = this.userService;
		    modalRef.result.then((data:any) => {
		    		if(data){
		    			this.alertService.success('Resultados disponibles');
		    			this.table_data=data.transactions;
		    			this.transactionRange.from = data.range.mindate;
		    			this.transactionRange.to = data.range.maxdate;
		    		}
			    }).catch(function (err) { // <- See this <<<<<<<<
			    	console.log(err);
		    });
			//modalRef.componentInstance.restService = this.restService;
		}else{
			this.queryDate({tipo:this.searchCriteria})
		}

		// else if(this.searchCriteria==='mes'){
		// 	this.queryDate({t})
		// 	alert('find '+ this.searchCriteria+' code needed');
		// }else if(this.searchCriteria==='semana'){
		// 	alert('find '+ this.searchCriteria+' code needed');
		// }else if(this.searchCriteria==='dia'){
		// 	alert('find '+ this.searchCriteria+' code needed');
		// }
  		
	}



	approveFunds(transaction:Transaction){
		this.restService.approveFunding(transaction).subscribe(response=>{
			//console.log(data)
    			//find and update object
    			let newData =this.util.modifyInstance(
    				this.table_data,
    				'id',
    				response.data.id,
    				response.data
    			)
    			this.table_data=this.util.sortByDesc(newData,'id');
    			this.alertService.success('Fondos aprobados por el usuario las partes han sido notificadas!');
    			this.updateBalance.emit(response.accounts);
		},
		err=>{
			let errMsg=this.restService.getErrorMessage(err);
			console.log(errMsg);
		}
		);

	}

	rejectFunds(transaction:Transaction){
		this.restService.rejectFunding(transaction).subscribe(response=>{
    			//find and update object
    			let newData =this.util.modifyInstance(
    				this.table_data,
    				'id',
    				response.data.id,
    				response.data
    			)
    			this.table_data=this.util.sortByDesc(newData,'id');
    			this.alertService.success('Fondos rechazados por el usuario las partes han sido notificadas!');
    			//this.updateBalance.emit(response.accounts);
		},
		err=>{
			let errMsg=this.restService.getErrorMessage(err);
			console.log(errMsg);
		}
		);
	}

	ngOnInit() {
		console.log(this.table_data)
	 	//this.table_data= this.util.sortByDesc(this.table_data,'id')
	}

}
