import { Injectable } from '@angular/core';

@Injectable()
export class SortArrayService {

  	constructor() { }

    public sortByAsc(collection: any, fieldName: string): any {
        return collection.sort((param1, param2) => {
            return param1[fieldName] < param2[fieldName] ? -1 :
                (param1[fieldName] > param2[fieldName] ? 1 : 0);
        });
    }
 
    public sortByDesc(collection: any, fieldName: string): any {
        return collection.sort((param1, param2) => {
            return param1[fieldName] > param2[fieldName] ? -1 :
                (param1[fieldName] < param2[fieldName] ? 1 : 0);
        });
    }

    public modifyInstance(collection: any, fieldName: string, matchValue:any, newValue:any): any {
    	//get index of newValue
    	let newCollection=[];
    	for ( var i = 0; i<collection.length;i++){
    		let instance = collection[i];
    		if(instance[fieldName]!==matchValue){
    			newCollection.push(instance);
    		}
    	}
    	newCollection.push(newValue)
    	return newCollection;

    }

}
