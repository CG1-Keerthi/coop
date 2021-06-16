// Core Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
// Component References
import { MonthlyPickerComponent } from "./monthly-picker-component/monthlyPickerComponent";
import { YearlyPickerComponent } from './yearly-picker-component/yearlyPickerComponent';
import { MonthAndYearPickerComponent } from './monthAndYear-picker-component/monthAndYearPickerComponent';
import { ChartsModule } from 'ng2-charts';
import { yearChartComponent } from './chart/yearChart/yearChart.component';
import { monthChartComponent } from './chart/monthChart/monthChart.component';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    MonthlyPickerComponent,
    YearlyPickerComponent,
    MonthAndYearPickerComponent,
    yearChartComponent,
    monthChartComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ChartsModule
  ],
  exports: [
    MonthlyPickerComponent,
    YearlyPickerComponent,
    MonthAndYearPickerComponent,
    yearChartComponent,
    monthChartComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class SharedModule { }
