import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RestService} from '../../services/rest-service';
import {UserService} from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

@Component({
  selector: 'app-add-broker-balance-modal',
  templateUrl: './add-broker-balance-modal.component.html',
  styleUrls: ['./add-broker-balance-modal.component.css']
})
export class AddBrokerBalanceModalComponent implements OnInit {
  @Input() broker;
  @Input() role;
  accounts:Array<any>;
  model:any={};
  submitted:boolean=false;
  constructor(
  	private activeModal: NgbActiveModal,
  	private restService: RestService,
  	private alertService:AlertService,
  	private userService:UserService
  	) { }

  ngOnInit() {
  	this.accounts= this.role.accounts;
  	this.model.account='';
  }

  	getCurrName(){
      console.log('peo')
  		let name='';
  		for (var i = 0; i < this.accounts.length; ++i) {
  			let instance = this.accounts[i];
  			if (instance.id==this.model.account) {
  				name=instance.account_type.currency_nick;
  			}
  		}
		return name;
  	}

  onSubmit(){
  		let brokername= toTitleCase(this.broker.first_name)+' '+ toTitleCase(this.broker.last_name);
  		let cantidad= String(this.model.precio);
  		let moneda= this.getCurrName();
  		const companyData= this.userService.getCompanyData();
		if (confirm(`¿Esta seguro(a) de que desea abonar ${moneda} ${cantidad} a ${brokername}?`)) {
		  	this.submitted=true;
		  	let new_data= {};
		  	new_data['precio']= this.model.precio;
		  	new_data['account']= this.model.account;
		  	new_data['tipo']='abono';
		  	new_data['user']=this.broker.pk;
		  	this.restService.addFunds(companyData.id, new_data).subscribe(data=>{
		  			this.alertService.success("El broker ha sido notificado via correo electronico, una vez acepte los fondos quedaran disponibles.", false);
		  			this.activeModal.close(data);
		  	});
		}

  }

}
