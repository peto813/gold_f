import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';

@Injectable()
export class TransactionsResolverService implements Resolve<any> {

  constructor(private rs: RestService, private router: Router, private userService: UserService ){}

  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    	const company= this.userService.getCompanyData();
    	return this.rs.getTransactions(String(company.id));
    	//return this.rs.queryDates(String(company.id), {tipo:'mes'});
	}

}


