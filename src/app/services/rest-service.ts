import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router} from '@angular/router';//, ActivatedRoute, ParamMap 
import { AlertService } from './alert.service';
import { Transaction }    from '.././components/model-classes/transaction-model';

import 'rxjs/add/operator/map';


//SET THE BASE URL DEPENDING ON PRODUCTION OR DEVELOPMENT STAGE
const baseUrl = 'http://localhost:8000';

@Injectable()
export class RestService {

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

   // store the URL so we can redirect after logging in
   redirectUrl: string;


     public getErrorMessage(err:any):any{
       const errorObj = err.error;
       if (errorObj.non_field_errors) {
         return errorObj.non_field_errors[0];
       }
      // for (let error of errorObj) {
      //     console.log(error); // 1, "string", false
      // }
      //this function joins the base url and a route
      //in order to abstract base url for prod/dev scenarios
      return '';
    }

  	public getUrl(urlSuffix:string):string{
  		//this function joins the base url and a route
  		//in order to abstract base url for prod/dev scenarios
  		return baseUrl+urlSuffix;
  	}

    public getRole(company_id:string):Observable<any>{
        //let transactionId= transaction.id;
        return this.http.get<any>(this.getUrl(`/api/role/${company_id}/`))
            .map(data => {
                return data;
            }).take(1);
    }

  	public queryDates(companyId:string, params:any){
  		let url:string=this.getUrl(`/api/querytransactiondates/${companyId}/`);
      return this.http.post<any>(url, params).take(1);
  	}

    public addFunds(companyId, params){
      //let pk=params.currency;
        return this.http.post<any>(this.getUrl(`/api/transactions/${companyId}/`), params)
        //return this.http.patch<any>(this.getUrl(`/api/wallet/${pk}/`), params)
            .map(data => {
                return data;
            }).take(1);
    }

    public affiliateBroker(params, pk){
      //pk is the company id
        return this.http.post<any>(this.getUrl(`/api/affiliatebroker/${pk}/`), params)
            .map(data => {
                return data;
            }).take(1); 
    }

  	public approveFunding(transaction:any){
  		//recovery email API service
        let transactionId= transaction.id;
        return this.http.get<any>(this.getUrl(`/api/approvefunds/${transactionId}/`))
            .map(data => {
                return data;
            }).take(1);
  	}

    public rejectFunding(transaction:any){
      //recovery email API service
        let transactionId= transaction.id;
        return this.http.get<any>(this.getUrl(`/api/rejectfunds/${transactionId}/`))
            .map(data => {
                return data;
            }).take(1);
    }

    public getPwdRecoverEmail(params:object){
      //recovery email API service
        return this.http.post<any>(this.getUrl(`/rest-auth/password/reset/`), params)
            .map(data => {
                return data;
            }).take(1);
    }


    public findUser(params){
      return this.http.post<any>(this.getUrl(`/api/searchuser/`), params)
        .map(data => {
          return data;
      }).take(1);
    }

     public getBrokers(companyId:number){
       //get transactions for current user from the API 
        return this.http.get<Array<Transaction>>(this.getUrl( `/api/broker/?company=${companyId}`)).take(1);
    }


    public delBroker(broker):Observable<any>{
      let companyData= JSON.parse(localStorage.getItem('currentCompany')).id;
      let brokerId= broker.userprofile.id;
      // console.log(broker)
      // console.log(brokerId)
      return this.http.delete(this.getUrl( `/api/broker/?company=${companyData}&userprofile=${brokerId}` )).take(1);
    }

  	public addBroker(params:object){
  		//adds broker to company
      let companyData= JSON.parse(localStorage.getItem('currentCompany'));
        return this.http.post<any>(this.getUrl(`/api/broker/?company=`+String(companyData.id)), params)
            .map(data => {
                return data;
            }).take(1);
  	}

    // postSale(params:object){
    //   //recovery email API service
    //     return this.http.post<any>(this.getUrl(`/rest-auth/password/reset/`), params)
    //         .map(data => {
    //             return data;
    //         }).take(1);
    // }

   	public getTransactions(companyId:string){
   		//get transactions for current user from the API 
        return this.http.get<Array<Transaction>>(this.getUrl(`/api/transactions/${companyId}/`)).take(1);
    }

  	public postTransaction(companyId:string,params:object){
  		//post gold purchase  API service
        return this.http.post<any>(this.getUrl(`/api/transactions/${companyId}/`),params ).take(1)
            .map(data => {
                return data;
            });
  	}

  	public meltAnalize(companyId:string,params:object,transacionId:number){
  		//post gold purchase  API service
        return this.http.patch<any>(this.getUrl(`/api/transactions/${companyId}/${transacionId}/`),params ).take(1)
            .map(data => {
                return data;
            });
  	}

  	public isLoggedIn() {
  		let user = JSON.parse(localStorage.getItem('currentUser'));
  		
  		if(user){
  			return user.key ? true : false;
  		}
  		return false;
  	}

  	public getUserData():object {
  		let user = JSON.parse(localStorage.getItem('currentUser'));
  		return this.isLoggedIn() ? user : undefined;
  	}


    public logout() {
        // remove user from local storage to log user out
        this.http.post<any>(this.getUrl(`/rest-auth/logout/`), {})
        .subscribe(
          response => {
          	this.alertService.success(response.detail, false);// true for persiste after one navigation
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentCompany');
            localStorage.removeItem('account_types');
            this.router.navigate(['/']);
          },
          err => {
          	console.log(err);
          	// try{
          	// 	this.alertService.error(err.error.non_field_errors[0]);
          	// }catch(error){
          	// 	console.log(err);
          	// 	console.log(error);
          	// }
            
          }
        );
    }

    public login(url,params) {
        return this.http.post<any>(url, params)
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.key) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('account_types', JSON.stringify(user.account_types));
                }
                return user;
            });
    }
}
