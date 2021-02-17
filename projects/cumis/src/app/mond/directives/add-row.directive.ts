import { Directive, Input, HostListener } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appPtableAddRow]'
})
export class AddRowDirective {
  @Input() table: Table;
  @Input() newRow: any;

  @HostListener('click', ['$event'])public onClick(event: Event) {
    // Insert a new row
    this.table.value.push(this.newRow);
    this.table.initRowEdit(this.newRow);
    event.preventDefault();
  }
}