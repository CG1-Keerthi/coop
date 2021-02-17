import { Component, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../_services/ds'

@Component({
  selector:"app-product-maintenance-designer",
  templateUrl: './productMaintenance.html',
  styleUrls: ['./productMaintenance.css']
})

export class ProductMaintenanceComponent implements OnInit {

  selectedTab: number = 0
  productTypeListData: any = [];
  productType:string = "";
  productBusinessModel:string = '';
  productStatus: string = '';
  productMaintenanceListData: any = [{}];
  planDetailsData:any = {}

  constructor(private mdMondService: MDMondServiceDS,
    private codeListFetch: MDCodeListHeaderDS) { }

  ngOnInit() {
   
  }

  getProductTypeDetails(event) {
    if (!event.target.value) {
      return;
    }
    this.productTypeListData = []
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchListOfProducts", JSON.stringify({ "productType": event.target.value.trim()}),"").subscribe(
      data => {
        this.productTypeListData = JSON.parse(Base64.decode(data.value)).response_response
      }, err => {
        let data= "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiJTUCIsInZhbHVlIjoiU1AifV19"
        this.productTypeListData = JSON.parse(Base64.decode(data)).response_response
      }
    )
  }

  getProductMaintenanceList() {
    debugger;
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductList", JSON.stringify({"productType":this.productType,"productBusinessModel":this.productBusinessModel,"productStatus":this.productStatus}),"").subscribe(
      data => {
        this.productMaintenanceListData = JSON.parse(Base64.decode(data.value)).productList_productSummary;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = "eyJwcm9kdWN0TGlzdF9wcm9kdWN0U3VtbWFyeSI6W3sicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInByb2R1Y3RTdGF0dXMiOiJBY3RpdmUiLCJwcm9kdWN0UGxhbklkIjoiOTUiLCJwcm9kdWN0TnVtYmVyIjoiMDA1IiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiU2luZ2xlIFByZW1pdW0gLSBFc3NlbnRpYWwvRXNzZW50aWFsIFBsdXMifSx7InByb2R1Y3RCdXNpbmVzc01vZGVsIjoiTWVyY2hhbnQiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6Ijk0IiwicHJvZHVjdE51bWJlciI6IjAwNCIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gQ2FyZSBGcmVlIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI5MyIsInByb2R1Y3ROdW1iZXIiOiIwMDAzIiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiTEFJUyBTaW5nbGUgUHJlbWl1bSJ9LHsicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJMb2NhdGlvbiIsInByb2R1Y3RTdGF0dXMiOiJBY3RpdmUiLCJwcm9kdWN0UGxhbklkIjoiNzEiLCJwcm9kdWN0TnVtYmVyIjoiMDAwMiIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IkNyZWxvZ2l4IFNpbmdsZSBQcmVtaXVtIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6IkxvY2F0aW9uIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiIyNCIsInByb2R1Y3ROdW1iZXIiOiIwMDAxIiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiTEdNIC0gT01OSSBTaW5nbGUgUHJlbWl1bSJ9XX0";
        this.productMaintenanceListData = JSON.parse(Base64.decode(data)).productList_productSummary;
       
      });
  }

  onClickOfReset() {
  }

  onProductListRowSelect(event){
    debugger;
    this.selectedTab = 1
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductDetails", JSON.stringify({ "productId": event.data.productPlanId }),"").subscribe(
      data => {
        // this.responseData = JSON.parse(Base64.decode(data.value));
        this.planDetailsData = JSON.parse(Base64.decode(data.value))
      },
      error => {
        let data ="eyJwcm9kdWN0SW5mb19wcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gQ2FyZSBGcmVlIiwicHJvZHVjdEluZm9faW5zdXJhbmNlRGlzdHJpYnV0b3JHdWlkZVJlZmVyZW5jZU51bSI6IkNELVNQQ0FSRUZSRUVfMTIxNyIsInByb2R1Y3RJbmZvX2xhc3RVcGRhdGVEYXRlIjoiMjAxOS0wNS0xM1QxNDoyODoxMS4wMDBaIiwicHJvZHVjdEluZm9fcHJvZHVjdE51bWJlciI6IjAwNCIsInByb2R1Y3RJbmZvX3Byb2R1Y3RUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDAwOjAwOjAwLjAwMFoiLCJwcm9kdWN0SW5mb19wcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdEluZm9fcHJvZHVjdEN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsInByb2R1Y3RJbmZvX21lbWJlckluaXRpYXRlZFRlcm1pbmF0aW9uUnVsZSI6IkltbWVkaWF0ZSBUZXJtaW5hdGlvbiIsInByb2R1Y3RJbmZvX2ZyZWVMb29rUGVyaW9kUmVmdW5kIjozMCwicHJvZHVjdEluZm9fcHJvZHVjdElkIjoiOTQiLCJwcm9kdWN0SW5mb19wcm9kdWN0RWZmZWN0aXZlRGF0ZSI6IjIwMTgtMDMtMDhUMDA6MDA6MDAuMDAwWiIsInByb2R1Y3RJbmZvX3Byb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0SW5mb19wcm9kdWN0U3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDA6MDA6MDAuMDAwWiIsInByb2R1Y3RJbmZvX2NlcnRpZmljYXRlRGV0YWlsQWRtaW5pc3RyYXRvciI6IkZpbmFuY2lhbCBJbnN0aXR1dGlvbiIsInByb2R1Y3RJbmZvX2JhY2tQcmVtaXVtQ29sbGVjdGlvblBlcmlvZCI6MCwicHJvZHVjdEluZm9fcHJvZHVjdEluVXNlIjoiWWVzIiwicHJvZHVjdEluZm9fcHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInByb2R1Y3RJbmZvX2NvbW1lbnQiOiJOZXcgZGlzdHJpYnV0aW9uIGd1aWRlIHZlcnNpb24gQ0RfU1BDQVJFRlJFRV8wNjE4In0" 
        this.planDetailsData = JSON.parse(Base64.decode(data))
      });
  }

  onClickOfAddProduct(){
    this.selectedTab = 1
  }

  


}
