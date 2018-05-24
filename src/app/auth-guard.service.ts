import { Injectable }     from '@angular/core';
//import { CanActivate }    from '@angular/router';
import { RestService }      from './services/rest-service';

import {
   CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}     					  from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: RestService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);
    //return true;
  }



  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }
}

