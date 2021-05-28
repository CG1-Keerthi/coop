import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../_services/ds';

@Component({
  selector: 'app-creditorSelfAdminDashboard-designer',
  templateUrl: './creditorSelfAdminDashboard.component.html',
  styleUrls: ['./creditorSelfAdminDashboard.component.css'],

})

export class CreditorSelfAdminDashboardComponent implements OnInit {
  public clientStatus: any;
  public clientStatusVal: any;
  public dashBoardTotalData: any;
  public isShowCertificates: boolean = false;
  public yearLabel: any;
  public yearChartData: any;
  public monthLabel: any;
  public monthChartData: any;
  public isShowMonthChart: boolean;
  public selectedYear: any;


  @ViewChild('year') year: ElementRef;
  constructor(private mdMondServiceDS: MDMondServiceDS) { }
  ngOnInit() {

    this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchClientList', JSON.stringify(""), null).subscribe(
      data => {
        this.clientStatus = JSON.parse(atob(data.value)).clientList_clientSummary;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJjbGllbnRMaXN0X2NsaWVudFN1bW1hcnkiOlt7ImNsaWVudE5hbWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4iLCJjbGllbnRJZGVudGlmaWVyIjo1LCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiI4NTM4MzczOSJ9LHsiY2xpZW50TmFtZSI6IkNyZWxvZ2l4IiwiY2xpZW50SWRlbnRpZmllciI6MiwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUyODI4OTgifSx7ImNsaWVudE5hbWUiOiJMQUlTIiwiY2xpZW50SWRlbnRpZmllciI6MywiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUwODQwNTQifSx7ImNsaWVudE5hbWUiOiJMR00iLCJjbGllbnRJZGVudGlmaWVyIjoxLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiI4NTI3NTc3OSJ9LHsiY2xpZW50TmFtZSI6IkxHTTIiLCJjbGllbnRJZGVudGlmaWVyIjo0LCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiI4NTI3NTc3OSJ9LHsiY2xpZW50TmFtZSI6IlRlc3QxIiwiY2xpZW50SWRlbnRpZmllciI6NzEsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjEifV19" }
        // this.clientStatus = JSON.parse(atob(data.value)).clientList_clientSummary;
      })

  }

  onChangeOfClientStatus(event) {
    debugger;
    this.clientStatusVal = event.currentTarget.value;
    //certificate data
    let formVariables = {
      clientName: event.currentTarget.value,
      effectiveDate: ""
    }
    this.mdMondServiceDS.getFormDataFromMondService('KPI', 'GetCertificateAndPremiumInfoAsOfDate-Total', JSON.stringify(formVariables), null).subscribe(
      data => {
        this.dashBoardTotalData = JSON.parse(atob(data.value));
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJudW1iZXJPZkFjdGl2ZUNlcnRpZmljYXRlcyI6IjY2IiwibnVtYmVyT2ZUZXJtaW5hdGVkQ2VydGlmaWNhdGVzIjoiNSIsInRvdGFsUHJlbWl1bUFzT2ZEYXRlIjoiMTY0NTM2LjIxIn0\u003d" }
        // this.dashBoardTotalData = JSON.parse(atob(data.value));
      })

    //graph data
    let formVariablesList = { clientName: event.currentTarget.value }
    this.mdMondServiceDS.getFormDataFromMondService('KPI', 'GetYearlyPremium', JSON.stringify(formVariablesList), null).subscribe(
      data => {
        this.yearLabel = [];
        this.yearChartData = [];
        let yearPremium = JSON.parse(atob(data.value)).outPutData_data;
        for (let i = 0; i < yearPremium.length; i++) {
          this.yearLabel.push(yearPremium[i].name);
          this.yearChartData.push(yearPremium[i].value);
        }
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJvdXRQdXREYXRhX2RhdGEiOlt7Im5hbWUiOiIyMDE1IiwidmFsdWUiOjIyNjI0LjIzfSx7Im5hbWUiOiIyMDE2IiwidmFsdWUiOjM5Ni4xMn0seyJuYW1lIjoiMjAxNyIsInZhbHVlIjoxNDE1MTUuODZ9XX0\u003d" }
        // this.yearLabel = [];
        // this.yearChartData = [];
        // let yearPremium = JSON.parse(atob(data.value)).outPutData_data;
        // for (let i = 0; i < yearPremium.length; i++) {
        //   this.yearLabel.push(yearPremium[i].name);
        //   this.yearChartData.push(yearPremium[i].value);
        // }
      })

    this.isShowCertificates = true;
  }

  onClickOfYear(event) {
    debugger;
    this.selectedYear = event._i.year;
    //certificate data
    let yearFormVariablesList = { clientName: this.clientStatusVal, effectiveDate: this.selectedYear }
    this.mdMondServiceDS.getFormDataFromMondService('KPI', 'GetCertificateAndPremiumInfoAsOfDate', JSON.stringify(yearFormVariablesList), null).subscribe(
      data => {
        this.dashBoardTotalData = JSON.parse(atob(data.value));
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJudW1iZXJPZkFjdGl2ZUNlcnRpZmljYXRlcyI6IjU3IiwibnVtYmVyT2ZUZXJtaW5hdGVkQ2VydGlmaWNhdGVzIjoiMiIsInRvdGFsUHJlbWl1bUFzT2ZEYXRlIjoiMTQxNTE1Ljg2In0\u003d" }
        // this.dashBoardTotalData = JSON.parse(atob(data.value));
      })

    //graph data
    let yearFormVariable = { clientName: this.clientStatusVal, year: this.selectedYear }
    this.mdMondServiceDS.getFormDataFromMondService('KPI', 'GetMonthlyPremiumForAnYear', JSON.stringify(yearFormVariable), null).subscribe(
      data => {
        this.monthLabel = [];
        this.monthChartData = [];
        let monthPremium = JSON.parse(atob(data.value)).outPutData_data;
        for (let j = 0; j < monthPremium.length; j++) {
          if (monthPremium[j].name == "1") {
            monthPremium[j].name = "Jan";
          }
          if (monthPremium[j].name == "2") {
            monthPremium[j].name = "Feb";
          }
          if (monthPremium[j].name == "3") {
            monthPremium[j].name = "Mar";
          }
          if (monthPremium[j].name == "4") {
            monthPremium[j].name = "Apr";
          }
          if (monthPremium[j].name == "5") {
            monthPremium[j].name = "May";
          }
          if (monthPremium[j].name == "6") {
            monthPremium[j].name = "Jun";
          }
          if (monthPremium[j].name == "7") {
            monthPremium[j].name = "Jul";
          }
          if (monthPremium[j].name == "8") {
            monthPremium[j].name = "Aug";
          }
          if (monthPremium[j].name == "9") {
            monthPremium[j].name = "Sep";
          }
          if (monthPremium[j].name == "10") {
            monthPremium[j].name = "oct";
          }
          if (monthPremium[j].name == "11") {
            monthPremium[j].name = "Nov";
          }
          if (monthPremium[j].name == "12") {
            monthPremium[j].name = "Dec";
          }
          this.monthLabel.push(monthPremium[j].name);
          this.monthChartData.push(monthPremium[j].value);
        }
        this.isShowCertificates = true;
        this.isShowMonthChart = true;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJvdXRQdXREYXRhX2RhdGEiOlt7Im5hbWUiOiIxIiwidmFsdWUiOjB9LHsibmFtZSI6IjIiLCJ2YWx1ZSI6MH0seyJuYW1lIjoiMyIsInZhbHVlIjowfSx7Im5hbWUiOiI0IiwidmFsdWUiOjM4MDQuMX0seyJuYW1lIjoiNSIsInZhbHVlIjoxMTQzMjcuNTF9LHsibmFtZSI6IjYiLCJ2YWx1ZSI6NDY3Ni43M30seyJuYW1lIjoiNyIsInZhbHVlIjowfSx7Im5hbWUiOiI4IiwidmFsdWUiOjE4NzA3LjUyfSx7Im5hbWUiOiI5IiwidmFsdWUiOjB9LHsibmFtZSI6IjEwIiwidmFsdWUiOjB9LHsibmFtZSI6IjExIiwidmFsdWUiOjB9LHsibmFtZSI6IjEyIiwidmFsdWUiOjB9XX0=" }
        // this.monthLabel = [];
        // this.monthChartData = [];
        // let monthPremium = JSON.parse(atob(data.value)).outPutData_data;
        // for (let j = 0; j < monthPremium.length; j++) {
        //   if (monthPremium[j].name == "1") {
        //     monthPremium[j].name = "Jan";
        //   }
        //   if (monthPremium[j].name == "2") {
        //     monthPremium[j].name = "Feb";
        //   }
        //   if (monthPremium[j].name == "3") {
        //     monthPremium[j].name = "Mar";
        //   }
        //   if (monthPremium[j].name == "4") {
        //     monthPremium[j].name = "Apr";
        //   }
        //   if (monthPremium[j].name == "5") {
        //     monthPremium[j].name = "May";
        //   }
        //   if (monthPremium[j].name == "6") {
        //     monthPremium[j].name = "Jun";
        //   }
        //   if (monthPremium[j].name == "7") {
        //     monthPremium[j].name = "Jul";
        //   }
        //   if (monthPremium[j].name == "8") {
        //     monthPremium[j].name = "Aug";
        //   }
        //   if (monthPremium[j].name == "9") {
        //     monthPremium[j].name = "Sep";
        //   }
        //   if (monthPremium[j].name == "10") {
        //     monthPremium[j].name = "oct";
        //   }
        //   if (monthPremium[j].name == "11") {
        //     monthPremium[j].name = "Nov";
        //   }
        //   if (monthPremium[j].name == "12") {
        //     monthPremium[j].name = "Dec";
        //   }
        //   this.monthLabel.push(monthPremium[j].name);
        //   this.monthChartData.push(monthPremium[j].value);
        // }
        // this.isShowCertificates = true;
        // this.isShowMonthChart = true;
      })

  }

}