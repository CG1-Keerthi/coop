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
    dateInput: "MMMM YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-monthly-yearly-picker-component',
  templateUrl: './monthAndYearPickerComponent.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class MonthAndYearPickerComponent implements OnInit {

  @ViewChild('selectedMonthAndYear') selectedMonthAndYear: ElementRef;
  date = new FormControl();

  @Input() disabledFl: any;

  @Input() set month(data) {
    debugger;
    if (data) {
      this.monthData = data;
      if (this.yearData) {
        this.date.setValue(new Date(this.yearData, this.monthData - 1));
      }
    }else{
      this.date = new FormControl();
    }
  }

  @Input() set year(data) {
    if (data) {
      this.yearData = data;
      if (this.monthData) {
        this.date.setValue(new Date(this.yearData, this.monthData - 1));
      }
    }else{
      this.date = new FormControl();
    }
  }

  @Output() public readonly monthAndYear = new EventEmitter();

  monthData: any;
  yearData: any;

  ngOnInit() {

  }

  chosenYearHandler(normalizedYear: Moment) {
    this.date = new FormControl(moment())
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    debugger;
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.monthAndYear.emit(this.selectedMonthAndYear.nativeElement.value);
    datepicker.close();
  }

}
