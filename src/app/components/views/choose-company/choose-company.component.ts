import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';


export class ChooseCompany {
  id: any;
  //name: string;
}

@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.css']
})
export class ChooseCompanyComponent implements OnInit {

  constructor(private router: Router) { }
  model: ChooseCompany = {
    id:''
  };

  userData;
  companies;

  ngOnInit() {
  	//set the companies from the local storate

  	//localStorage.setItem('currentCopany', this.model.company);
  	this.userData =JSON.parse(localStorage.getItem('currentUser'));
  	this.companies=this.userData.user.userprofile.companies;
    console.log(this.userData)

  }

  private getCompany(id:number){
  	for (var i =0; i<this.companies.length;i++){
  		let item = this.companies[i];

  		if (item.id===id) {
  			return item;
  		}
  	}
  	return {};
  }

  private getRole(){
    let roles = this.userData.user.userprofile.roles;
    let company= this.getCompany(this.model.id);

    for (var i =0; i<roles.length;i++){
      let item = roles[i];

      if (item.company==company.id && item.user==this.userData.user.userprofile.id) {
        return item;
      }
    }

    return {};
  }

  onSubmit(){
    //let peo =data.user.userprofile.roles[0];
    let role = this.getRole();

  	localStorage.setItem('currentCompany', JSON.stringify(this.getCompany(this.model.id)));
  	this.router.navigate(['dashboard']);
  }
}
