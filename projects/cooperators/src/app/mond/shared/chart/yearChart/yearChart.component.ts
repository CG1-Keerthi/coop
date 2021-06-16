import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-yearChart-designer',
  templateUrl: './yearChart.component.html',
  styleUrls: ['./yearChart.component.css']
})

export class yearChartComponent implements OnInit {
  @Input() set chartLabel(data) {
    this.barChartLabels = data;
  }

  @Input() set chartData(list) {
    this.barChartData = [
      { data: list, label: 'year' }
    ];
  }

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