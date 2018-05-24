import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';
import { Broker }    from '../model-classes/broker';
import { AlertService } from '../../services/alert.service';
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
@Component({
  selector: 'app-add-existing-broker',
  templateUrl: './add-existing-broker.component.html',
  styleUrls: ['./add-existing-broker.component.css']
})

export class AddExistingBrokerComponent implements OnInit {
	model={};
	user={};
	submitted=false;
	userFound=false;
  	constructor(
  		private restService: RestService,
  		private activeModal: NgbActiveModal, 
  		public userService: UserService,
  		private alertService: AlertService
  	) { }

	ngOnInit() {
	
	}

	incorporate(user){
		console.log(user)
		let name= toTitleCase(user.first_name)+' ' +toTitleCase(user.last_name);
		if (confirm("¿Esta seguro(a) de que desea incorporar a "+name+" como broker de la empresa?")) {
		  	//this.submitted=true;
		  	let companyId=this.userService.getCompanyData().id;
		  	this.restService.affiliateBroker(user, companyId).subscribe(data=>{

		  		if (data.status=='exists') {
		  			this.alertService.error('Este broker ya esta afiliado a esta empresa!');
		  			this.activeModal.close();
		  			//alert('Este broker ya esta afiliado a esta empresa!');
		  		}else if (data.status==='created') {
		  			this.alertService.success('Broker afiliado');
		  			this.activeModal.close(data.broker);
		  		}
		  		// this.user= data;
		  		// this.userFound=true;
		  		//form.reset();
		  	},err=>{
		  		console.log(err);
		  		this.alertService.error('Ha ocurrido un error!');
		  		//this.userFound=false;
		  		//this.user= {};
		  	});
		}

	}
	


	onSubmit(form){
	  	this.submitted=true;
	  	this.restService.findUser(this.model).subscribe(data=>{
	  		console.log(data)
	  		this.user= data;
	  		this.userFound=true;
	  		form.reset();
	  	},err=>{
	  		this.userFound=false;
	  		this.user= {};
	  	});
	 }



}
