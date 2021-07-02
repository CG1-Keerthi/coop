import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Base64 } from 'js-base64';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common';
import { MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';


declare var $: any;

@Component({
  selector: 'app-product-plan-search-designer',
  templateUrl: './productPlanSearch.component.html',
  styleUrls: ['./productPlanSearch.component.css']
})

export class ProductPlanSearchComponent implements OnInit {

  @Input() set planList(data) {
    this.planMaintenanceList = data;
  }

  @Output() rowSelect = new EventEmitter();
  public productTypeListData: any;
  public productType: string = "";
  public clientNameListData: any;
  public clientName: string = "";
  public clientNumberListData: [];
  public productNumber: string = "";
  public planNameListData: [];
  public planName: string = "";
  public csfrToken: any;
  public planStatus: string = "";
  public planMaintenanceList: any;
  public copyPlan: string;
  public iscopyProduct: boolean;
  public isShowProd: boolean = false;
  public prodList: [];
  public planRowData: any;
  public copyPlanNumber: any;
  public copyPlanName: any;
  public copyEffectiveDate: any = new Date;
  public copyPlanStatus: string = "";
  public selectedClientName: any;
  public clientSelect: string;
  public selectedProductType: any;
  public productSelect: string;
  public selectedProductNumber: any;
  public planSelect: string;
  public planNameSelect: string;
  public selectedPlanName: any;
  public isSpinnerShow: boolean;

  @ViewChild('copyDate') copyDate: ElementRef;

  constructor(private mdMondService: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter
  ) { }

  ngOnInit() {
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });
  }

  getProductTypeDetails(event) {
    this.selectedProductType = undefined;
    this.productSelect = "productSelect";

    if (!event.target.value) {
      return;
    }
    this.productTypeListData = []
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfProducts", JSON.stringify({ "productType": event.target.value.trim() }), "").subscribe(
      data => {
        this.productTypeListData = JSON.parse(Base64.decode(data.value)).response_response
      }, error => {
        this.mdMondService.MDError(error);
        let data = "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiJTUCIsInZhbHVlIjoiU1AifV19"
        this.productTypeListData = JSON.parse(Base64.decode(data)).response_response
      }
    )
  }

  getClientNameDetails(event) {
    this.selectedClientName = undefined;
    this.clientSelect = "clientSelect";
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfClientNames", JSON.stringify({ "clientName": event.target.value.trim() }), "").subscribe(
      data => {
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiI1IiwidmFsdWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4ifSx7ImlkIjoiMiIsInZhbHVlIjoiQ3JlbG9naXgifV19" }
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }
    )
  }

  getPlanNumberDetails(event) {
    this.selectedProductNumber = undefined;
    this.planSelect = "productNumberSelect";
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
  getPlanNameDetails(event) {
    debugger;
    this.selectedPlanName = undefined;
    this.planNameSelect = "planNameSelect";
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfPlanNames", JSON.stringify({ "planName": event.target.value.trim() }), "").subscribe(
      data => {
        this.planNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiJUZXN0MSBuYW1lIiwidmFsdWUiOiJUZXN0MSBuYW1lIn1dfQ\u003d\u003d" }
        this.planNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }
    )
  }

  onSelectClientName(event) {
    this.selectedClientName = undefined
    this.selectedClientName = event.source.value;
  }

  onSelectProductType(event) {
    this.selectedProductType = undefined
    this.selectedProductType = event.source.value;
  }

  onSelectPlanNumber(event) {
    this.selectedProductNumber = undefined;
    this.selectedProductNumber = event.source.value;
  }

  onSelectPlanName(event) {
    this.selectedPlanName = undefined;
    this.selectedPlanName = event.source.value;
  }

  onClickOfPlanSearch() {
    debugger;
    if (this.clientName != "") {
      if (this.clientSelect == "clientSelect") {
        if (this.selectedClientName == undefined) {
          this.mdMondService.showErrorMessage("Please select the Client Name.");
          return;
        }
      }
    }
    if (this.productType != "") {
      if (this.productSelect == "productSelect") {
        if (this.selectedProductType == undefined) {
          this.mdMondService.showErrorMessage("Please select the Product Type.");
          return;
        }
      }
    }
    if (this.productNumber != "") {
      if (this.planSelect == "productNumberSelect") {
        if (this.selectedProductNumber == undefined) {
          this.mdMondService.showErrorMessage("Please select the Plan Number.");
          return;
        }
      }
    }
    if (this.planName != "") {
      if (this.planNameSelect == "planNameSelect") {
        if (this.selectedPlanName == undefined) {
          this.mdMondService.showErrorMessage("Please select the Plan Name.");
          return;
        }
      }
    }
    let formVariable = {
      "clientName": this.clientName,
      "productType": this.productType,
      "planNumber": this.productNumber,
      "planName": this.planName,
      "": "1",
      "planStatus": this.planStatus,
      "planProductList_planProductSummary": []
    }
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanProductInfoList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.planMaintenanceList = JSON.parse(atob(data.value)).planProductList_planProductSummary;
        this.isSpinnerShow = false;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJwbGFuUHJvZHVjdExpc3RfcGxhblByb2R1Y3RTdW1tYXJ5IjogWwogICAgewogICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICAgInByb2R1Y3RJZCI6IDExMiwKICAgICAgImNsaWVudE5hbWUiOiAiQ3JlbG9naXgiLAogICAgICAicGxhbk5hbWUiOiAiVGVzdDEgbmFtZSIsCiAgICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAgICJwbGFuTnVtYmVyIjogIlRlc3QxIiwKICAgICAgInVwZGF0ZWRCeSI6ICJzYWRoeWFzbWl0YS5wcnVzdHlAY29ubmVjdGdsb2JhbG9uZS5jb20iLAogICAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wMy0xOFQxMjoyNzoyMS4wMDBaIgogICAgfSwKICAgIHsKICAgICAgInBsYW5Qcm9kdWN0SW5mb0lkIjogIjE0MCIsCiAgICAgICJwcm9kdWN0SWQiOiA4LAogICAgICAiY2xpZW50TmFtZSI6ICJMR00iLAogICAgICAicGxhbk5hbWUiOiAiRk9SRCAtIFNpbmdsZSBQcmVtaXVtIC0gRXNzZW50aWFsIiwKICAgICAgInBsYW5TdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgInByb2R1Y3RUeXBlIjogIlNQIiwKICAgICAgInBsYW5OdW1iZXIiOiAiMDU3MjIiLAogICAgICAidXBkYXRlZEJ5IjogInNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsCiAgICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDIxLTAzLTE4VDEyOjI3OjIxLjAwMFoiCiAgICB9LAogICAgewogICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTM5IiwKICAgICAgInByb2R1Y3RJZCI6IDgsCiAgICAgICJjbGllbnROYW1lIjogIkxHTSIsCiAgICAgICJwbGFuTmFtZSI6ICJGT1JEIC0gU2luZ2xlIFByZW1pdW0gLSBFc3NlbnRpYWwiLAogICAgICAicGxhblN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAicHJvZHVjdFR5cGUiOiAiU1AiLAogICAgICAicGxhbk51bWJlciI6ICIwNTcyMCIsCiAgICAgICJ1cGRhdGVkQnkiOiAic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDMtMThUMTI6Mjc6MjEuMDAwWiIKICAgIH0sCiAgICB7CiAgICAgICJwbGFuUHJvZHVjdEluZm9JZCI6ICIxMzgiLAogICAgICAicHJvZHVjdElkIjogOCwKICAgICAgImNsaWVudE5hbWUiOiAiTEdNIiwKICAgICAgInBsYW5OYW1lIjogIkZPUkQgLSBTaW5nbGUgUHJlbWl1bSAtIEVzc2VudGlhbCIsCiAgICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0VHlwZSI6ICJTUCIsCiAgICAgICJwbGFuTnVtYmVyIjogIjA1NzE5IiwKICAgICAgInVwZGF0ZWRCeSI6ICJzYWRoeWFzbWl0YS5wcnVzdHlAY29ubmVjdGdsb2JhbG9uZS5jb20iLAogICAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wMy0xOFQxMjoyNzoyMS4wMDBaIgogICAgfQogIF0KfQ==" }
       
        this.planMaintenanceList = JSON.parse(atob(data.value)).planProductList_planProductSummary;
        this.isSpinnerShow = false;
      }
    )

  }

  onChangeOfCopyPlanName(rowData, event) {
    debugger;
    this.planRowData = rowData;
    $("input[type='checkbox'][name='copyPlanName']").prop('checked', false);
    if ($(event.currentTarget).is(":checked")) {
      $(event.currentTarget).prop('checked', false);
    } else {
      $(event.currentTarget).prop('checked', true);
    }
    this.copyPlan = "copyPlan";
  }

  onClickOfCopyPlan() {
    debugger
    this.isShowProd = false;
    if (this.copyPlan == "copyPlan") {
      $("#copyPlanModelId").click();
      this.iscopyProduct = true;
      this.getProductList()
      this.copyPlanNumber = this.planRowData.planNumber;
      this.copyPlanName = this.planRowData.planName;

    } else {
      this.mdMondService.showErrorMessage("Please select the plan to copy");
      return;
    }
  }

  onChangeOfCopyProduct(event) {
    debugger;
    if (event.checked == false) {
      this.isShowProd = true;
    }
    if (event.checked == true) {
      this.isShowProd = false;
    }
  }
  getProductList() {

    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchProductList', "", null).subscribe(
      data => {
        this.prodList = JSON.parse(atob(data.value)).productList_productSummary;
      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJwcm9kdWN0TGlzdF9wcm9kdWN0U3VtbWFyeSI6IFsKICAgIHsKICAgICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICAgImluc2VydGVkQnkiOiAic291bXlhLmttQG1vbmRjbG91ZC5jb20iLAogICAgICAidXBkYXRlZEJ5IjogInNvdW15YS5rbUBtb25kY2xvdWQuY29tIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMThUMDc6Mjk6NTYuMDAwWiIsCiAgICAgICJpbnNlcnREYXRlIjogIjIwMjEtMDYtMThUMDc6Mjk6MjkuMDAwWiIsCiAgICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0UGxhbklkIjogIjExNyIsCiAgICAgICJwcm9kdWN0TnVtYmVyIjogIjgiLAogICAgICAicHJvZHVjdFR5cGUiOiAicHJvZHVjdFR5cGU4IiwKICAgICAgInByb2R1Y3ROYW1lIjogIlR5cGU4IgogICAgfSwKICAgIHsKICAgICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICAgImluc2VydGVkQnkiOiAic291bXlhLmttQG1vbmRjbG91ZC5jb20iLAogICAgICAidXBkYXRlZEJ5IjogInNvdW15YS5rbUBtb25kY2xvdWQuY29tIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMThUMDc6Mjc6NTcuMDAwWiIsCiAgICAgICJpbnNlcnREYXRlIjogIjIwMjEtMDYtMThUMDc6Mjc6MjguMDAwWiIsCiAgICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0UGxhbklkIjogIjExNiIsCiAgICAgICJwcm9kdWN0TnVtYmVyIjogIjciLAogICAgICAicHJvZHVjdFR5cGUiOiAicHJvZHVjdFR5cGU3IiwKICAgICAgInByb2R1Y3ROYW1lIjogIlR5cGU3IgogICAgfSwKICAgIHsKICAgICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICAgImluc2VydGVkQnkiOiAic291bXlhLmttQG1vbmRjbG91ZC5jb20iLAogICAgICAidXBkYXRlZEJ5IjogInNvdW15YS5rbUBtb25kY2xvdWQuY29tIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMThUMDY6MjI6MzEuMDAwWiIsCiAgICAgICJpbnNlcnREYXRlIjogIjIwMjEtMDYtMThUMDY6MjI6MzEuMDAwWiIsCiAgICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0UGxhbklkIjogIjExNSIsCiAgICAgICJwcm9kdWN0TnVtYmVyIjogIjYiLAogICAgICAicHJvZHVjdFR5cGUiOiAicHJvZHVjdFR5cGU2IiwKICAgICAgInByb2R1Y3ROYW1lIjogIlR5cGU2IgogICAgfSwKICAgIHsKICAgICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICAgImluc2VydGVkQnkiOiAic291bXlhLmttQG1vbmRjbG91ZC5jb20iLAogICAgICAidXBkYXRlZEJ5IjogInNvdW15YS5rbUBtb25kY2xvdWQuY29tIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMThUMDY6NTc6NTcuMDAwWiIsCiAgICAgICJpbnNlcnREYXRlIjogIjIwMjEtMDYtMThUMDY6MTY6NDcuMDAwWiIsCiAgICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0UGxhbklkIjogIjExNCIsCiAgICAgICJwcm9kdWN0TnVtYmVyIjogIjQiLAogICAgICAicHJvZHVjdFR5cGUiOiAicHJvZHVjdFR5cGU0IiwKICAgICAgInByb2R1Y3ROYW1lIjogIlR5cGU0IgogICAgfQogIF0KfQ==" }
        this.prodList = JSON.parse(atob(data.value)).productList_productSummary;
      }
    )
  }

  onClickOfCopyOfSubmit() {
    debugger;

    if (this.copyPlanNumber == "") {
      this.mdMondService.showErrorMessage("Please enter the Plan Number");
      return;
    }

    if (this.copyPlanName == "") {
      this.mdMondService.showErrorMessage("Please enter the Plan Name");
      return;
    }
    if (this.copyDate.nativeElement.value == "") {
      this.mdMondService.showErrorMessage("Please enter the Effective Date");
      return;
    }
    if (this.iscopyProduct == false) {
      if (this.copyPlanStatus == "") {
        this.mdMondService.showErrorMessage("Please select the Plan Status");
        return;
      }
    }
    let formVariables = {
      "": "Yes",
      "newPlanNumber": this.copyPlanNumber,
      "newPlanName": this.copyPlanName,
      "newEffectiveDate": this.copyDate.nativeElement.value + " 00:00:00.000",
      "planProductInfoId": this.planRowData.planProductInfoId,
      "productId": this.planRowData.productId
    }
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'CopyPlanProductInfo', JSON.stringify(formVariables), null).subscribe(
      data => {
        this.mdMondService.showSuccessMessage(JSON.parse(atob(data.value)).message);
        this.clientName = this.planRowData.clientName;
        this.productType = this.planRowData.productType;
        this.productNumber = this.planRowData.productNumber;
        this.planName = this.planRowData.planName;
        this.planStatus = this.planRowData.planStatus;
        this.onClickOfPlanSearch();
        this.copyPlan = "";
        this.clientName = "";
        this.productType = "";
        this.productNumber = "";
        this.planName = "";
        this.planStatus = "";

      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJtZXNzYWdlIjoiUmVjb3JkIENvcGllZCBTdWNjZXNzZnVsbHkiLCJzdGF0dXMiOiJTdWNjZXNzIn0\u003d" };
        this.mdMondService.showSuccessMessage(JSON.parse(atob(data.value)).message);
        this.clientName = this.planRowData.clientName;
        this.productType = this.planRowData.productType;
        this.productNumber = this.planRowData.productNumber;
        this.planName = this.planRowData.planName;
        this.planStatus = this.planRowData.planStatus;
        this.onClickOfPlanSearch();
        this.copyPlan = "";
        this.clientName = "";
        this.productType = "";
        this.productNumber = "";
        this.planName = "";
        this.planStatus = "";
      }
    )
  }

  onPlanListRowSelect(item) {
    debugger;
    this.rowSelect.emit(item);
  }

  onClikOfReset() {
    this.clientName = "";
    this.productType = "";
    this.productNumber = "";
    this.planName = "";
    this.planStatus = "";
    this.planMaintenanceList = [];

  }

}
