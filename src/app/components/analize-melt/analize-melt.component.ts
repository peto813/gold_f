import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction }    from '../model-classes/transaction-model';
import { NgModel } from '@angular/forms';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { DecimalPipe } from '@angular/common'; 
import { WeightConvertPipeInverse, WeightConvertPipe } from '../../components/pipes/weight-convert/weight-convert.pipe';

@Component({
  selector: 'app-analize-melt',
  templateUrl: './analize-melt.component.html',
  styleUrls: ['./analize-melt.component.css']
})
export class AnalizeMeltComponent implements OnInit {

	@Input() modalData;

  constructor(private weightConverter: WeightConvertPipe,
    private decimalFilter:DecimalPipe,
    private invWeightFilter:WeightConvertPipeInverse,private alertService:AlertService,
    private activeModal: NgbActiveModal,
    private restService:RestService,
    private userService :UserService
    ) { }

  submitted = false;
  model:Transaction;


  onSubmit() {
  	this.submitted = true;
    //get transaction type (purchase or modification)
    const company= this.userService.getCompanyData();
    this.restService.meltAnalize(company.id,this.model, this.modalData.id).subscribe(response=>{
      // and close modal and UPDATE model
      this.alertService.success("Ha fundido/analizado con exito", false);
      this.activeModal.close(response);//this.model
    },
    err=>{
      this.alertService.error("¡Error en transaccion!", false);
      this.submitted = false;
    })

  }


    // realPrice(f:NgModel) { 
    // 	if (f.dirty){
	   //  	let evalCost =this.model.evalCost||0;	    	
	   //  	let precio = this.model.precio||0;
	   //  	let cantidad = this.model.cantidad||0;
	   //  	let denominator = this.model.pesoPost||this.model.cantidad;
	   //  	let meltCost = this.model.meltCost||0;
	   //  	let realCost = (meltCost+evalCost+(cantidad*precio))/denominator;
	   //  	return realCost;
    // 	}else{
    // 		return 0;
    // 	}
    // }


    realUnitPrice(f:NgModel) { //put everything in same units

      //if (f.dirty){
            let cantidad = this.quantAlt()||0;
            let denominator = this.model.pesoPost||cantidad;
            let adaptedUniPrice = this.invWeightFilter.transform(this.model.precio,this.modalData.weightUnit ,this.model.weightUnit);// currency/weight
            let realUnitCost= ((adaptedUniPrice*cantidad)+this.model.meltCost+this.model.evalCost)/denominator;
            return realUnitCost;

        // let evalCost =this.modalData.evalCost||0;        
        // let precio = this.modalData.precio||0;
        // let cantidad = this.invWeightFilter.transform( this.model.cantidad, 'gr', this.model.weightUnit )||0;
        // let denominator = this.invWeightFilter.transform( this.model.pesoPost,this.modalData.weightUnit, this.model.weightUnit )||cantidad;
        // let meltCost = this.modalData.meltCost||0;
        // let realCost = (meltCost+evalCost+(cantidad*precio))/denominator;
        // // if (this.modalData.currency!= this.model.currency){
        // //   realCost=realCost*this.model.taza||realCost;
        // // }
        // return realCost;
      //} 
        //return 0;
      }

      resetValues(){
        this.model.pesoPost=undefined;
        this.model.meltCost=undefined;
      }

  	verifyFundidoData(element){
  		if (this.model.fundido===true){
  			element.form.controls['pesoPost'].reset();
  			element.form.controls['meltCost'].reset();
        this.resetValues()	
  		}
  	}


	verifyLegalData(element){
		if (this.model.legal===true){
			this.model.evalCost=undefined;
			element.form.controls['evalCost'].reset();
		}
	}

  quantAlt(){
    //are the purchase unit and selected unit different?
    return this.weightConverter.transform(this.model.cantidad,'gr' ,this.model.weightUnit);
  }


	getUnitPrice(){
		//are the purchase unit and selected unit different?
		return this.decimalFilter.transform(this.invWeightFilter.transform(this.model.precio,this.modalData.weightUnit ,this.model.weightUnit), '1.2-2');
	}



    getTotalPrice(){
      let total:number;

      let unitPrice= this.invWeightFilter.transform(this.model.precio,this.modalData.weightUnit ,this.model.weightUnit);
      let quantity= this.quantAlt();
      //console.log(unitPrice, quantity, this.model.meltCost,this.model.evalCost)
      total = this.model.meltCost+this.model.evalCost+(unitPrice*quantity);
      return total;
    }


  ngOnInit() {
    //this.model= Object.create(this.modalData);
  	this.model = new Transaction(
        this.modalData.cantidad,
        this.modalData.precio,
        this.modalData.weightUnit,
        this.modalData.currency,
        'compra',
        this.modalData.id,
	  		this.modalData.created,
	  		this.weightConverter.transform(this.modalData.pesoPost, 'gr', this.modalData.weightUnit),
	  		this.modalData.fundido,
	  		this.modalData.legal,
	  		this.modalData.evalCost,
	  		this.modalData.meltCost
  		)
    console.log(this.model)
  }

}
