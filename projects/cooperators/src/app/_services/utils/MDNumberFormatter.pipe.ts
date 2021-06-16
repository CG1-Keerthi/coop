import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (value != undefined && value != null && value != "") {
      return Number(value).toLocaleString();
    }
    return "";
  }
}