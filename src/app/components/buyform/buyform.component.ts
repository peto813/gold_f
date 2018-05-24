import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction }    from '../model-classes/transaction-model';
import { NgModel } from '@angular/forms';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-buyform',
  templateUrl: './buyform.component.html',
  styleUrls: ['./buyform.component.css']
})
export class BuyformComponent implements OnInit {
	@Input() modalData;
  account_types:Array<any>;
  constructor(
    private alertService:AlertService,
    public activeModal: NgbActiveModal,
    private restService:RestService,
    private userService: UserService
  ) { }

    submitted = false;
    model:Transaction;

  getSubmiData(modelData:Transaction):Transaction{
  let transactionData =  JSON.parse(JSON.stringify(modelData));
  transactionData.account= this.model.account.id
  return transactionData;
  }

  onSubmit() {
  	this.submitted = true;
    this.model.tipo='compra';
    const company= this.userService.getCompanyData();
    const data = this.getSubmiData(this.model);
    this.restService.postTransaction(company.id, data).subscribe(response=>{
      // and close modal and UPDATE model
      this.alertService.success("Compra registrada", false);
      this.activeModal.close(response);//this.model
    },
    err=>{
      let err_msg = this.restService.getErrorMessage(err);
      this.alertService.error(err_msg, false);
      this.submitted = false;
    })

  }
  // TODO: Remove this when we're done
  	//get diagnostic() { return JSON.stringify(this.model); }

    realPrice(f:NgModel) { 
    	if (f.dirty){
	    	var evalCost =this.model.evalCost||0;	    	
	    	var precio = this.model.precio||0;
	    	var cantidad = this.model.cantidad||0;
	    	var denominator = this.model.pesoPost||this.model.cantidad;
	    	var meltCost = this.model.meltCost||0;
	    	var realCost = (meltCost+evalCost+(cantidad*precio))/denominator;
	    	return realCost;
    	}else{
    		return 0;
    	}
    }

    // get modalName(){
    // 	if(this.modalData.update){
    // 		if(this.modalData.update===true){
	   //  		switch(this.modalData.update_field){
	   //  			case 'legal':
	   //  				return 'Registrar costo de Fundicion/Analisis'
	   //  			case 'fundir':
	   //  				return 'Registrar costo de Fundicion/Analisis'
	   //  			default:
	   //  				return 'Registrar compra'
	   //  		}
    // 		}
    		

    // 	}
    // 	return 'Registrar compra';
    // }


	verifyFundidoData(){
		if (this.model.fundido===true){
			this.model.pesoPost=undefined;
			this.model.meltCost=undefined;
		}
	}


	verifyLegalData(){
		if (this.model.legal===true){
			this.model.evalCost=undefined;
		}
	}

  ngOnInit() {

      this.account_types= this.userService.getAcounTypes();
      console.log(this.account_types)
    //this.model= Object.create(this.modalData);
      this.model =  new Transaction(
        undefined,
        undefined,
        'gr',
        this.account_types[0],
        'compra',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
  }

}
