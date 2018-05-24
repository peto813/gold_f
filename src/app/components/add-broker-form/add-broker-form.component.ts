import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestService } from '../../services/rest-service';
import { Broker }    from '../model-classes/broker';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-add-broker-form',
  templateUrl: './add-broker-form.component.html',
  styleUrls: ['./add-broker-form.component.css']
})
export class AddBrokerFormComponent implements OnInit {

		submitted=false;
		pattern=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		model:Broker;

  		constructor(public activeModal: NgbActiveModal, private restService:RestService, private alertService: AlertService) { }

  		 onSubmit(){

  		 	//post a new broker
			  	this.submitted = true;
			    //this.model.tipo='compra';
			    this.restService.addBroker(this.model).subscribe(response=>{
			      // and close modal and UPDATE model
			      this.alertService.success("Broker registrado, ha sido notificado via correo electronico.", false);
			      this.activeModal.close(response);//this.model
			    },
			    err=>{
			      this.alertService.error("¡Error en registro de broker!", false);
			      this.submitted = false;
			    })
  		 }

  		ngOnInit() {
		this.model = new Broker(
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined
			);
  		}

}
