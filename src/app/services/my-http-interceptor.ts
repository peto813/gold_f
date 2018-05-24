import { Injectable, Injector, isDevMode } from '@angular/core';

import { HttpEvent,
		HttpInterceptor,
		HttpHandler,
		HttpRequest,
		HttpResponse,
		HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { sharedService } from '../services/shared-service';
import 'rxjs/add/operator/map';

import { AlertService } from '../services/alert.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(
	//private loaderService: AppComponent,
	public alertService: AlertService,
	public sharedScope:sharedService
	) {
}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	this.sharedScope.setLoaderShow(true);
  	let baseUrl='';
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.key) {
	    const authReq = req.clone({
	      headers: req.headers.set('Authorization', 'Token '+currentUser.key)
	    });
	    //const authReq = req.clone({ setHeaders: { Authorization: 'Token '+currentUser.key } });
	    //return next.handle(authReq);


	    return next.handle(authReq).map((event: HttpEvent<any>) => {
	      if (event instanceof HttpResponse) {
	        let newEvent: HttpEvent<any>;
	        this.sharedScope.setLoaderShow(false);
	        // alter response here. maybe do the following
	        newEvent = event.clone({ 
	          // alter event params here
	        });

	        return newEvent;
	      }
	    }).catch(response => {
        // if (response instanceof HttpErrorResponse) {
        //   console.log('Processing http error', response);
        // }
        this.sharedScope.setLoaderShow(false);
        return Observable.throw(response);
      });;


        // next.handle(req);
    }

    
	// if(isDevMode()) {
	// 	if(req.url.indexOf('http')==-1){
	// 		baseUrl ='http://localhost:8000/';
	// 	}
	  
	// }
 //    const apiReq = req.clone({ url: baseUrl+`${req.url}` });
 	//const authReq = req.clone({ setHeaders: { Authorization: authToken } });
 	//this.loaderService.loader(false);
 	//console.log('finish')
 	//
    //return next.handle(req);

	    return next.handle(req).map((event: HttpEvent<any>) => {
	      if (event instanceof HttpResponse) {
	        let newEvent: HttpEvent<any>;
	        this.sharedScope.setLoaderShow(false);
	        // alter response here. maybe do the following
	        newEvent = event.clone({ 
	          // alter event params here
	        });

	        return newEvent;
	      }
	    }).catch(response => {
        // if (response instanceof HttpErrorResponse) {
        //   console.log('Processing http error', response);
        // }
        this.sharedScope.setLoaderShow(false);
        return Observable.throw(response);
      });
  }

}
