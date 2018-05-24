import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecoverPass }    from '../model-classes/recover-pass';
import { RestService } from '../../services/rest-service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-recover-pass-form',
  templateUrl: './recover-pass-form.component.html',
  styleUrls: ['./recover-pass-form.component.css']
})
export class RecoverPassFormComponent implements OnInit {

  constructor(private rest_service:RestService, private alertService:AlertService ) { }
  submitted = false;

  model = new RecoverPass('');

  onSubmit() {
  	this.submitted = true;
    this.rest_service.getPwdRecoverEmail(this.model).subscribe(response=>{
      this.alertService.success(response.detail, false);
      this.submitted=false;
    },
    err=>{
            try{
              this.alertService.error(err.error.non_field_errors[0]);
            }catch(error){
              console.log(error);
              console.log(err);
            }
            //console.log(err);
            this.submitted=false;
    })
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
    ngOnInit() {}

}


// user => {
//             this.router.navigate(['dashboard']);
//           },
//           err => {
//             try{
//               this.alertService.error(err.error.non_field_errors[0]);
//             }catch(error){
//               console.log(error);
//               console.log(err);
//             }
//             //console.log(err);
//             this.submitted=false;
//           }