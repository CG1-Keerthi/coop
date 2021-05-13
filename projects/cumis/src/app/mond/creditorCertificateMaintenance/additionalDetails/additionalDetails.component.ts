import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-additionalDetails-designer',
  templateUrl: './additionalDetails.component.html',
  styleUrls: ['./additionalDetails.component.css'],
})

export class additionalDetailsComponent implements OnInit {

  @Input() additionalDetailsData
  public additionalDetailsList: any;
  public parsedAdditionalDetailsList: any;
  public isFieldreadonly: boolean = true;

  constructor() { }


  ngOnInit() {
   debugger;
   this.additionalDetailsList = this.additionalDetailsData;
   this.parsedAdditionalDetailsList = {};
   this.parsedAdditionalDetailsList = JSON.parse(this.additionalDetailsList.creditorDataJson).certificate;
  }

}