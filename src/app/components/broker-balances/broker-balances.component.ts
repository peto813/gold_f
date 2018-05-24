import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { RestService } from '../../services/rest-service';

@Component({
  selector: 'app-broker-balances',
  templateUrl: './broker-balances.component.html',
  styleUrls: ['./broker-balances.component.css']
})
export class BrokerBalancesComponent implements OnInit {
  
  @Input() broker;
  @Input() role;
  accounts:Array<any>;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  	console.log(this.role)
  	console.log(this.broker)
  	this.accounts= this.role.accounts;
  	// console.log(this.accounts)
  	// console.log(this.broker)
      // this.model =  new Transaction(
      //   undefined,
      //   undefined,
      //   'gr',
      //   'bs',
      //   'compra',
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      // )
  }

  onSubmit() {

  	// this.submitted = true;
   //  this.model.tipo='compra';
   //  this.restService.postTransaction(this.model).subscribe(response=>{
   //    // and close modal and UPDATE model
   //    this.alertService.success("Compra registrada", false);
   //    this.activeModal.close(response);//this.model
   //  },
   //  err=>{
   //    this.alertService.error("¡Error en registro de transaccion!", false);
   //    this.submitted = false;
   //  })

  }



}
