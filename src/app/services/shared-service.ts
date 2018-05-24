import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class sharedService {
 //showLoadingIcon:any;
 notify: Subject<boolean> = new Subject<boolean>();
 constructor() {
}
    setLoaderShow(showLoader) {
        this.notify.next(showLoader);
    }

}