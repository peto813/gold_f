import { Component, OnInit, HostBinding } from '@angular/core';
import { LoginModel }    from '../model-classes/login-model';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RestService } from '../../services/rest-service';
import { AlertService } from '../../services/alert.service';

import { sharedService } from '../../services/shared-service';

//animation
//import {slideInDownAnimation} from '../../animations'

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],
  //animations:[slideInDownAnimation]
})
export class LoginformComponent implements OnInit {
  
  //@HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  constructor(
    private router:Router,
    private restService:RestService, 
    private route:ActivatedRoute,
    private alertService: AlertService,
    private sharedScope:sharedService
    ) {}

  submitted = false;
  url:string ='http://localhost:8000/rest-auth/login/';
  model = new LoginModel('','', null);
  returnUrl: string;


  onSubmit() {
  	this.submitted = true;
    //this.sharedScope.set(true);
    this.sharedScope.setLoaderShow(true);
      this.restService.login(this.url, this.model)
        .subscribe(
          data => {
            
            if(data.user.userprofile.companies.length>1){
              this.router.navigate(['choose_company']);
            }else{
                localStorage.setItem('role', JSON.stringify(data.user.userprofile.roles[0]));
                localStorage.setItem('currentCompany', JSON.stringify(data.user.userprofile.companies[0]));
                this.router.navigate(['dashboard']);
            }
            this.submitted = false;
            this.sharedScope.setLoaderShow(false);
          },
          err => {
            try{
              this.alertService.error(err.error.non_field_errors[0]);
            }catch(error){

            }
            //console.log(err);
            this.submitted=false;
            //this.alertService.hideLoader();
          }
        );

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    //this.sharedScope.set(false);

        // reset login status
        //this.restService.logout();
        // get return url from route parameters or default to '/'
        //console.log(this.route)
        this.returnUrl = this.route.snapshot.data['returnUrl'] || '/';
        //console.log(this.returnUrl);
  }

}
