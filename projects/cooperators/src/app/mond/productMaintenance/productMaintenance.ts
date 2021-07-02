import { Component, HostListener, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
import { MDCommonGetterSetter } from '../../_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../_services/ds'

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
 public coverageTypeList:any;

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
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductList", JSON.stringify({ "productType": this.productType, "productBusinessModel": this.productBusinessModel, "productStatus": this.productStatus }), "").subscribe(
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
        this.planMaintenanceList  = planMaintenanceParsedData;
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
        this.planMaintenanceList  = planMaintenanceParsedData;
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
        this.productPlanDetailData = JSON.parse(atob(data));
        this.selectedTab = 4;
        this.isAddPlan = true;

      });
  }

  onClickOfAddCoverage(event) {
    debugger;
    let coverageInfo ={
      "lineOfBusiness":"Please select a value",
      "coverageType":"Please select a value",
      "generalLedgerAccountNumber":"Please select a value",
      "coverageStatus":"Please select a value",
      "terminationDueToClaim":"Please select a value"
    }
    let addCovergaeDetailArray = [];
    let addCoverageDetailsObj = {};
    // let productInfo = event.productInfo;
    addCoverageDetailsObj["productInfo"] = event.productInfo;
    addCoverageDetailsObj["planProductInfo"] = event.planProductInfo;
    addCoverageDetailsObj["coverageInfo"] =  coverageInfo;
    addCovergaeDetailArray.push(addCoverageDetailsObj);
    this.addCoverageTabName = "Add Coverage";
    this.coverageTypeList = [];
    this.coverageList = addCovergaeDetailArray[0];
    this.selectedTab = 6;
    this.isAddCoverage = true;
  }

  onClickOfViewCoverage(event) {
    debugger
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

  onClickOfCoverageBundle(event){
    debugger;
  }

  onSelectOfCoverageRow(event) {
    debugger;
    this.isAddCoverage = false;
    this.addCoverageTabName = "Coverage Details";
    
    // this.coverageList = event;
    this.mdMondService.invokeMondServiceGET("Creditor Self Admin", "FetchPlanCoverageDetails", "1.00", btoa(JSON.stringify({ "planCoverageInfoId":event.data.planCoverageInfoId })), this.csfrToken, true, true, true, true).subscribe(
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

      }, error => {
        this.mdMondService.MDError(error);       
      })
      this.selectedTab = 6;
      this.isAddCoverage = true;
      },
      error => {
        this.mdMondService.MDError(error);
       let data = "ewogICJwbGFuUHJvZHVjdEluZm8iOiB7CiAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkxIiwKICAgICJwcm9kdWN0SWQiOiAxMTIsCiAgICAiY2xpZW50SWRlbnRpZmllciI6IDIsCiAgICAicGxhbkVmZmVjdGl2ZURhdGUiOiAiMjAyMC0wOS0wM1QwMDowMDowMC4wMDBaIiwKICAgICJwbGFuTmFtZSI6ICJUZXN0MSBuYW1lIiwKICAgICJwbGFuU3RhdHVzIjogIkFjdGl2ZSIsCiAgICAicGxhbk51bWJlciI6ICJUZXN0MSIsCgkiY2xpZW50TmFtZSI6InJlbG9naXgiCiAgfSwKICAiY292ZXJhZ2VJbmZvIjogewogICAgImxpbmVPZkJ1c2luZXNzIjogIjkwMSIsCiAgICAiZ2VuZXJhbExlZGdlckFjY291bnROdW1iZXIiOiAiMTAwMDUwMCIsCiAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0yNFQxMDoyMDozNC4wMDBaIiwKICAgICJtYXhpbXVtQmVuZWZpdEFtb3VudCI6IDEsCiAgICAibG93ZXJNYXhpbXVtQ292ZXJhZ2VBbW91bnQiOiAiWSIsCiAgICAiY292ZXJhZ2VJblVzZSI6ICJZZXMiLAogICAgIm1heGltdW1Nb250aGx5QmVuZWZpdEFtb3VudCI6IDEsCiAgICAiY292ZXJhZ2VTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJtaW5pbXVtUHJlbWl1bSI6IDEsCiAgICAibm9uRXZpZGVuY2VNYXhpbXVtQW1vdW50IjogMSwKICAgICJwbGFuQ292ZXJhZ2VJbmZvSWQiOiAiNTgyIiwKICAgICJjb3ZlcmFnZVN0YXR1c0VuZERhdGUiOiAiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwKICAgICJsb3dlck1heGltdW1Db3ZlcmFnZUFtb3VudEJhc2VkQWdlIjogMSwKICAgICJtYXhpbXVtQ292ZXJhZ2VBbW91bnQiOiAxLAogICAgIm1pbmltdW1BZ2VMb3dlckNvdmVyYWdlQW1vdW50IjogMSwKICAgICJjb3ZlcmFnZUNvZGUiOiAiTEkiLAogICAgImN1cnAiOiAxLAogICAgInBsYW5Qcm9kdWN0SW5mb0lkIjogIjE5MSIsCiAgICAiY3VycmVudFJlY29yZEZsYWciOiAiWSIsCiAgICAibWF4aW11bUluc3VyYWJsZUxvYW5QZXJpb2RSZXNpZHVhbFZhbHVlIjogMSwKICAgICJsb3NzT2ZFbXBsb3ltZW50Q29udGludW91c1dvcmtQZXJpb2QiOiAxLAogICAgImNvdmVyYWdlVGVybWluYXRpb25BZ2UiOiAxLAogICAgImNvdmVyYWdlRWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTI0VDAwOjAwOjAwLjAwMFoiLAogICAgInJpZGVyQmVuZWZpdCI6ICJZIiwKICAgICJjb3ZlcmFnZVRlcm1pbmF0aW9uRGF0ZSI6ICI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLAogICAgInBsYW5OdW1iZXIiOiAiVGVzdDEiLAogICAgIm1heGltdW1Nb250aGx5Q2xhaW1CZW5lZml0QW1vdW50IjogMSwKICAgICJlbGlnaWJpbGl0eUhvdXJzQW1vdW50IjogMSwKICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFTEkiLAogICAgInRlcm1pbmF0aW9uRHVlVG9DbGFpbSI6ICJObyBUZXJtaW5hdGlvbiIsCiAgICAibWF4aW11bUNsYWltQmVuZWZpdFRlcm0iOiAxLAogICAgIm1pbmltdW1Jc3N1ZUFnZSI6IDEsCiAgICAibWF4aW11bUlzc3VlQWdlIjogMSwKICAgICJtaW5pbXVtQ292ZXJhZ2VBbXQiOiAxLAogICAgImNvbW1lbnQiOiAiVGVzdEFkZENvdmVyYWdlIiwKICAgICJtYXhpbXVtSW5zdXJhYmxlTG9hblBlcmlvZFJlZ3VsYXIiOiAxLAogICAgImNlcnRpZmljYXRlRmVlIjogMQogIH0sCiAgInByb2R1Y3RJbmZvIjogewogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJwcm9kdWN0RWZmZWN0aXZlRGF0ZSI6ICIyMDIxLTA2LTE0VDAwOjAwOjAwLjAwMFoiLAogICAgInByb2R1Y3RJZCI6ICIxMTIiLAogICAgInByb2R1Y3RTdGF0dXMiOiAiQWN0aXZlIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicHJvZHVjdE5hbWUiOiAiVGVzdDEiCiAgfQp9"
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
      })
        this.selectedTab = 6;
        this.isAddCoverage = true;

      });
  }

  @HostListener('click', ['$event.target'])
  onClick(element) {
    // debugger;
    if (element.textContent == "Product Details" || element.textContent == "Product Search" || element.textContent == "Validation CheckList") {
      this.isAddPlan = false;
    }
    if(element.textContent == "Plan Details"){
      this.isAddCoverage = false;
    }
  }


}
