import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-certificateDetails-designer',
  templateUrl: './certificateDetails.component.html',
  styleUrls: ['./certificateDetails.component.css'],
})

export class certificateDetailsComponent implements OnInit {
 gridLoadData: any;
  @Input() certificateDetailsData;
  @Input() premiumHistoryData

  public certificateData: any;
  public creditorDataJson: any;
  public applicantDetails: any;
  public applicantAddress: any;
  public applicantCoverage: {};
  public premiumHistoryList: any;
  public premiumHistoryDisplayList: any;
  public disabilityPremiumTotal: number;
  public disabilityPremiumTaxTotal: number;
  public premiumTotal: number;
  public taxTotal: number;
  public premiumWithTaxTotal: string;
  public isFieldreadonly: boolean = true;
  constructor() { }


  ngOnInit() {
    // console.log("this.certificateDetailsData", this.certificateDetailsData);
    this.certificateData = this.certificateDetailsData;
    this.creditorDataJson = {};
    if(this.certificateData != ""){
      this.creditorDataJson = JSON.parse(this.certificateData.creditorDataJson);
    }
   
    this.premiumHistoryList = [];
    if(this.premiumHistoryData != ""){
      this.premiumHistoryList = JSON.parse(this.premiumHistoryData);
    }
  
    var totalPremium = this.premiumHistoryList.premiumListSP_premium;
    if(totalPremium != undefined){
      let disabilityPremiumArray = [];
      let disabilityPremiumTaxArray = [];
      let totalPremiumArray = [];
      let totalTaxArray = [];
      let totalPremiumWithTaxArrray = [];
      for (let i = 0; i < totalPremium.length; i++) {
        disabilityPremiumArray.push(totalPremium[i].disabilityPremium);
        disabilityPremiumTaxArray.push(totalPremium[i].disabilityPremiumTax);
        totalPremiumArray.push(totalPremium[i].totalPremium);
        totalTaxArray.push(totalPremium[i].totalTax);
        totalPremiumWithTaxArrray.push(totalPremium[i].totalPremiumWithTax);
      }
      this.getDisabilityTotal(disabilityPremiumArray);
      this.getDisabilityPremiumTaxTotal(disabilityPremiumTaxArray);
      this.getTotalPremiumArray(totalPremiumArray);
      this.getTotalTaxArray(totalTaxArray);
      this.getTotalPremiumWithTaxArrray(totalPremiumWithTaxArrray);
    }

  }

  getDisabilityTotal(data) {
    var total = 0;
    for (var j in data) {
      total += data[j];
    }
    this.disabilityPremiumTotal = total;
  }

  getDisabilityPremiumTaxTotal(data){
    var total = 0;
    for (var j in data) {
      total += data[j];
    }
    this.disabilityPremiumTaxTotal = total;
  }

  getTotalPremiumArray(data){
    var total = 0;
    for (var j in data) {
      total += data[j];
    }
    this.premiumTotal = total;
  }

  getTotalTaxArray(data){
    var total = 0;
    for (var j in data) {
      total += data[j];
    }
    this.taxTotal = total;
  }

  getTotalPremiumWithTaxArrray(data){
    var total = 0;
    for (var j in data) {
      total += data[j];
    }
    this.premiumWithTaxTotal = total.toFixed(2);
  }

  onClickOfApplicantCertficateRow(event) {
    debugger;
    this.applicantDetails = {};
    this.applicantAddress = [];
    this.applicantCoverage = [];
    this.applicantDetails = event.data;
    this.applicantAddress = event.data.applicantAddress;
    this.applicantCoverage = event.data.applicantCoverage;
  }

}