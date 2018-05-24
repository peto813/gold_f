import { Pipe, PipeTransform } from '@angular/core';

const toGramConversionRates={
	//all conversion rates are to-gram based
	kg:1000,
	oz: 28.3495,
	gr:1
};

const toOtherConversionRates={
	//all conversion rates are to-gram based
	kg:1/1000,
	oz: 1/28.3495,
	gr:1
};

@Pipe({
  name: 'weightConvert'
})
export class WeightConvertPipe implements PipeTransform {

  transform(value, fromWeightUnit, toWeightUnit): number {

  	if(fromWeightUnit!==toWeightUnit){
  		//transform between weight units
  		// if(fromWeightUnit===toWeightUnit){
  		// 	value=value*1000;
  		if(fromWeightUnit==='gr' && toWeightUnit==='kg'){
  			value=value/1000;
  		}else if(fromWeightUnit==='gr' && toWeightUnit==='oz'){
  			value=value*0.035274;
  		}else if(fromWeightUnit==='oz' && toWeightUnit==='gr'){
  			value=value*28.3495;
  		}else if(fromWeightUnit==='oz' && toWeightUnit==='kg'){
  			value=value*0.028349500000294;
  		}else if(fromWeightUnit==='kg' && toWeightUnit==='oz'){
  			value=value*35.274;
  		}
  	}
  
    return value;
  }

}


@Pipe({
  name: 'weightConvertInverse'
})
export class WeightConvertPipeInverse implements PipeTransform {

  transform(value, fromWeightUnit, toWeightUnit): number {

  	if(fromWeightUnit!==toWeightUnit){
  		//transform between weight units
  		// if(fromWeightUnit===toWeightUnit){
  		// 	value=value/1000;
  		if(fromWeightUnit==='gr' && toWeightUnit==='kg'){
  			value=value*1000;
  		}else if(fromWeightUnit==='gr' && toWeightUnit==='oz'){
  			value=value/0.035274;
  		}else if(fromWeightUnit==='oz' && toWeightUnit==='gr'){
  			value=value/28.3495;
  		}else if(fromWeightUnit==='oz' && toWeightUnit==='kg'){
  			value=value/0.028349500000294;
  		}else if(fromWeightUnit==='kg' && toWeightUnit==='oz'){
  			value=value/35.274;
  		}
  	}
  
    return value;
  }

}