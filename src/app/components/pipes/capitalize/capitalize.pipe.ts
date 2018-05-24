import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value:any, words:boolean) {

    if (value) {
      if (words) {
        return value.replace(/\b\w/g, first => first.toLocaleUpperCase());
      } else {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }

    return value;
  }
}

@Pipe({
  name: 'capitalizeach'
})
export class CapitalizeEachWord implements PipeTransform {

  transform(value:any) {

      if (value){
            var splitStr = value.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            return splitStr.join(' ');      
      }


    return value;
  }
}
