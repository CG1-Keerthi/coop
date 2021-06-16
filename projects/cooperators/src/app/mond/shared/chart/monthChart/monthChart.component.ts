import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-monthChart-designer',
  templateUrl: './monthChart.component.html',
  styleUrls: ['./monthChart.component.css']
})

export class monthChartComponent implements OnInit {
  @Input() set monthChartLabel(monthLabel) {
    this.barChartLabels = monthLabel
  }

  @Input() set monthChartData(monthList) {
    this.barChartData = [
      { data: monthList, label: 'Month' }
    ];
  }

  // related to Graph

  public chartDataList: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public isShowMonthChart: boolean;
  public barChartLabels: Label[]
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[];

  constructor() { }
  ngOnInit() {

  }

}