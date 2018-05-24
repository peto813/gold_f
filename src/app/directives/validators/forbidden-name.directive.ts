import { Directive, Input } from '@angular/core';
//import { Broker }    from '../../model-classes/broker';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestService } from '../../services/rest-service';
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

import { Observable } from 'rxjs/Rx';


// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true}]
})
export class ForbiddenNameDirective implements AsyncValidator{

  //@Input('appForbiddenName') forbiddenName: string;
 		constructor(private http: HttpClient, private restService:RestService) { }
  // validate(control: AbstractControl): {[key: string]: any} {
  //   return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
  //                             : null;
  // }
  validate(control: AbstractControl): Observable<ValidationErrors> {
    let param=  control.value;
    return this.http.get<any>(this.restService.getUrl(`/api/verifyuser/${param}/`))
    .map((broker:any) => {
      //We found a user by the username.
      //return an error
      return ({"userExists": true});
    })
  }
}
