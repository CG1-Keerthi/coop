import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Base64 } from 'js-base64';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';

declare var $: any;

@Component({
  selector: 'app-product-search-coverage-designer',
  templateUrl: './productSearchCoverage.component.html',
  styleUrls: ['./productSearchCoverage.component.css']
})

export class ProductSearchCoverageComponent implements OnInit {

  @Input() set clientIdentifier(id) {
    this.clientId = id;
  }
  @Input() set coverageList(data) {
    this.coverageMaintenanceList = data;
  }
  @Output() coverageRowSelect = new EventEmitter();

  public clientNumberListData: any;
  public planNumber: string = "";
  public lineOfBusinessList: any;
  public coverageTypeList: any;
  public clientId: string;
  public selectedPlanNumber: any;
  public planSelect: string;
  public lineOfBusiness: string = "";
  public coverageType: string = "";
  public coverageStatus: string = "";
  public coverageMaintenanceList: any;
  public isSpinnerShow: boolean;

  constructor(private mdMondService: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private mdCodeListHeaderDS: MDCodeListHeaderDS,
  ) { }

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

  onSelectPlanNumber(event) {
    debugger;
    this.selectedPlanNumber = undefined;
    this.selectedPlanNumber = event.source.value;
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

  onClickOfCoverageSearch() {
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
      "coverageStatus": this.coverageStatus,
      "planCoverageList_coverageSummary": []
    }
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanCoverageList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.coverageMaintenanceList = JSON.parse(atob(data.value)).planCoverageList_coverageSummary
        this.isSpinnerShow = false;
      },
      error => {
        debugger;
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJwbGFuQ292ZXJhZ2VMaXN0X2NvdmVyYWdlU3VtbWFyeSI6IFsKICAgIHsKICAgICAgImxpbmVPZkJ1c2luZXNzIjogIjkwMSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgICAicGxhbkNvdmVyYWdlSW5mb0lkIjogIjU4MyIsCiAgICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiLAogICAgICAicGxhbk51bWJlciI6ICJQbGFuIE51bWJlcl84IiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCgkgewogICAgICAibGluZU9mQnVzaW5lc3MiOiAiOTAxIiwKICAgICAgImNvdmVyYWdlVHlwZSI6ICJDUkVMSSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTgyIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAgICJwbGFuTnVtYmVyIjogIlRlc3QxIiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDIiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVESSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTY0IiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJESSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzIyIiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDEiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVMSSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTYzIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzIyIiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDIiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVESSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTYyIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJESSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzIwIiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDEiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVMSSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTYxIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzIwIiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDIiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVESSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTYwIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJESSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzE5IiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDEiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVMSSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTU5IiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzE5IiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCgkgIHsKICAgICAgImxpbmVPZkJ1c2luZXNzIjogIjkwMSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiRUxJIiwKICAgICAgInBsYW5Db3ZlcmFnZUluZm9JZCI6ICI1NTkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkxJIiwKICAgICAgInBsYW5OdW1iZXIiOiAiMDU3MTkiLAogICAgICAiY292ZXJhZ2VTdGF0dXMiOiAiQWN0aXZlIgogICAgfSwKCSAgewogICAgICAibGluZU9mQnVzaW5lc3MiOiAiOTAxIiwKICAgICAgImNvdmVyYWdlVHlwZSI6ICJFTEkiLAogICAgICAicGxhbkNvdmVyYWdlSW5mb0lkIjogIjU1OSIsCiAgICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiLAogICAgICAicGxhbk51bWJlciI6ICIwNTcxOSIsCiAgICAgICJjb3ZlcmFnZVN0YXR1cyI6ICJBY3RpdmUiCiAgICB9LAoJICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDIiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVESSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTYwIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJESSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzE5IiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCiAgICB7CiAgICAgICJsaW5lT2ZCdXNpbmVzcyI6ICI5MDEiLAogICAgICAiY292ZXJhZ2VUeXBlIjogIkVMSSIsCiAgICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTU5IiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzE5IiwKICAgICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICAgIH0sCgkgIHsKICAgICAgImxpbmVPZkJ1c2luZXNzIjogIjkwMSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiRUxJIiwKICAgICAgInBsYW5Db3ZlcmFnZUluZm9JZCI6ICI1NTkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkxJIiwKICAgICAgInBsYW5OdW1iZXIiOiAiMDU3MTkiLAogICAgICAiY292ZXJhZ2VTdGF0dXMiOiAiQWN0aXZlIgogICAgfSwKCSAgewogICAgICAibGluZU9mQnVzaW5lc3MiOiAiOTAxIiwKICAgICAgImNvdmVyYWdlVHlwZSI6ICJFTEkiLAogICAgICAicGxhbkNvdmVyYWdlSW5mb0lkIjogIjU1OSIsCiAgICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiLAogICAgICAicGxhbk51bWJlciI6ICIwNTcxOSIsCiAgICAgICJjb3ZlcmFnZVN0YXR1cyI6ICJBY3RpdmUiCiAgICB9CgkKCV0KCQoJfQoJ" }
        this.coverageMaintenanceList = JSON.parse(atob(data.value)).planCoverageList_coverageSummary
        this.isSpinnerShow = false
      }
    )
  }

  onMouseOver() {
    $(".coverageHelp").tooltip('show');
  }

  onClickOfCoverageReset() {
    this.planNumber = "";
    this.lineOfBusiness = "";
    this.coverageType = "";
    this.coverageStatus = "";
    this.coverageMaintenanceList = [];
  }

  onCoverageListRowSelect(item){
    debugger;
    this.coverageRowSelect.emit(item);
  }

}
