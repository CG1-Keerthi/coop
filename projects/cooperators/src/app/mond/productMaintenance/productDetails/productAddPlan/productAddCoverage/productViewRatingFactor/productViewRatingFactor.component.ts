import { Component, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Base64 } from 'js-base64';
// import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';

declare var $: any;

@Component({
  selector: 'app-product-view-rating-factor-designer',
  templateUrl: './productViewRatingFactor.component.html',
  styleUrls: ['./productViewRatingFactor.component.css']
})

export class ProductViewRatingFactorComponent implements OnInit {
  @Input() set clientIdentifier(id) {
    this.clientId = id;
  }

  @Input() set ratingFactorMaintenanceData(data) {
    // data.planProductInfo.clientName =  this.clientName;
    this.ratingFactorMaintenanceList = data;
  }
  @Output() ratingFactorRowSelect = new EventEmitter();

  public clientNumberListData: any;
  public planNumber: any = "";
  public coverageTypeList: any;
  public lineOfBusinessList: any;
  public clientId: string;
  public coverageType: any = "";
  public lineOfBusiness: any = "";
  public ratingFactorStatus: any = "";
  public planSelect: any;
  public selectedPlanNumber: any;
  public ratingFactorMaintenanceList: any;
  public isSpinnerShow: boolean;
  public clientName: any;

  constructor(private mdMondService: MDMondServiceDS,
    private mdCodeListHeaderDS: MDCodeListHeaderDS) {

  }

  ngOnInit() {
    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LineOfBusiness').subscribe(
      data => {
        this.lineOfBusinessList = data;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145511, "codeListHeaderId": 1530, "code": "1", "description": "901" }, { "codeListValuesId": 145535, "codeListHeaderId": 1530, "code": "2", "description": "902" }, { "codeListValuesId": 404830, "codeListHeaderId": 1530, "code": "3", "description": "904" }, { "codeListValuesId": 404831, "codeListHeaderId": 1530, "code": "4", "description": "906" }]
        this.lineOfBusinessList = data;
      })
  }
  ngAfterViewinit() {

  }

  onSelectPlanNumber(event) {
    // debugger;
    this.selectedPlanNumber = undefined;
    this.selectedPlanNumber = event.source.value;
  }

  getPlanNumberDetails(event) {
    debugger;
    this.selectedPlanNumber = undefined;
    this.planSelect = "planNumberSelect";
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfPlanNumbers", JSON.stringify({ "planNumber": event.target.value.trim() }), "").subscribe(
      data => {
        this.clientNumberListData = JSON.parse(Base64.decode(data.value)).response_response;
      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiJUZXN0MSIsInZhbHVlIjoiVGVzdDEifV19" }
        this.clientNumberListData = JSON.parse(Base64.decode(data.value)).response_response;
      }
    )
  }

  onChangeOfLOB(event) {
    let formVariable = {
      "clientId": this.clientId,
      "lineOfBusiness": event.currentTarget.value
    }
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
      data => {
        let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
        this.coverageTypeList = parsedData;

      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVR5cGVMaXN0X2NvdmVyYWdlTG9va1VwIjogWwogICAgewogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIKICAgIH0sCgl7CiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFREkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgfQogIF0KfQ==" };
        let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
        this.coverageTypeList = parsedData;
      }
    )
  }

  onMouseOver() {
    $(".coverageHelp").tooltip('show');
  }

  onClickOfRatingFactorSearch() {
    debugger
    if (this.planNumber != "") {
      if (this.planSelect == "planNumberSelect") {
        if (this.selectedPlanNumber == undefined) {
          this.mdMondService.showErrorMessage("Please select the Plan Number.");
          return;
        }
      }
    }
    let formVariable = {
      "planNumber": this.planNumber,
      "": "1",
      "lineOfBusiness": this.lineOfBusiness,
      "coverageType": this.coverageType,
      "ratingFactorStatus": this.ratingFactorStatus,
      "coverageRatingFactorList_coverageRatingSummary": []
    }
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageRatingFactorList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.ratingFactorMaintenanceList = JSON.parse(atob(data.value)).coverageRatingFactorList_coverageRatingSummary
        this.isSpinnerShow = false;
      },
      error => {
        debugger;
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVJhdGluZ0ZhY3Rvckxpc3RfY292ZXJhZ2VSYXRpbmdTdW1tYXJ5IjogWwogICAgewogICAgICAicmF0aW5nRmFjdG9yU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgICAicHJvZHVjdENvdmVyYWdlRmFjdG9ySWQiOiAiNTgzIiwKICAgICAgInBsYW5OdW1iZXIiOiAiUGxhbiBOdW1iZXJfOCIKICAgIH0sCiAgICB7CiAgICAgICJyYXRpbmdGYWN0b3JTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImNvdmVyYWdlVHlwZSI6ICJDUkVMSSIsCiAgICAgICJwcm9kdWN0Q292ZXJhZ2VGYWN0b3JJZCI6ICI1ODIiLAogICAgICAicGxhbk51bWJlciI6ICJQbGFuIE51bWJlcl84IgogICAgfSwKICAgIHsKICAgICAgInJhdGluZ0ZhY3RvclN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgInByb2R1Y3RDb3ZlcmFnZUZhY3RvcklkIjogIjU4MSIsCiAgICAgICJwbGFuTnVtYmVyIjogIlBsYW4gTnVtYmVyXzgiCiAgICB9LAogICAgewogICAgICAicmF0aW5nRmFjdG9yU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgICAicHJvZHVjdENvdmVyYWdlRmFjdG9ySWQiOiAiNTgwIiwKICAgICAgInBsYW5OdW1iZXIiOiAiUGxhbiBOdW1iZXJfOCIKICAgIH0KICBdCn0=" }
        this.ratingFactorMaintenanceList = JSON.parse(atob(data.value)).coverageRatingFactorList_coverageRatingSummary
        this.isSpinnerShow = false;
      }
    )
  }

  onClickOfRatingFactorReset() {
    debugger;
    this.planNumber = "";
    this.lineOfBusiness = "";
    this.coverageType = "";
    this.ratingFactorStatus = "";
    this.ratingFactorMaintenanceList = [];
  }

  onRatingFactorRowSelect(item) {
    debugger;
    this.ratingFactorRowSelect.emit(item);
  }
}