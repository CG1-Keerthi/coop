import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class currencyFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (value != undefined && value != null && value != "") {
      return "$ " + Number(value).toLocaleString();
    }
    return "";
  }
}