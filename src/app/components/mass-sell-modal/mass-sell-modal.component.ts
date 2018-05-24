import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


function sumTotal(arr, param, other?){
	let result =0;
	for (var i= 0; i < arr.length; i++){
			result+=arr[i][param]||arr[i][other];
	}
	return result;
}

class MassSellModel {
  constructor(
    public precio:number,
    public transacciones:Array<object>,
    public cantidad:number,
    public pesoPost: number,
    public currency:string,
    public weightUnit: string
  ) {  }
}

@Component({
  selector: 'app-mass-sell-modal',
  templateUrl: './mass-sell-modal.component.html',
  styleUrls: ['./mass-sell-modal.component.css']
})
export class MassSellModalComponent implements OnInit {

	@Input() modalData;
  	constructor(public activeModal: NgbActiveModal) { }
  	model= new MassSellModel(undefined, undefined, undefined,undefined,'', '');

  	precioVenta(transaction){
  		let precio=0;
  		let fraction = (transaction.pesoPost||transaction.cantidad) / sumTotal(this.model.transacciones, 'pesoPost', 'cantidad');
  		precio =this.model.precio*fraction||0;
  		return precio;
  	}

  	ngOnInit() {
  		this.model.transacciones=this.modalData.transacciones;
  		this.model.cantidad= sumTotal(this.model.transacciones, 'cantidad', 'cantidad')
  		this.model.pesoPost= sumTotal(this.model.transacciones, 'pesoPost', 'cantidad')
  	}

}
