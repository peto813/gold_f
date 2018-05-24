import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { AnalyzeMultiModel }   from './analyze-multi-model';
import {WeightConvertPipe} from '../pipes/weight-convert/weight-convert.pipe'
function sumTotal(arr, param, other?){
	let result =0;
	for (let i= 0; i < arr.length; i++){
			result+=arr[i][param]||arr[i][other];
	}
	return result;
}

@Component({
  selector: 'app-analyze-mult-modal',
  templateUrl: './analyze-mult-modal.component.html',
  styleUrls: ['./analyze-mult-modal.component.css']
})
export class AnalyzeMultModalComponent implements OnInit {
	@Input() modalData;
	model= new AnalyzeMultiModel(undefined, undefined, undefined,undefined,'bs', 'gr');
  	constructor(public activeModal: NgbActiveModal, public weightPipe: WeightConvertPipe) { }


  	precioVenta(transaction){
  		let precio=0;
  		let fraction = (this.weightPipe.transform((transaction.pesoPost||transaction.cantidad), 'gr',this.model.weightUnit)) / sumTotal(this.model.transacciones, 'pesoPost', 'cantidad');
  		precio =this.model.precio*fraction||0;
  		return precio;
  	}


  	ngOnInit() {
  		this.model.transacciones=this.modalData.transacciones;
  		this.model.cantidad= sumTotal(this.model.transacciones, 'cantidad', 'cantidad')
  		this.model.pesoPost= sumTotal(this.model.transacciones, 'pesoPost', 'cantidad')
  	}

}
