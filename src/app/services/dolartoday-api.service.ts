import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class DolartodayApiService {

  constructor(private http: HttpClient) { }

  getData(){
	//return this.http.get('https://s3.amazonaws.com/dolartoday/data.json')
	//return Observable.interval(500).of(this.http.get('https://s3.amazonaws.com/dolartoday/data.json'))
    return Observable.timer(0,1800000).flatMap(() => {
        return this.http.get('https://s3.amazonaws.com/dolartoday/data.json');
    });
  }

  getCurrencies(){
    return Observable.timer(0,3600000).flatMap(() => {
        return this.http.get('https://www.live-rates.com/rates');
    });
  }

}
