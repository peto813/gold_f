import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellModel }    from '../model-classes/sell-model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Transaction }    from '../model-classes/transaction-model';
import { WeightConvertPipeInverse, WeightConvertPipe } from '../../components/pipes/weight-convert/weight-convert.pipe';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent implements OnInit {
  @Input() modalData:Transaction;

  constructor(
    private weightConvertInv:WeightConvertPipeInverse,
    private weightConvert:WeightConvertPipe,
    private alertService:AlertService,
    private activeModal: NgbActiveModal,
    private restService:RestService,
    private userService: UserService
    ) { }


    submitted: boolean = false;
    model:Transaction;
    purchaseData:Transaction;
    account_types:Array<any>;
  //model = new Transaction( undefined, undefined,'Bs');


    profitByWeight(){
      //let ganancia;
      let pesoNeto = this.weightConvert.transform((this.model.pesoPost||this.model.cantidad), 'gr', this.model.weightUnit);
      let pesoBruto = this.modalData.cantidad;

      let meltCost = this.model.meltCost||0;
      let costoBruto = this.weightConvertInv.transform(this.modalData.precio,this.modalData.weightUnit, this.model.weightUnit);
      let evalCost = this.model.evalCost||0;
      let precioVenta = this.weightConvertInv.transform(this.model.precio,this.modalData.weightUnit, this.model.weightUnit)||0;
      //let costoNeto= this.peso*


      //ganancia   = ((precioVenta)*(pesoNeto))-( evalCost+meltCost+costoBruto );
      let venta = pesoNeto*precioVenta;//good
      let compra=  evalCost+meltCost+costoBruto 

      return (venta-compra);
    }


    get realPrice() { //put everything in same units


        let evalCost =this.modalData.evalCost||0;        
        let precio = this.modalData.precio||0;
        let cantidad = this.weightConvert.transform( this.model.cantidad, this.modalData.weightUnit, this.model.weightUnit )||0;
        let denominator = this.weightConvert.transform( this.model.pesoPost,this.modalData.weightUnit, this.model.weightUnit )||cantidad;
        let meltCost = this.modalData.meltCost||0;
        let realCost = (meltCost+evalCost+(cantidad*precio))/denominator;
        // if (this.modalData.currency!= this.model.currency){
        //   realCost=realCost*this.model.taza||realCost;
        // }
        return realCost;

    }


  onSubmit() {
    this.submitted = true;
    const company= this.userService.getCompanyData();
    this.restService.postTransaction(company.id,this.model).subscribe(response=>{
      // and close modal and UPDATE model
      this.alertService.success("Venta registrada", false);
      this.activeModal.close(response);//this.model
    },
    err=>{
      this.alertService.error("¡Error en registro de venta!", false);
      this.submitted = false;
    })
  }



  ngOnInit() {


    this.account_types= this.userService.getAcounTypes();
      this.model =  new Transaction(
        this.modalData.cantidad,
        undefined,
        this.modalData.weightUnit,
        this.account_types[0],
        'venta',
        undefined,
        undefined,
        this.modalData.pesoPost,
        this.modalData.fundido,
        this.modalData.legal,
        this.modalData.evalCost,
        this.modalData.meltCost,
        this.modalData.id
      )

      // this.model =  new Transaction(
      //   undefined,
      //   undefined,
      //   'gr',
      //   this.account_types[0],
      //   'compra',
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined,
      //   undefined
      // )




    this.purchaseData =  new Transaction(
        this.modalData.cantidad,
        this.modalData.precio,
        this.modalData.weightUnit,
        this.modalData.account,
        this.modalData.tipo,
        this.modalData.id,
        this.modalData.created,
        this.modalData.pesoPost,
        this.modalData.fundido,
        this.modalData.legal,
        this.modalData.evalCost,
        this.modalData.meltCost
      )

  }

}
