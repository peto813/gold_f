import { Injectable } from '@angular/core';
import { RestService } from '../../services/rest-service';
import { UserService } from '../../services/user.service';

import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BrokerResolverService {

  constructor(private rs: RestService, private router: Router, private userService:UserService) { }


  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    	const company=this.userService.getCompanyData()

    	return this.rs.getBrokers(company.id);
	}

}
