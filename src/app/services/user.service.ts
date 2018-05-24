import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor() { }

  getUserData(){
  	let userData= JSON.parse(localStorage.getItem('currentUser'));
  	return userData;
  }

  getToken(){
  	let userData= JSON.parse(localStorage.getItem('currentUser'));
  	return userData.key;
  }

  getAcounTypes(){
    let acc_types= JSON.parse(localStorage.getItem('role'));
    return acc_types.accounts;
  }
  getCompanyData(){
  	let companyData= JSON.parse(localStorage.getItem('currentCompany'));
  	return companyData;
  }

  getRole(){
    let role= undefined;
  	let userData =JSON.parse(localStorage.getItem('currentUser'));
    const company = this.getCompanyData();
    if(userData&&company){
      const broker= userData.user
      let roles= broker.userprofile.roles;

      for( var i= 0; i<roles.length;i++){
        let instance= roles[i];
        if (company.id==instance.company) {
          role= instance;
          break;
        }
      }

    }
    return role ? role.name : undefined;
  }
}
