import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-abono-detail-modal',
  templateUrl: './abono-detail-modal.component.html',
  styleUrls: ['./abono-detail-modal.component.css']
})
export class AbonoDetailModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }
  @Input() modalData;
  ngOnInit() {
  }

  getStatus(){
  	let status='Esperando evaluacion';
  	if (this.modalData.approved && this.modalData.approved === true ) {
  		status = 'Aprobado';
  	}else if (this.modalData.approved && this.modalData.approved === false ) {
  		status ='Rechazado';
  	}
  	return status;
  }

}
