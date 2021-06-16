import { Component, HostListener, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
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
  public isSpinnerShow:boolean = false;
  public isResizeTrue: boolean = false;
  public selectedProductTypeName: any;
  public productTypeSelect: any;
  public selectProductType: any;

  constructor(private mdMondService: MDMondServiceDS,
    private codeListFetch: MDCodeListHeaderDS) { }

  ngOnInit() {

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

  onSelectProductType(event){
    this.selectedProductTypeName = undefined
    this.selectedProductTypeName = event.source.value;
  }

  getProductMaintenanceList() {
    debugger;
    if(this.productType != ""){
      if( this.selectProductType == "productSelect"){
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
        let data = {"key":"key","value":"eyJwcm9kdWN0TGlzdF9wcm9kdWN0U3VtbWFyeSI6W3sicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMDoxMToxMC4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI4IiwicHJvZHVjdE51bWJlciI6IjAwMDgiLCJwcm9kdWN0VHlwZSI6IlNQIiwicHJvZHVjdE5hbWUiOiJTaW5nbGUgUHJlbWl1bSAtIEZPUkQgRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzIC0gMSJ9LHsicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wMy0zMFQxOToyMjowNi4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI3IiwicHJvZHVjdE51bWJlciI6IjAwMDciLCJwcm9kdWN0VHlwZSI6Ik1QIiwicHJvZHVjdE5hbWUiOiJNb250aGx5IFBheSAtQ29sbGFicmlhIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTAzLTE4VDEyOjI3OjIxLjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjYiLCJwcm9kdWN0TnVtYmVyIjoiMDA2IiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiU2luZ2xlIFByZW1pdW0gLSBGT1JEIENhcmVmcmVlIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI2VDEwOjI5OjI2LjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjUiLCJwcm9kdWN0TnVtYmVyIjoiMDA1ICIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzICJ9XX0="}
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
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductDetails", JSON.stringify({ "productId": event.data.productPlanId }), "").subscribe(
      data => {
        // this.responseData = JSON.parse(Base64.decode(data.value));
        this.planDetailsData = JSON.parse(Base64.decode(data.value))
      },
      error => {
        let data = {"key":"key","value":"eyJwcm9kdWN0SW5mb19wcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gRk9SRCBFc3NlbnRpYWwvRXNzZW50aWFsIFBsdXMgLSAxIiwicHJvZHVjdEluZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA2LTA4VDEwOjExOjEwLjAwMFoiLCJwcm9kdWN0SW5mb19wcm9kdWN0TnVtYmVyIjoiMDAwOCIsInByb2R1Y3RJbmZvX3Byb2R1Y3RUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDAwOjAwOjAwLjAwMFoiLCJwcm9kdWN0SW5mb19wcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdEluZm9fcHJvZHVjdEN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsInByb2R1Y3RJbmZvX21lbWJlckluaXRpYXRlZFRlcm1pbmF0aW9uUnVsZSI6IkltbWVkaWF0ZSBUZXJtaW5hdGlvbiIsInByb2R1Y3RJbmZvX3VwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsInByb2R1Y3RJbmZvX2ZyZWVMb29rUGVyaW9kUmVmdW5kIjozMCwicHJvZHVjdEluZm9fcHJvZHVjdElkIjoiOCIsInByb2R1Y3RJbmZvX3Byb2R1Y3RFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNS0wMVQwMDowMDowMC4wMDBaIiwicHJvZHVjdEluZm9fcHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3RJbmZvX3Byb2R1Y3RTdGF0dXNFbmREYXRlIjoiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwicHJvZHVjdEluZm9fY2VydGlmaWNhdGVEZXRhaWxBZG1pbmlzdHJhdG9yIjoiRmluYW5jaWFsIEluc3RpdHV0aW9uIiwicHJvZHVjdEluZm9fYmFja1ByZW1pdW1Db2xsZWN0aW9uUGVyaW9kIjowLCJwcm9kdWN0SW5mb19wcm9kdWN0SW5Vc2UiOiJZZXMiLCJwcm9kdWN0SW5mb19wcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50In0\u003d"};
        this.planDetailsData = JSON.parse(Base64.decode(data.value))
      });
  }

  onClickOfAddProduct() {
    this.planDetailsData = {}
    this.selectedTab = 1
  }




}
