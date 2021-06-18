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
    // this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductDetails", JSON.stringify({ "productId": event.data.productPlanId }), "").subscribe(
    //   data => {
    //     // this.responseData = JSON.parse(Base64.decode(data.value));
    //     this.planDetailsData = JSON.parse(Base64.decode(data.value))
    //   },
    //   error => {
    //     let data = {"key":"key","value":"ewogICJwcm9kdWN0SW5mbyI6IHsKICAgICJwcm9kdWN0TmFtZSI6ICJUZXN0MSIsCiAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0xNVQxMTo0MjoxOC4wMDBaIiwKICAgICJwcm9kdWN0TnVtYmVyIjogIjEiLAogICAgInByb2R1Y3RUZXJtaW5hdGlvbkRhdGUiOiAiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwKICAgICJwcm9kdWN0U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAicHJvZHVjdEN1cnJlbnRSZWNvcmRGbGFnIjogIlkiLAogICAgIm1lbWJlckluaXRpYXRlZFRlcm1pbmF0aW9uUnVsZSI6ICJJbW1lZGlhdGUgVGVybWluYXRpb24iLAogICAgImZyZWVMb29rUGVyaW9kUmVmdW5kIjogNDAsCiAgICAicHJvZHVjdElkIjogIjExMiIsCiAgICAicHJvZHVjdEVmZmVjdGl2ZURhdGUiOiAiMjAyMS0wNi0xNFQwMDowMDowMC4wMDBaIiwKICAgICJwcm9kdWN0VHlwZSI6ICJUZXN0VHlwZSIsCiAgICAicHJvZHVjdFN0YXR1c0VuZERhdGUiOiAiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwKICAgICJjZXJ0aWZpY2F0ZURldGFpbEFkbWluaXN0cmF0b3IiOiAiQ1VNSVMiLAogICAgImJhY2tQcmVtaXVtQ29sbGVjdGlvblBlcmlvZCI6IDEsCiAgICAicHJvZHVjdEluVXNlIjogIlllcyIsCiAgICAiaW5zZXJ0RGF0ZSI6ICIyMDIxLTA2LTE1VDEwOjA0OjMwLjAwMFoiLAogICAgInByb2R1Y3RCdXNpbmVzc01vZGVsIjogIk1lcmNoYW50IiwKICAgICJjb21tZW50IjogIk5vdGVzIgogIH0KfQ=="};
    //     this.planDetailsData = JSON.parse(Base64.decode(data.value))
    //   });
    this.selectedTab = 1;
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




}
