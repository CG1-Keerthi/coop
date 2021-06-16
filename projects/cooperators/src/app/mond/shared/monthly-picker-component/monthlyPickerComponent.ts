import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { MatDatepicker } from '@angular/material/datepicker';


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "MMMM/YYYY"
  },
  display: {
    dateInput: "MMMM",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-monthly-picker-component',
  templateUrl: './monthlyPickerComponent.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class MonthlyPickerComponent implements OnInit {

  @ViewChild('selectedMonth') selectedMonth: ElementRef;
  date = new FormControl();

  @Output() public readonly month = new EventEmitter();
  
  @Input() set monthPicked(data) {
    debugger;
    if (!data) {
      this.date = new FormControl();
    }
  }

  ngOnInit() {
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    // debugger;
    this.date = new FormControl(moment());
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    // this.month.emit(this.selectedMonth.nativeElement.value);
    this.month.emit(normalizedMonth)
    datepicker.close();
  }

}
