import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    dateInput: "YYYY"
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-yearly-picker-component',
  templateUrl: './yearlyPickerComponent.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class YearlyPickerComponent implements OnInit {
  
  @ViewChild('selectedYear') selectedYear: ElementRef;
  date = new FormControl();
  @Output() public readonly year = new EventEmitter();

  @Input() set yearPicked (data) {
    debugger;
    if (!data) {
      this.date = new FormControl();
    }
  }

  ngOnInit() {
  }

  chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
    debugger;
    this.date = new FormControl(moment());
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.year.emit(normalizedYear);

// let selectedYear = 

    // this.date = new FormControl(moment());
    // const ctrlValue = this.date.value;
    // // ctrlValue.year(normalizedYear.year());
    // // this.date.setValue(ctrlValue);
    // datepicker.close();
    // // this.year.emit(this.selectedYear.nativeElement.value);
    // this.year.emit(event._i.year)
  }

  

}
