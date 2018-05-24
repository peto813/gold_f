import { Directive } from '@angular/core';
import { RestService } from '../../services/rest-service';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { 
    NG_VALIDATORS,
	Validator,
    NG_ASYNC_VALIDATORS,
	FormControl,
	ValidatorFn,
	AbstractControl,
	ValidationErrors,
    AsyncValidator
} from '@angular/forms';

@Directive({
  selector: '[appForbiddenCedula]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ForbiddenCedulaDirective, multi: true}]

})

export class ForbiddenCedulaDirective implements AsyncValidator{

  constructor(private http: HttpClient, private restService:RestService) { }
  validate(control: AbstractControl): Observable<ValidationErrors> {
    let param=  control.value;
    return this.http.get<any>(this.restService.getUrl(`/api/verifycedula/${param}/`))
    .map((broker:any) => {
      //We found a user by the username.
      //return an error
      return ({"cedulaExists": true});
    })

}
}