import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { any } from 'codelyzer/util/function';
import { Base64 } from 'js-base64';
import { MDCommonGetterSetter } from '../../_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../_services/ds';

declare var $: any;

@Component({
  selector: "app-product-maintenance-designer",
  templateUrl: './productMaintenance.html',
  styleUrls: ['./productMaintenance.css']
})

export class ProductMaintenanceComponent implements OnInit {

  selectedTab: number = 0
  productTypeListData: any = [];
  productType: string = "";
  productBusinessModel: string = '';
  productStatus: string = '';
  productMaintenanceListData: any = [{}];
  planDetailsData: any = {};
  public isShowTblRow: boolean = false;
  public isSpinnerShow: boolean = false;
  public isResizeTrue: boolean = false;
  public selectedProductTypeName: any;
  public productTypeSelect: any;
  public selectProductType: any;
  public csfrToken: any;
  public isAddPlan: boolean;
  public productPlanDetailData: any;
  public isViewPlan: boolean;
  public addPlanTabName: string;
  public planMaintenanceList: any;
  public isAddCoverage: boolean;
  public coverageList: any;
  public isViewCoverage: boolean;
  public ViewCoverageClientId: string;
  public coverageMaintenanceList: any;
  public addCoverageTabName: string;
  public coverageTypeList: any;
  public isAddCoverageBunlde: boolean;
  public planCoverageBundleList: any;
  public planCoverageBundleInformationList: any;
  public isAddRatingFactor: boolean = false;
  public rateFactorList: any;
  public addRatingFactorTabName: any;
  public isViewRatingFactor: boolean;
  public viewRatingFactorId: string;
  public ratingFactorMaintenanceList: string;
  public ratingFactorRowSelectData: any;
  public productPlanClientName: any;
  public productRowData: any;
  public copyEffectiveDate: any;
  public copyProductNumber: any;
  public copyProduct: any;

  
  @ViewChild('copyDate') copyDate: ElementRef;
  
  constructor(private mdMondService: MDMondServiceDS,
    private codeListFetch: MDCodeListHeaderDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,) { }

  ngOnInit() {
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

  }

  getProductTypeDetails(event) {
    this.selectedProductTypeName = undefined;
    this.selectProductType = "productSelect";

    if (!event.target.value) {
      return;
    }
    this.productTypeListData = []
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfProducts", JSON.stringify({ "productType": event.target.value.trim() }), "").subscribe(
      data => {
        this.productTypeListData = JSON.parse(Base64.decode(data.value)).response_response
      }, err => {
        let data = "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiJTUCIsInZhbHVlIjoiU1AifV19"
        this.productTypeListData = JSON.parse(Base64.decode(data)).response_response
      }
    )
  }

  onSelectProductType(event) {
    this.selectedProductTypeName = undefined
    this.selectedProductTypeName = event.source.value;
  }

  onChangeOfCopyProduct(rowData,event){
    debugger
    this.productRowData = rowData;
    $("input[type='checkbox'][name='copyProductName']").prop('checked', false);
    if ($(event.currentTarget).is(":checked")) {
      $(event.currentTarget).prop('checked', false);
    } else {
      $(event.currentTarget).prop('checked', true);
    }
    this.copyProduct = "copyProduct"; 
  }

  onClickOfCopyProduct(){
    debugger;
    if (this.copyProduct == "copyProduct"){
      $("#copyProductModelId").click();
      this.copyProductNumber = this.productRowData.productNumber
      this.copyEffectiveDate = this.productRowData.lastUpdateDate
      // this.productRowData.productPlanId
    }else{
      this.mdMondService.showErrorMessage("Please select the product to copy");
      return;
    }
 
  }

  onClickOfProductCopyOfSubmit(){
    debugger;
    if (this.copyProductNumber == "") {
      this.mdMondService.showErrorMessage("Please enter the Plan Number");
      return;
    }

    if (this.copyEffectiveDate == null) {
      this.mdMondService.showErrorMessage("Please enter the Effective Date");
      return;
    }

   let formVariables =  {
     "newProductNumber":this.copyProductNumber,
     "newEffectiveDate":this.copyDate.nativeElement.value + " 00:00:00.000",
     "productId":this.productRowData.productPlanId
    }
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'CopyProduct', JSON.stringify(formVariables), null).subscribe(
      data => {
        this.mdMondService.showSuccessMessage(JSON.parse(atob(data.value)).message);
        this.getProductMaintenanceList();
        this.copyProduct = "";

      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJtZXNzYWdlIjoiUmVjb3JkIENvcGllZCBTdWNjZXNzZnVsbHkiLCJzdGF0dXMiOiJTdWNjZXNzIn0\u003d" };
        this.mdMondService.showSuccessMessage(JSON.parse(atob(data.value)).message);
        this.getProductMaintenanceList();
        this.copyProduct = "";
     
      }
    )
  }

  getProductMaintenanceList() {
    debugger;
    if (this.productType != "") {
      if (this.selectProductType == "productSelect") {
        if (this.selectedProductTypeName == undefined) {
          this.mdMondService.showErrorMessage("Please select the Client Name.");
          return;
        }
      }
    }
    let formVariables = {
      "productType":this.productType,
      "":"1",
      "productBusinessModel":this.productBusinessModel,
      "productStatus":this.productStatus,
      "productList_productSummary":[]
    }
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductList", JSON.stringify(formVariables), "").subscribe(
      data => {
        this.isShowTblRow = true;
        this.productMaintenanceListData = JSON.parse(Base64.decode(data.value)).productList_productSummary;
        this.isSpinnerShow = false;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJwcm9kdWN0TGlzdF9wcm9kdWN0U3VtbWFyeSI6W3sicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMDoxMToxMC4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI4IiwicHJvZHVjdE51bWJlciI6IjAwMDgiLCJwcm9kdWN0VHlwZSI6IlNQIiwicHJvZHVjdE5hbWUiOiJTaW5nbGUgUHJlbWl1bSAtIEZPUkQgRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzIC0gMSJ9LHsicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wMy0zMFQxOToyMjowNi4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI3IiwicHJvZHVjdE51bWJlciI6IjAwMDciLCJwcm9kdWN0VHlwZSI6Ik1QIiwicHJvZHVjdE5hbWUiOiJNb250aGx5IFBheSAtQ29sbGFicmlhIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTAzLTE4VDEyOjI3OjIxLjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjYiLCJwcm9kdWN0TnVtYmVyIjoiMDA2IiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiU2luZ2xlIFByZW1pdW0gLSBGT1JEIENhcmVmcmVlIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI2VDEwOjI5OjI2LjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjUiLCJwcm9kdWN0TnVtYmVyIjoiMDA1ICIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzICJ9XX0=" }
        this.isShowTblRow = true;
        this.productMaintenanceListData = JSON.parse(Base64.decode(data.value)).productList_productSummary;
        this.isSpinnerShow = false;
      });
  }

  onClickOfReset() {
    this.productType = "";
    this.productBusinessModel = "";
    this.productStatus = "";
    this.productMaintenanceListData = [];
  }

  onProductListRowSelect(event) {
    debugger;
    this.selectedTab = 1
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "FetchProductDetails", "1.00", btoa(JSON.stringify({ "productId": event.data.productPlanId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.planDetailsData = JSON.parse(atob(data))
      },
      error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJwcm9kdWN0SW5mbyI6IHsKICAgICJwcm9kdWN0TmFtZSI6ICJUZXN0MSIsCiAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0xNVQxMTo0MjoxOC4wMDBaIiwKICAgICJwcm9kdWN0TnVtYmVyIjogIjEiLAogICAgInByb2R1Y3RUZXJtaW5hdGlvbkRhdGUiOiAiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwKICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAicHJvZHVjdEN1cnJlbnRSZWNvcmRGbGFnIjogIlkiLAogICAgIm1lbWJlckluaXRpYXRlZFRlcm1pbmF0aW9uUnVsZSI6ICJJbW1lZGlhdGUgVGVybWluYXRpb24iLAogICAgImZyZWVMb29rUGVyaW9kUmVmdW5kIjogNDAsCiAgICAicHJvZHVjdElkIjogIjExMiIsCiAgICAicHJvZHVjdEVmZmVjdGl2ZURhdGUiOiAiMjAyMS0wNi0xNFQwMDowMDowMC4wMDBaIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicHJvZHVjdFN0YXR1c0VuZERhdGUiOiAiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwKICAgICJjZXJ0aWZpY2F0ZURldGFpbEFkbWluaXN0cmF0b3IiOiAiQ1VNSVMiLAogICAgImJhY2tQcmVtaXVtQ29sbGVjdGlvblBlcmlvZCI6IDEsCiAgICAicHJvZHVjdEluVXNlIjogIlllcyIsCiAgICAiaW5zZXJ0RGF0ZSI6ICIyMDIxLTA2LTE1VDEwOjA0OjMwLjAwMFoiLAogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJjb21tZW50IjogIk5vdGVzIgogIH0KfQ==" };
        this.planDetailsData = JSON.parse(atob(data.value));
      });
  }

  onClickOfAddProduct() {
    this.planDetailsData = {}
    this.selectedTab = 1
  }

  onClickOfAddPlan(event) {
    debugger;
    this.addPlanTabName = "Product AddPlan";
    let planProductInfo = {
      "languageCode": "Please select a value",
      "defaultBillingType": "Please select a value",
      "planStatus": "Please select a value",
      "terminationOfRisk": "Please select a value",
      "permitCoverageAmountChangesPostIssuance": "Please select a value",
      "maximumApplicantAllowedQuantity": "Please select a value",
      "premiumCalculationAlgorithm": "Please select a value",
      "premiumCalculationMethod": "Please select a value",
      "premiumPaidBy": "Please select a value",
      "loanBalanceMethod": "Please select a value",
      "ageMethod": "Please select a value",
      "insurancePaymentMethod": "Please select a value",
      "loanType": "Please select a value",
      "loanTypeCategory": "Please select a value",

    }
    let addplanDetailArray = [];
    let addPlanDetailsObj = {};
    let productInfo = event.productInfo;
    addPlanDetailsObj["productInfo"] = productInfo;
    addPlanDetailsObj["planProductInfo"] = planProductInfo;
    addplanDetailArray.push(addPlanDetailsObj);
    // this.productPlanDetailData = event;
    this.productPlanDetailData = addplanDetailArray[0];
    this.selectedTab = 4;
    this.isAddPlan = true;
  }

  onClickOfViewPlan(event) {
    debugger;
    this.selectedTab = 3;
    this.isViewPlan = true;
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanProductInfoList', JSON.stringify({ "productId": event.productInfo.productId }), null).subscribe(
      data => {
        let planMaintenanceParsedData = JSON.parse(atob(data.value)).planProductList_planProductSummary;
        for (let i = 0; i < planMaintenanceParsedData.length; i++) {
          if (planMaintenanceParsedData[i].insertDate != undefined) {
            planMaintenanceParsedData[i].insertDate = planMaintenanceParsedData[i].insertDate.split('T')[0] + ' ' + planMaintenanceParsedData[i].insertDate.split('T')[1].split('Z')[0]
          }
        }
        this.planMaintenanceList = planMaintenanceParsedData;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJwbGFuUHJvZHVjdExpc3RfcGxhblByb2R1Y3RTdW1tYXJ5IjogWwogICAgewogICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICAgInByb2R1Y3RJZCI6IDExMiwKICAgICAgImNsaWVudE5hbWUiOiAiQ3JlbG9naXgiLAogICAgICAicGxhbk5hbWUiOiAiVGVzdDEgbmFtZSIsCiAgICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAgICJwbGFuTnVtYmVyIjogIlRlc3QxIgogICAgfQogIF0KfQ==" }
        let planMaintenanceParsedData = JSON.parse(atob(data.value)).planProductList_planProductSummary;
        for (let i = 0; i < planMaintenanceParsedData.length; i++) {
          if (planMaintenanceParsedData[i].insertDate != undefined) {
            planMaintenanceParsedData[i].insertDate = planMaintenanceParsedData[i].insertDate.split('T')[0] + ' ' + planMaintenanceParsedData[i].insertDate.split('T')[1].split('Z')[0]
          }
        }
        this.planMaintenanceList = planMaintenanceParsedData;
      }
    )
  }

  onSelectOfPlanRow(event) {
    debugger;
    this.isAddPlan = false;
    this.addPlanTabName = "Plan Details";
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "FetchPlanProductInfoDetails", "1.00", btoa(JSON.stringify({ "planProductInfoId": event.data.planProductInfoId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.productPlanDetailData = JSON.parse(atob(data));
        this.selectedTab = 4;
        this.isAddPlan = true;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = "eyJwbGFuUHJvZHVjdEluZm8iOnsibG9hblR5cGUiOiJGaXhlZCIsImNsaWVudE5hbWUiOiJDcmVsb2dpeCIsInByZW1pdW1QYWlkQnkiOiJQYXJ0bmVyIHBheSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0yMlQxMTo1NDoyNC4wMDBaIiwiYWdlTWV0aG9kIjoiTm90IEFwcGxpY2FibGUiLCJwbGFuTmFtZSI6IlRlc3QyX25hbWVfQ29weSIsInBsYW5TdGF0dXMiOiJBY3RpdmUiLCJwcm9wZXJJbnN1cmFuY2VUaHJlc2hvbGRBbW91bnQiOjEsImxvYW5UeXBlQ2F0ZWdvcnkiOiJSZXRhaWwiLCJtYXhpbXVtQXBwbGljYW50QWxsb3dlZFF1YW50aXR5IjoxLCJwcmVtaXVtQ2FsY3VsYXRpb25NZXRob2QiOiIxIGxpZmUiLCJyZWluc3RhdGVtZW50UGVyaW9kUXVhbnRpdHkiOjMsImluc3VyYW5jZVBheW1lbnRNZXRob2QiOiJQYXkgT25jZSIsInByZW1pdW1DYWxjdWxhdGlvbkFsZ29yaXRobSI6IlNQIiwicGVybWl0Q2VydGlmaWNhdGVDaGFuZ2VzUG9zdElzc3VhbmNlIjoiWSIsInBlcm1pdENvdmVyYWdlQW1vdW50Q2hhbmdlc1Bvc3RJc3N1YW5jZSI6IkluY3JlYXNlIG9ubHkiLCJkZWZhdWx0QmlsbGluZ1R5cGUiOiJTZWxmIEFkbWluaXN0ZXJlZCIsIm1pbmltdW1BbW9ydGl6YXRpb25QZXJpb2RRdWFudGl0eSI6NywiZ3Jvc3NVcEludGVyZXN0T25seSI6IlkiLCJwbGFuVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwibG9hbkV4dGVuc2lvbiI6IlkiLCJwcm9kdWN0VHlwZSI6IlRlc3RUeXBlIiwicmVmdW5kTWF4aW11bVBlcmlvZFF1YW50aXR5Ijo2LCJwbGFuUHJvZHVjdEluZm9JZCI6IjE5NCIsInBsYW5JblVzZSI6IlllcyIsIm1pbmltdW1UZXJtUXVhbnRpdHkiOjEsIm1heGltdW1QZXJpb2RUb0Z1dHVyZURhdGVRdWFudGl0eSI6NSwiY3VycmVudFJlY29yZEZsYWciOiJZIiwicHJvZHVjdElkIjoxMTMsImNsaWVudElkZW50aWZpZXIiOjIsImFnZ3JlZ2F0ZUV4cG9zdXJlQW1vdW50IjoyLCJwbGFuU3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImxhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJwbGFuTnVtYmVyIjoiVGVzdDJfQ29weSIsImlzQnVuZGxlZFBsYW4iOiJZIiwicGxhbkNyZWF0aW9uRGF0ZSI6IjIwMjEtMDYtMjJUMTE6NTQ6MjQuMDAwWiIsInJlZnVuZEFsbG93ZWQiOiJZIiwidGVybWluYXRpb25PZlJpc2siOiJOb3QgQXBwbGljYWJsZSIsImxvYW5CYWxhbmNlTWV0aG9kIjoiSW5pdGlhbCBCYWxhbmNlIiwicGxhbkVmZmVjdGl2ZURhdGUiOiIyMDIxLTA2LTIyVDAwOjAwOjAwLjAwMFoiLCJwbGFuRGVzY3JpcHRpb24iOiJUZXN0MSBEZXNjcmlwdGlvbiIsImNvbW1lbnQiOiJOb3RlcyIsIm1heGltdW1BbW9ydGl6YXRpb25QZXJpb2RRdWFudGl0eSI6OCwibWF4aW11bVBlcmlvZFRvQmFja0RhdGVRdWFudGl0eSI6NCwiZ3Jvc3NVcEx1bXBzdW1Db2RlIjoiWSJ9LCJwcm9kdWN0SW5mbyI6eyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwicHJvZHVjdEVmZmVjdGl2ZURhdGUiOiIyMDE3LTAyLTAxVDE4OjMwOjAwLjAwMFoiLCJwcm9kdWN0SWQiOiIxMTMiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFR5cGUiOiJUZXN0VHlwZTIiLCJwcm9kdWN0TmFtZSI6IlRlc3QyIn19";
        //  let data = "ewogICJwbGFuUHJvZHVjdEluZm8iOiB7CiAgICAibG9hblR5cGUiOiAiRml4ZWQiLAogICAgImNsaWVudE5hbWUiOiAiQ3JlbG9naXgiLAogICAgInByZW1pdW1QYWlkQnkiOiAiUGFydG5lciBwYXkiLAogICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMjJUMTE6NTQ6MjQuMDAwWiIsCiAgICAiYWdlTWV0aG9kIjogIk5vdCBBcHBsaWNhYmxlIiwKICAgICJwbGFuTmFtZSI6ICJUZXN0Ml9uYW1lX0NvcHkiLAogICAgInBsYW5TdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwcm9wZXJJbnN1cmFuY2VUaHJlc2hvbGRBbW91bnQiOiAxLAogICAgImxvYW5UeXBlQ2F0ZWdvcnkiOiAiUmV0YWlsIiwKICAgICJtYXhpbXVtQXBwbGljYW50QWxsb3dlZFF1YW50aXR5IjogMSwKICAgICJwcmVtaXVtQ2FsY3VsYXRpb25NZXRob2QiOiAiMSBsaWZlIiwKICAgICJyZWluc3RhdGVtZW50UGVyaW9kUXVhbnRpdHkiOiAzLAogICAgImluc3VyYW5jZVBheW1lbnRNZXRob2QiOiAiUGF5IE9uY2UiLAogICAgInByZW1pdW1DYWxjdWxhdGlvbkFsZ29yaXRobSI6ICJTUCIsCiAgICAicGVybWl0Q2VydGlmaWNhdGVDaGFuZ2VzUG9zdElzc3VhbmNlIjogIlkiLAogICAgInBlcm1pdENvdmVyYWdlQW1vdW50Q2hhbmdlc1Bvc3RJc3N1YW5jZSI6ICJJbmNyZWFzZSBvbmx5IiwKICAgICJkZWZhdWx0QmlsbGluZ1R5cGUiOiAiU2VsZiBBZG1pbmlzdGVyZWQiLAogICAgIm1pbmltdW1BbW9ydGl6YXRpb25QZXJpb2RRdWFudGl0eSI6IDcsCiAgICAiZ3Jvc3NVcEludGVyZXN0T25seSI6ICJZIiwKICAgICJwbGFuVGVybWluYXRpb25EYXRlIjogIjk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsCiAgICAibG9hbkV4dGVuc2lvbiI6ICJZIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicmVmdW5kTWF4aW11bVBlcmlvZFF1YW50aXR5IjogNiwKICAgICJwbGFuUHJvZHVjdEluZm9JZCI6ICIxOTQiLAogICAgInBsYW5JblVzZSI6ICJZZXMiLAogICAgIm1pbmltdW1UZXJtUXVhbnRpdHkiOiAxLAogICAgIm1heGltdW1QZXJpb2RUb0Z1dHVyZURhdGVRdWFudGl0eSI6IDUsCiAgICAiY3VycmVudFJlY29yZEZsYWciOiAiWSIsCiAgICAicHJvZHVjdElkIjogMTEzLAogICAgImNsaWVudElkZW50aWZpZXIiOiAyLAogICAgImFnZ3JlZ2F0ZUV4cG9zdXJlQW1vdW50IjogMiwKICAgICJwbGFuU3RhdHVzRW5kRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgImxhbmd1YWdlQ29kZSI6ICJFbmdsaXNoIiwKICAgICJwbGFuTnVtYmVyIjogIlRlc3QyX0NvcHkiLAogICAgImlzQnVuZGxlZFBsYW4iOiAiTiIsCiAgICAicGxhbkNyZWF0aW9uRGF0ZSI6ICIyMDIxLTA2LTIyVDExOjU0OjI0LjAwMFoiLAogICAgInJlZnVuZEFsbG93ZWQiOiAiWSIsCiAgICAidGVybWluYXRpb25PZlJpc2siOiAiTm90IEFwcGxpY2FibGUiLAogICAgImxvYW5CYWxhbmNlTWV0aG9kIjogIkluaXRpYWwgQmFsYW5jZSIsCiAgICAicGxhbkVmZmVjdGl2ZURhdGUiOiAiMjAyMS0wNi0yMlQwMDowMDowMC4wMDBaIiwKICAgICJwbGFuRGVzY3JpcHRpb24iOiAiVGVzdDEgRGVzY3JpcHRpb24iLAogICAgImNvbW1lbnQiOiAiTm90ZXMiLAogICAgIm1heGltdW1BbW9ydGl6YXRpb25QZXJpb2RRdWFudGl0eSI6IDgsCiAgICAibWF4aW11bVBlcmlvZFRvQmFja0RhdGVRdWFudGl0eSI6IDQsCiAgICAiZ3Jvc3NVcEx1bXBzdW1Db2RlIjogIlkiCiAgfSwKICAicHJvZHVjdEluZm8iOiB7CiAgICAicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiAiTWVyY2hhbnQiLAogICAgInByb2R1Y3RFZmZlY3RpdmVEYXRlIjogIjIwMTctMDItMDFUMTg6MzA6MDAuMDAwWiIsCiAgICAicHJvZHVjdElkIjogIjExMyIsCiAgICAicHJvZHVjdFN0YXR1cyI6ICJBY3RpdmUiLAogICAgInByb2R1Y3RUeXBlIjogIlRlc3RUeXBlMiIsCiAgICAicHJvZHVjdE5hbWUiOiAiVGVzdDIiCiAgfQp9";
        this.productPlanDetailData = JSON.parse(atob(data));
        this.selectedTab = 4;
        this.isAddPlan = true;

      });
  }

  onClickOfAddCoverage(event) {
    debugger;
    this.isAddCoverageBunlde = false;
    let coverageInfo = {
      "lineOfBusiness": "Please select a value",
      "coverageType": "Please select a value",
      "generalLedgerAccountNumber": "Please select a value",
      "coverageStatus": "Please select a value",
      "terminationDueToClaim": "Please select a value"
    }
    let addCovergaeDetailArray = [];
    let addCoverageDetailsObj = {};
    // let productInfo = event.productInfo;
    addCoverageDetailsObj["productInfo"] = event.productInfo;
    addCoverageDetailsObj["planProductInfo"] = event.planProductInfo;
    addCoverageDetailsObj["coverageInfo"] = coverageInfo;
    addCovergaeDetailArray.push(addCoverageDetailsObj);
    // this.planClientName = event.planProductInfo.clientName;
    this.addCoverageTabName = "Add Coverage";
    this.coverageTypeList = [];
    this.coverageList = addCovergaeDetailArray[0];
    this.selectedTab = 6;
    this.isAddCoverage = true;
  }

  onClickOfViewCoverage(event) {
    debugger
    this.productPlanClientName = event.planProductInfo.clientName;
    this.isViewCoverage = true;
    this.selectedTab = 5;
    this.ViewCoverageClientId = event.planProductInfo.clientIdentifier;
    let formVariable = { "planProductInfoId": event.planProductInfo.planProductInfoId }
    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanCoverageList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.coverageMaintenanceList = JSON.parse(atob(data.value)).planCoverageList_coverageSummary
      },
      error => {
        debugger;
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "eyJwbGFuQ292ZXJhZ2VMaXN0X2NvdmVyYWdlU3VtbWFyeSI6W3sibGluZU9mQnVzaW5lc3MiOiI5MDEiLCJjb3ZlcmFnZVR5cGUiOiJDUkVMSSIsInBsYW5Db3ZlcmFnZUluZm9JZCI6IjU4MyIsImNvdmVyYWdlQ29kZSI6IkxJIiwicGxhbk51bWJlciI6IlBsYW4gTnVtYmVyXzgiLCJjb3ZlcmFnZVN0YXR1cyI6IkFjdGl2ZSJ9XX0\u003d" }
        this.coverageMaintenanceList = JSON.parse(atob(data.value)).planCoverageList_coverageSummary
      }
    )
  }



  onSelectOfCoverageRow(event) {
    debugger;
    this.isAddCoverage = false;
    this.isAddCoverageBunlde = false;
    this.addCoverageTabName = "Coverage Details";
    this.productPlanClientName = this.productPlanClientName;
    // this.coverageList = event;
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "FetchPlanCoverageDetails", "1.00", btoa(JSON.stringify({ "planCoverageInfoId": event.data.planCoverageInfoId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.coverageList = JSON.parse(atob(data));
        // //to retrive Coverage Type
        let formVariable = {
          "clientId": this.coverageList.planProductInfo.clientIdentifier,
          "lineOfBusiness": event.data.lineOfBusiness
        }

        this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
          data => {
            let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
            let coverageTypeArray = [];
            let coverageTypeObj = {};
            coverageTypeObj["coverageType"] = "Please select a value";
            coverageTypeArray.push(coverageTypeObj);
            for (let i = 0; i < parsedData.length; i++) {
              coverageTypeArray.push(parsedData[i]);
            }
            this.coverageTypeList = coverageTypeArray;
            this.selectedTab = 6;
            this.isAddCoverage = true;

          }, error => {
            this.mdMondService.MDError(error);
          })

      },
      error => {
        this.mdMondService.MDError(error);
        // let data = "ewogICJwbGFuUHJvZHVjdEluZm8iOiB7CiAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICJwcm9kdWN0SWQiOiAxMTIsCiAgICAiY2xpZW50SWRlbnRpZmllciI6IDIsCiAgICAicGxhbkVmZmVjdGl2ZURhdGUiOiAiMjAyMC0wOS0wM1QwMDowMDowMC4wMDBaIiwKICAgICJwbGFuTmFtZSI6ICJUZXN0MSBuYW1lIiwKICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAicGxhbk51bWJlciI6ICJUZXN0MSIsCgkiY2xpZW50TmFtZSI6InJlbG9naXgiCiAgfSwKICAiY292ZXJhZ2VJbmZvIjogewogICAgImxpbmVPZkJ1c2luZXNzIjogIjkwMSIsCiAgICAiZ2VuZXJhbExlZGdlckFjY291bnROdW1iZXIiOiAiMTAwMDUwMCIsCiAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0yNFQxMDoyMDozNC4wMDBaIiwKICAgICJtYXhpbXVtQmVuZWZpdEFtb3VudCI6IDEsCiAgICAibG93ZXJNYXhpbXVtQ292ZXJhZ2VBbW91bnQiOiAiWSIsCiAgICAiY292ZXJhZ2VJblVzZSI6ICJZZXMiLAogICAgIm1heGltdW1Nb250aGx5QmVuZWZpdEFtb3VudCI6IDEsCiAgICAiY292ZXJhZ2VTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJtaW5pbXVtUHJlbWl1bSI6IDEsCiAgICAibm9uRXZpZGVuY2VNYXhpbXVtQW1vdW50IjogMSwKICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTgyIiwKICAgICJjb3ZlcmFnZVN0YXR1c0VuZERhdGUiOiAiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwKICAgICJsb3dlck1heGltdW1Db3ZlcmFnZUFtb3VudEJhc2VkQWdlIjogMSwKICAgICJtYXhpbXVtQ292ZXJhZ2VBbW91bnQiOiAxLAogICAgIm1pbmltdW1BZ2VMb3dlckNvdmVyYWdlQW1vdW50IjogMSwKICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiLAogICAgImN1cnAiOiAxLAogICAgInBsYW5Qcm9kdWN0SW5mb0lkIjogIjE5MSIsCiAgICAiY3VycmVudFJlY29yZEZsYWciOiAiWSIsCiAgICAibWF4aW11bUluc3VyYWJsZUxvYW5QZXJpb2RSZXNpZHVhbFZhbHVlIjogMSwKICAgICJsb3NzT2ZFbXBsb3ltZW50Q29udGludW91c1dvcmtQZXJpb2QiOiAxLAogICAgImNvdmVyYWdlVGVybWluYXRpb25BZ2UiOiAxLAogICAgImNvdmVyYWdlRWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTI0VDAwOjAwOjAwLjAwMFoiLAogICAgInJpZGVyQmVuZWZpdCI6ICJZIiwKICAgICJjb3ZlcmFnZVRlcm1pbmF0aW9uRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgInBsYW5OdW1iZXIiOiAiVGVzdDEiLAogICAgIm1heGltdW1Nb250aGx5Q2xhaW1CZW5lZml0QW1vdW50IjogMSwKICAgICJlbGlnaWJpbGl0eUhvdXJzQW1vdW50IjogMSwKICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgInRlcm1pbmF0aW9uRHVlVG9DbGFpbSI6ICJObyBUZXJtaW5hdGlvbiIsCiAgICAibWF4aW11bUNsYWltQmVuZWZpdFRlcm0iOiAxLAogICAgIm1pbmltdW1Jc3N1ZUFnZSI6IDEsCiAgICAibWF4aW11bUlzc3VlQWdlIjogMSwKICAgICJtaW5pbXVtQ292ZXJhZ2VBbXQiOiAxLAogICAgImNvbW1lbnQiOiAiVGVzdEFkZENvdmVyYWdlIiwKICAgICJtYXhpbXVtSW5zdXJhYmxlTG9hblBlcmlvZFJlZ3VsYXIiOiAxLAogICAgImNlcnRpZmljYXRlRmVlIjogMQogIH0sCiAgInByb2R1Y3RJbmZvIjogewogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJwcm9kdWN0RWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTE0VDAwOjAwOjAwLjAwMFoiLAogICAgInByb2R1Y3RJZCI6ICIxMTIiLAogICAgInByb2R1Y3RTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicHJvZHVjdE5hbWUiOiAiVGVzdDEiCiAgfQp9"
        let data = "ewogICJwbGFuUHJvZHVjdEluZm8iOiB7CiAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICJwcm9kdWN0SWQiOiAxMTIsCiAgICAiY2xpZW50SWRlbnRpZmllciI6IDIsCiAgICAicGxhbkVmZmVjdGl2ZURhdGUiOiAiMjAyMC0wOS0wM1QwMDowMDowMC4wMDBaIiwKICAgICJwbGFuTmFtZSI6ICJUZXN0MSBuYW1lIiwKICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAicGxhbk51bWJlciI6ICJUZXN0MSIKICB9LAogICJjb3ZlcmFnZUluZm8iOiB7CiAgICAibGluZU9mQnVzaW5lc3MiOiAiOTAxIiwKICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDIxLTA2LTI0VDEwOjIwOjM0LjAwMFoiLAogICAgIm1heGltdW1CZW5lZml0QW1vdW50IjogMSwKICAgICJsb3dlck1heGltdW1Db3ZlcmFnZUFtb3VudCI6ICJZIiwKICAgICJjb3ZlcmFnZUluVXNlIjogIlllcyIsCiAgICAibWF4aW11bU1vbnRobHlCZW5lZml0QW1vdW50IjogMSwKICAgICJjb3ZlcmFnZVN0YXR1cyI6ICJBY3RpdmUiLAogICAgIm1pbmltdW1QcmVtaXVtIjogMSwKICAgICJub25FdmlkZW5jZU1heGltdW1BbW91bnQiOiAxLAogICAgInBsYW5Db3ZlcmFnZUluZm9JZCI6ICI1ODIiLAogICAgImNvdmVyYWdlU3RhdHVzRW5kRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgImxvd2VyTWF4aW11bUNvdmVyYWdlQW1vdW50QmFzZWRBZ2UiOiAxLAogICAgIm1heGltdW1Db3ZlcmFnZUFtb3VudCI6IDEsCiAgICAibWluaW11bUFnZUxvd2VyQ292ZXJhZ2VBbW91bnQiOiAxLAogICAgImNvdmVyYWdlQ29kZSI6ICJMSSIsCiAgICAiY3VycCI6IDEsCiAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICJjdXJyZW50UmVjb3JkRmxhZyI6ICJZIiwKICAgICJtYXhpbXVtSW5zdXJhYmxlTG9hblBlcmlvZFJlc2lkdWFsVmFsdWUiOiAxLAogICAgImxvc3NPZkVtcGxveW1lbnRDb250aW51b3VzV29ya1BlcmlvZCI6IDEsCiAgICAiY292ZXJhZ2VUZXJtaW5hdGlvbkFnZSI6IDEsCiAgICAiY292ZXJhZ2VFZmZlY3RpdmVEYXRlIjogIjIwMjEtMDYtMjRUMDA6MDA6MDAuMDAwWiIsCiAgICAicmlkZXJCZW5lZml0IjogIlkiLAogICAgImNvdmVyYWdlVGVybWluYXRpb25EYXRlIjogIjk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsCiAgICAicGxhbk51bWJlciI6ICJUZXN0MSIsCiAgICAibWF4aW11bU1vbnRobHlDbGFpbUJlbmVmaXRBbW91bnQiOiAxLAogICAgImVsaWdpYmlsaXR5SG91cnNBbW91bnQiOiAxLAogICAgImNvdmVyYWdlVHlwZSI6ICJDUkVMSSIsCiAgICAibWF4aW11bUNsYWltQmVuZWZpdFRlcm0iOiAxLAogICAgIm1pbmltdW1Jc3N1ZUFnZSI6IDEsCiAgICAibWF4aW11bUlzc3VlQWdlIjogMSwKICAgICJtaW5pbXVtQ292ZXJhZ2VBbXQiOiAxLAogICAgImNvbW1lbnQiOiAiVGVzdEFkZENvdmVyYWdlIiwKICAgICJtYXhpbXVtSW5zdXJhYmxlTG9hblBlcmlvZFJlZ3VsYXIiOiAxLAogICAgImNlcnRpZmljYXRlRmVlIjogMQogIH0sCiAgInByb2R1Y3RJbmZvIjogewogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJwcm9kdWN0RWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTE0VDAwOjAwOjAwLjAwMFoiLAogICAgInByb2R1Y3RJZCI6ICIxMTIiLAogICAgInByb2R1Y3RTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicHJvZHVjdE5hbWUiOiAiVGVzdDEiCiAgfQp9";
        this.coverageList = JSON.parse(atob(data));

        // //to retrive Coverage Type
        let formVariable = {
          "clientId": this.coverageList.planProductInfo.clientIdentifier,
          "lineOfBusiness": event.data.lineOfBusiness
        }

        this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
          data => {
          }, error => {
            this.mdMondService.MDError(error);
            let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVR5cGVMaXN0X2NvdmVyYWdlTG9va1VwIjogWwogICAgewogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIKICAgIH0sCgl7CiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFREkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgfQogIF0KfQ==" };
            let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
            let coverageTypeArray = [];
            let coverageTypeObj = {};
            coverageTypeObj["coverageType"] = "Please select a value";
            coverageTypeArray.push(coverageTypeObj);
            for (let i = 0; i < parsedData.length; i++) {
              coverageTypeArray.push(parsedData[i]);
            }
            this.coverageTypeList = coverageTypeArray;
            this.selectedTab = 6;
            this.isAddCoverage = true;
          })
      });
  }

  onClickOfCoverageBundle(event) {
    debugger;
    this.isAddCoverageBunlde = false;
    this.planCoverageBundleList = event;
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "fetchPlanCoverageBundleInfo", "1.00", btoa(JSON.stringify({ "planProductInfoId": event.planProductInfo.planProductInfoId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.planCoverageBundleInformationList = JSON.parse(atob(data));
        this.selectedTab = 7;
        this.isAddCoverageBunlde = true;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = "ewogICJwbGFuQ292ZXJhZ2VCdW5kbGVJbmZvIjogewogICAgInBsYW5Db3ZlcmFnZUJ1bmRsZUluZm8iOiBbCiAgICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkyIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgICB9LAoJICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkzIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkxJIgogICAgICB9LAoJICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTk0IiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkpJIgogICAgICB9CiAgICBdCiAgfQp9";
        //  let data = "ewogICJwbGFuQ292ZXJhZ2VCdW5kbGVJbmZvIjogewogICAgInBsYW5Db3ZlcmFnZUJ1bmRsZUluZm8iOiBbCiAgICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkyIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgICB9LAoJICAgewogICAgICAgICJwbGFuUHJvZHVjdEluZm9JZCI6ICIxOTMiLAogICAgICAgICJwcmVtaXVtU3BsaXRQZXJjZW50YWdlIjogMTAwLAogICAgICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiCiAgICAgIH0sCgkgICB7CiAgICAgICAgInBsYW5Qcm9kdWN0SW5mb0lkIjogIjE5NCIsCiAgICAgICAgInByZW1pdW1TcGxpdFBlcmNlbnRhZ2UiOiAxMDAsCiAgICAgICAgImNvdmVyYWdlQ29kZSI6ICJKSSIKICAgICAgfQogICAgXQogIH0KfQ==";
        this.planCoverageBundleInformationList = JSON.parse(atob(data));
        this.selectedTab = 7;
        this.isAddCoverageBunlde = true;
      });
  }

  onClickOfAddRatingFactor(event) {
    debugger;
    this.isAddRatingFactor = false;
    let coverageRatingFactorInfo = {
      "ratingFactorStatus": "",
      "ageTableQualifier": "",
      "disabilityTableQualifier": "",
      "eliminationPeriod": "",
      "preExistingConditionValuePayOnce": "",
      "compensationPayableOption": ""
    }
    let addCoverageFactorDetailArray = [];
    let addCoverageFactorDetailsObj = {};
    addCoverageFactorDetailsObj["productInfo"] = event.productInfo;
    addCoverageFactorDetailsObj["planProductInfo"] = event.planProductInfo;
    addCoverageFactorDetailsObj["coverageInfo"] = event.coverageInfo;
    addCoverageFactorDetailsObj["coverageRatingFactorInfo"] = coverageRatingFactorInfo;
    addCoverageFactorDetailArray.push(addCoverageFactorDetailsObj);
    this.addRatingFactorTabName = "Add Rating Factor";
    this.ratingFactorRowSelectData = {};
    this.rateFactorList = addCoverageFactorDetailArray[0];
    let formVariable = {
      "clientId": event.planProductInfo.clientIdentifier,
      "lineOfBusiness": event.coverageInfo.lineOfBusiness
    }

    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.coverageTypeList = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
      }, error => {
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVR5cGVMaXN0X2NvdmVyYWdlTG9va1VwIjogWwogICAgewogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIKICAgIH0sCgl7CiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFREkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgfQogIF0KfQ==" };
        this.coverageTypeList = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
      })
    this.selectedTab = 9;
    this.isAddRatingFactor = true;

  }

  onClickOfViewRatingFactor(event) {
    debugger;
    this.isViewRatingFactor = false;
    this.productPlanClientName = event.planProductInfo.clientName;
    this.viewRatingFactorId = event.planProductInfo.clientIdentifier;
    let formVariable = { "planCoverageInfoId": event.coverageInfo.planCoverageInfoId }

    this.mdMondService.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageRatingFactorList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.ratingFactorMaintenanceList = JSON.parse(atob(data.value)).coverageRatingFactorList_coverageRatingSummary
        this.selectedTab = 8;
        this.isViewRatingFactor = true;
      },
      error => {
        debugger;
        this.mdMondService.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVJhdGluZ0ZhY3Rvckxpc3RfY292ZXJhZ2VSYXRpbmdTdW1tYXJ5IjogWwogICAgewogICAgICAicmF0aW5nRmFjdG9yU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgICAicHJvZHVjdENvdmVyYWdlRmFjdG9ySWQiOiAiNTgzIiwKICAgICAgInBsYW5OdW1iZXIiOiAiUGxhbiBOdW1iZXJfOCIKICAgIH0KICBdCn0=" }
        this.ratingFactorMaintenanceList = JSON.parse(atob(data.value)).coverageRatingFactorList_coverageRatingSummary
        this.selectedTab = 8;
        this.isViewRatingFactor = true;
      })
  }

  onRatingFactorRowSelect(event) {
    debugger;
    this.isAddRatingFactor = false;
    this.productPlanClientName = this.productPlanClientName;
    this.addRatingFactorTabName = "Rating Factor Details";
    this.rateFactorList = {};

    // this.coverageList = event;
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "FetchCoverageRatingFactorDetails", "1.00", btoa(JSON.stringify({ "coverageRatingFactorId": event.data.productCoverageFactorId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.ratingFactorRowSelectData = JSON.parse(atob(data));
        this.selectedTab = 9;
        this.isAddRatingFactor = true;
      },
      error => {
        debugger
        this.mdMondService.MDError(error);
        let data = "eyJwbGFuUHJvZHVjdEluZm8iOnsicGxhblByb2R1Y3RJbmZvSWQiOiIxOTUiLCJwcm9kdWN0SWQiOjExNywiY2xpZW50SWRlbnRpZmllciI6MiwicGxhbkVmZmVjdGl2ZURhdGUiOiIyMDIxLTA1LTEzVDAwOjAwOjAwLjAwMFoiLCJwbGFuTmFtZSI6InBsYW4gTmFtZV9UZXN0OF92OCIsInBsYW5TdGF0dXMiOiJBY3RpdmUiLCJwbGFuTnVtYmVyIjoiUGxhbiBOdW1iZXJfOCJ9LCJjb3ZlcmFnZUluZm8iOnsicGxhblByb2R1Y3RJbmZvSWQiOiIxOTUiLCJsaW5lT2ZCdXNpbmVzcyI6IjkwMSIsImNvdmVyYWdlVHlwZSI6IkNSRUxJIiwicGxhbkNvdmVyYWdlSW5mb0lkIjoiNTgzIiwiY292ZXJhZ2VFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNi0xMVQwMDowMDowMC4wMDBaIiwiY292ZXJhZ2VTdGF0dXMiOiJBY3RpdmUifSwiY292ZXJhZ2VSYXRpbmdGYWN0b3JJbmZvIjp7ImVsaW1pbmF0aW9uUGVyaW9kIjoiMTROUiIsImNvbXBlbnNhdGlvblJlZnVuZGFibGVBbW91bnQiOjUsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNy0wN1QwNDoyMDo0Ni4wMDBaIiwiYWdlVGFibGVRdWFsaWZpZXIiOiJBZ2dyZWdhdGUiLCJyYXRpbmdGYWN0b3JUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjb3ZlcmFnZUlkZW50aWZpZXJJbkNvdmVyYWdlUmF0aW5nIjo1ODMsImFjY2VsZXJhdGVkRGVhdGhCZW5lZml0Q29kZSI6IlkiLCJjb21wZW5zYXRpb25QYXlhYmxlT3B0aW9uIjoiYW1vdW50IiwiY292ZXJhZ2VSYXRpbmdGYWN0b3JJZCI6NTc4LCJjb21wZW5zYXRpb25QYXlhYmxlRmFjdG9yUGVyY2VudGFnZSI6MSwiY29tcGVuc2F0aW9uUGF5YWJsZVBlcmNlbnRhZ2UiOjYsImNvdmVyYWdldHlwZUluQ292ZXJhZ2VSYXRpbmciOiJDUkVMSSIsInByZUV4aXN0aW5nQ29uZGl0aW9uVmFsdWVQYXlPbmNlIjoiMTIvMTIiLCJjb21wZW5zYXRpb25BbW91bnRSZWZ1bmRhYmxlRmxhZyI6IlkiLCJjdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJsb2FuVGhyZXNob2xkVmFsdWUiOjEsInBsYW5OdW1iZXJJbkNvdmVyYWdlUmF0aW5nIjoiUGxhbiBOdW1iZXJfOCIsInJhdGluZ0ZhY3RvclN0YXR1c0VuZERhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJwbGFuSWRlbnRpZmllckluQ292ZXJhZ2VSYXRpbmciOjE5NSwiZGlzYWJpbGl0eVRhYmxlUXVhbGlmaWVyIjoiTi9BIiwicmF0aW5nRmFjdG9yU3RhdHVzIjoiQWN0aXZlIiwicmF0aW5nRmFjdG9yRWZmZWN0aXZlRGF0ZSI6IjIwMjEtMDQtMTVUMDA6MDA6MDAuMDAwWiIsInJhdGluZ0ZhY3RvckluVXNlIjoiWWVzIiwiY29tcGVuc2F0aW9uTm9uUmVmdW5kYWJsZUFtb3VudCI6MSwiY29tbWVudCI6Ik5vdGVzIn0sInByb2R1Y3RJbmZvIjp7InByb2R1Y3RCdXNpbmVzc01vZGVsIjoiTWVyY2hhbnQiLCJwcm9kdWN0RWZmZWN0aXZlRGF0ZSI6IjIwMjEtMDQtMDFUMTg6MzA6MDAuMDAwWiIsInByb2R1Y3RJZCI6IjExNyIsInByb2R1Y3RTdGF0dXMiOiJBY3RpdmUiLCJwcm9kdWN0VHlwZSI6InByb2R1Y3RUeXBlOCIsInByb2R1Y3ROYW1lIjoiVHlwZTgifX0\u003d";
        // let data = "ewogICJwbGFuUHJvZHVjdEluZm8iOiB7CiAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTk1IiwKICAgICJwcm9kdWN0SWQiOiAxMTcsCiAgICAiY2xpZW50SWRlbnRpZmllciI6IDIsCiAgICAicGxhbkVmZmVjdGl2ZURhdGUiOiAiMjAyMS0wNS0xM1QwMDowMDowMC4wMDBaIiwKICAgICJwbGFuTmFtZSI6ICJwbGFuIE5hbWVfVGVzdDhfdjgiLAogICAgInBsYW5TdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwbGFuTnVtYmVyIjogIlBsYW4gTnVtYmVyXzgiCiAgfSwKICAiY292ZXJhZ2VJbmZvIjogewogICAgInBsYW5Qcm9kdWN0SW5mb0lkIjogIjE5NSIsCiAgICAibGluZU9mQnVzaW5lc3MiOiAiOTAxIiwKICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgInBsYW5Db3ZlcmFnZUluZm9JZCI6ICI1ODMiLAogICAgImNvdmVyYWdlRWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTExVDAwOjAwOjAwLjAwMFoiLAogICAgImNvdmVyYWdlU3RhdHVzIjogIkFjdGl2ZSIKICB9LAogICJjb3ZlcmFnZVJhdGluZ0ZhY3RvckluZm8iOiB7CiAgICAiZWxpbWluYXRpb25QZXJpb2QiOiAiMTROUiIsCiAgICAiY29tcGVuc2F0aW9uUmVmdW5kYWJsZUFtb3VudCI6IDUsCiAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNy0wN1QwNDoyMDo0Ni4wMDBaIiwKICAgICJhZ2VUYWJsZVF1YWxpZmllciI6ICJBZ2dyZWdhdGUiLAogICAgInJhdGluZ0ZhY3RvclRlcm1pbmF0aW9uRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgImNvdmVyYWdlSWRlbnRpZmllckluQ292ZXJhZ2VSYXRpbmciOiA1ODMsCiAgICAiYWNjZWxlcmF0ZWREZWF0aEJlbmVmaXRDb2RlIjogIk4iLAogICAgImNvbXBlbnNhdGlvblBheWFibGVPcHRpb24iOiAiYW1vdW50IiwKICAgICJjb3ZlcmFnZVJhdGluZ0ZhY3RvcklkIjogNTc4LAogICAgImNvbXBlbnNhdGlvblBheWFibGVGYWN0b3JQZXJjZW50YWdlIjogMSwKICAgICJjb21wZW5zYXRpb25QYXlhYmxlUGVyY2VudGFnZSI6IDYsCiAgICAiY292ZXJhZ2V0eXBlSW5Db3ZlcmFnZVJhdGluZyI6ICJDUkVMSSIsCiAgICAicHJlRXhpc3RpbmdDb25kaXRpb25WYWx1ZVBheU9uY2UiOiAiMTIvMTIiLAogICAgImNvbXBlbnNhdGlvbkFtb3VudFJlZnVuZGFibGVGbGFnIjogIk4iLAogICAgImN1cnJlbnRSZWNvcmRGbGFnIjogIlkiLAogICAgImxvYW5UaHJlc2hvbGRWYWx1ZSI6IDEsCiAgICAicGxhbk51bWJlckluQ292ZXJhZ2VSYXRpbmciOiAiUGxhbiBOdW1iZXJfOCIsCiAgICAicmF0aW5nRmFjdG9yU3RhdHVzRW5kRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgInBsYW5JZGVudGlmaWVySW5Db3ZlcmFnZVJhdGluZyI6IDE5NSwKICAgICJkaXNhYmlsaXR5VGFibGVRdWFsaWZpZXIiOiAiTi9BIiwKICAgICJyYXRpbmdGYWN0b3JTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJyYXRpbmdGYWN0b3JFZmZlY3RpdmVEYXRlIjogIjIwMjEtMDQtMTVUMDA6MDA6MDAuMDAwWiIsCiAgICAicmF0aW5nRmFjdG9ySW5Vc2UiOiAiWWVzIiwKICAgICJjb21wZW5zYXRpb25Ob25SZWZ1bmRhYmxlQW1vdW50IjogMSwKICAgICJjb21tZW50IjogIk5vdGVzIgogIH0sCiAgInByb2R1Y3RJbmZvIjogewogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJwcm9kdWN0RWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA0LTAxVDE4OjMwOjAwLjAwMFoiLAogICAgInByb2R1Y3RJZCI6ICIxMTciLAogICAgInByb2R1Y3RTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwcm9kdWN0VHlwZSI6ICJwcm9kdWN0VHlwZTgiLAogICAgInByb2R1Y3ROYW1lIjogIlR5cGU4IgogIH0KfQ==";
        this.ratingFactorRowSelectData = JSON.parse(atob(data));
        this.selectedTab = 9;
        this.isAddRatingFactor = true;
      });
  }


  @HostListener('click', ['$event.target'])
  onClick(element) {
    // debugger;
    if (element.textContent == "Product Details" || element.textContent == "Product Search" || element.textContent == "Validation CheckList") {
      this.isAddPlan = false;
    }
    if (element.textContent == "Plan Details") {
      this.isAddCoverage = false;
    }

    if (element.textContent == "Coverage Details") {
      this.isAddRatingFactor = false;
    }

    // if (element.textContent == "Coverage Search") {
    //   this.isAddCoverage = false;
    // }
  }


}
