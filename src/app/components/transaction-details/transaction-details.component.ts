import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { WeightConvertPipeInverse, WeightConvertPipe } from '../../components/pipes/weight-convert/weight-convert.pipe';
import { DecimalPipe } from '@angular/common'; 
import { Transaction }    from '../model-classes/transaction-model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
	@Input() modalData;

  constructor(private invWeightFilter:WeightConvertPipeInverse ,public activeModal: NgbActiveModal, public weightConverter:WeightConvertPipe, private decimalFilter:DecimalPipe) { }
  	model;
    realPrice() { 
	    	let evalCost =parseFloat(this.model.evalCost)||0;	    	
	    	let precio = parseFloat(this.model.precio)||0;
	    	let cantidad = parseFloat(this.model.cantidad)||0;
	    	let denominator = parseFloat(this.model.pesoPost)||parseFloat(this.model.cantidad);
	    	let meltCost = parseFloat(this.model.meltCost)||0;
	    	let realCost = (meltCost+evalCost+(cantidad*precio))/denominator;
	    	return realCost;
    }


	get quantAlt(){
	    //are the purchase unit and selected unit different?
	    return this.weightConverter.transform(this.model.cantidad,'gr' ,this.model.weightUnit);
	}


	getPrice(price){
		//are the purchase unit and selected unit different?
		return this.decimalFilter.transform(this.invWeightFilter.transform(price,this.modalData.weightUnit ,this.model.weightUnit), '1.2-2');
	}


	getNetPrice(){
		//are the purchase unit and selected unit different?
		return this.decimalFilter.transform(this.invWeightFilter.transform(this.model.precio,this.modalData.weightUnit ,this.model.weightUnit), '1.2-2');
	}

	  ngOnInit() {
	  	this.model= Object.create(this.modalData);
	  	console.log(this.model)
	  	// this.model = new Transaction(
		  // 		this.modalData.created,
		  // 		this.modalData.cantidad,
		  // 		this.modalData.precio,
		  // 		this.modalData.pesoPost,
		  // 		this.modalData.fundido,
		  // 		this.modalData.legal,
		  // 		this.modalData.weightUnit,
		  // 		this.modalData.currency,
		  // 		this.modalData.evalCost,
		  // 		this.modalData.meltCost,
		  // 		this.modalData.tipo,
	   //      this.modalData.id
	  	// 	)
	  }

}
