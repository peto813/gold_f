import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MassFundirModel }    from './mass-fundir-model';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-fundir-mult-modal',
  templateUrl: './fundir-mult-modal.component.html',
  styleUrls: ['./fundir-mult-modal.component.css']
})
export class FundirMultModalComponent implements OnInit {

	@Input() modalData;

  	constructor(public activeModal: NgbActiveModal, private decimalFilter: DecimalPipe) { }

  	model= new MassFundirModel(
	    undefined,
	    undefined,
	    undefined,
	    undefined,
	    'bs',
	    'gr'
  	);

  get diagnostic() { return JSON.stringify(this.model); }

  	sumCantidad(){
  		let total=0;
  		for(let i=0;i<this.model.transacciones.length;i++){
  			if(this.model.transacciones[i]['fundido']===false&&this.model.transacciones[i]['tipo'].toLowerCase()==='compra'){
  				total+=this.getCantidad(this.model.transacciones[i]);
  			}
  		}
  		return total;
  	}




  	costPerTransaction(transaction){
  		let response='-';
  		if(this.model.precio){
  			response=String(this.decimalFilter.transform(this.getCantidad(transaction)*this.model.precio/this.sumCantidad(), '1.2-2'))+' '+this.model.currency;
  		}
  		return response;
  	}


  	headerPriceTotal(){
  		let response ='-';
  		if(this.model.precio){
  			response = String(this.decimalFilter.transform(this.model.precio,'1.2-2')) + ' ' +this.model.currency;
  		}
  		return response;
  	}

  	getCantidad(transaction):number{
  		let fromUnit =transaction.weightUnit;
  		let toUnit =this.model.weightUnit;
  		let conversionUnit=1;
  		//check if unit differences
  		if(fromUnit!=toUnit){
  			
  			if(fromUnit=='gr' && toUnit=='kg' ){
  				conversionUnit =1/1000;
  			}else if(fromUnit=='kg' && toUnit=='gr'){
  				conversionUnit =1000;
  			}else if(fromUnit=='gr' && toUnit=='oz'){
  				conversionUnit =0.035274;
  			}else if(fromUnit=='oz' && toUnit=='gr'){
  				conversionUnit =28.3495;
  			}else if(fromUnit=='kg' && toUnit=='oz'){
  				conversionUnit =35.2739619;
  			}else if(fromUnit=='oz' && toUnit=='kg'){
  				conversionUnit =0.0283495;
  			}

  		}
  		return conversionUnit *transaction.cantidad;
  	}

  	ngOnInit() {
  		this.model.transacciones=this.modalData.transacciones;
  	}

}
