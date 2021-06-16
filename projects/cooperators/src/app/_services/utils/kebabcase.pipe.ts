import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabcase'
})
export class KebabcasePipe implements PipeTransform {

  transform(value: String, args?: any): String {
    return value.toLowerCase().split(' ').join('-');
  }

}
