import { Injectable } from '@angular/core';
import { UserService }      from './services/user.service';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}      					  from '@angular/router';
@Injectable()
export class OwnerGuardService {
	//ONLY OWNERS CAN ACCESS THIS VIEW

  constructor(private authService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkUserisOwner(url);
  }



  checkUserisOwner(url: string): boolean {
  	console.log(this.authService.getRole())
	if (this.authService.getRole()==='owner') { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }
}
