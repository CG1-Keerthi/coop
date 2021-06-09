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

  constructor(private mdMondService: MDMondServiceDS,
    private codeListFetch: MDCodeListHeaderDS) { }

  ngOnInit() {

  }

  getProductTypeDetails(event) {
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

  getProductMaintenanceList() {
    debugger;
    this.isSpinnerShow = true;
    this.mdMondService.getFormDataFromMondService("Creditor Self Admin", "FetchProductList", JSON.stringify({ "productType": this.productType, "productBusinessModel": this.productBusinessModel, "productStatus": this.productStatus }), "").subscribe(
      data => {
        this.isShowTblRow = true;
        this.productMaintenanceListData = JSON.parse(Base64.decode(data.value)).productList_productSummary;
        this.isSpinnerShow = false;
      },
      error => {
        this.mdMondService.MDError(error);
        let data = {"key":"key","value":"eyJwcm9kdWN0TGlzdF9wcm9kdWN0U3VtbWFyeSI6W3sicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMDoxMToxMC4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI4IiwicHJvZHVjdE51bWJlciI6IjAwMDgiLCJwcm9kdWN0VHlwZSI6IlNQIiwicHJvZHVjdE5hbWUiOiJTaW5nbGUgUHJlbWl1bSAtIEZPUkQgRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzIC0gMSJ9LHsicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wMy0zMFQxOToyMjowNi4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI3IiwicHJvZHVjdE51bWJlciI6IjAwMDciLCJwcm9kdWN0VHlwZSI6Ik1QIiwicHJvZHVjdE5hbWUiOiJNb250aGx5IFBheSAtQ29sbGFicmlhIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTAzLTE4VDEyOjI3OjIxLjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjYiLCJwcm9kdWN0TnVtYmVyIjoiMDA2IiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiU2luZ2xlIFByZW1pdW0gLSBGT1JEIENhcmVmcmVlIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5Ijoic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI2VDEwOjI5OjI2LjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjUiLCJwcm9kdWN0TnVtYmVyIjoiMDA1ICIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gRXNzZW50aWFsL0Vzc2VudGlhbCBQbHVzICJ9LHsicHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMC0wOC0xMVQxNTozMjozMC4wMDBaIiwicHJvZHVjdFN0YXR1cyI6IkFjdGl2ZSIsInByb2R1Y3RQbGFuSWQiOiI0IiwicHJvZHVjdE51bWJlciI6IjAwNCIsInByb2R1Y3RUeXBlIjoiU1AgIiwicHJvZHVjdE5hbWUiOiJTaW5nbGUgUHJlbWl1bSAtIENhcmVmcmVlIn0seyJwcm9kdWN0QnVzaW5lc3NNb2RlbCI6Ik1lcmNoYW50IiwidXBkYXRlZEJ5IjoidmlkaHlhLnZlbnVnb3BhbEBtb25kY2xvdWQuY29tIiwibGFzdFVwZGF0ZURhdGUiOiIyMDE5LTAxLTI0VDE5OjQ1OjA1LjAwMFoiLCJwcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBsYW5JZCI6IjMiLCJwcm9kdWN0TnVtYmVyIjoiMDAwMyIsInByb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0TmFtZSI6IkxBSVMgU2luZ2xlIFByZW1pdW0ifSx7InByb2R1Y3RCdXNpbmVzc01vZGVsIjoiTWVyY2hhbnQiLCJ1cGRhdGVkQnkiOiJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMTgtMTEtMTVUMTQ6MDU6MTEuMDAwWiIsInByb2R1Y3RTdGF0dXMiOiJBY3RpdmUiLCJwcm9kdWN0UGxhbklkIjoiMiIsInByb2R1Y3ROdW1iZXIiOiIwMDAyIiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiQ3JlbG9naXggU2luZ2xlIFByZW1pdW0ifSx7InByb2R1Y3RCdXNpbmVzc01vZGVsIjoiTG9jYXRpb24iLCJ1cGRhdGVkQnkiOiJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMTgtMDctMTJUMTI6MTk6MTMuMDAwWiIsInByb2R1Y3RTdGF0dXMiOiJBY3RpdmUiLCJwcm9kdWN0UGxhbklkIjoiMSIsInByb2R1Y3ROdW1iZXIiOiIwMDAxIiwicHJvZHVjdFR5cGUiOiJTUCIsInByb2R1Y3ROYW1lIjoiT01OSSBTaW5nbGUgUHJlbWl1bSJ9XX0\u003d"}
        this.isShowTblRow = true;
        this.productMaintenanceListData = JSON.parse(Base64.decode(data.value)).productList_productSummary;
        this.isSpinnerShow = false;
      });
  }

  onClickOfReset() {
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
        let data = "eyJwcm9kdWN0SW5mb19wcm9kdWN0TmFtZSI6IlNpbmdsZSBQcmVtaXVtIC0gQ2FyZSBGcmVlIiwicHJvZHVjdEluZm9faW5zdXJhbmNlRGlzdHJpYnV0b3JHdWlkZVJlZmVyZW5jZU51bSI6IkNELVNQQ0FSRUZSRUVfMTIxNyIsInByb2R1Y3RJbmZvX2xhc3RVcGRhdGVEYXRlIjoiMjAxOS0wNS0xM1QxNDoyODoxMS4wMDBaIiwicHJvZHVjdEluZm9fcHJvZHVjdE51bWJlciI6IjAwNCIsInByb2R1Y3RJbmZvX3Byb2R1Y3RUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDAwOjAwOjAwLjAwMFoiLCJwcm9kdWN0SW5mb19wcm9kdWN0U3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdEluZm9fcHJvZHVjdEN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsInByb2R1Y3RJbmZvX21lbWJlckluaXRpYXRlZFRlcm1pbmF0aW9uUnVsZSI6IkltbWVkaWF0ZSBUZXJtaW5hdGlvbiIsInByb2R1Y3RJbmZvX2ZyZWVMb29rUGVyaW9kUmVmdW5kIjozMCwicHJvZHVjdEluZm9fcHJvZHVjdElkIjoiOTQiLCJwcm9kdWN0SW5mb19wcm9kdWN0RWZmZWN0aXZlRGF0ZSI6IjIwMTgtMDMtMDhUMDA6MDA6MDAuMDAwWiIsInByb2R1Y3RJbmZvX3Byb2R1Y3RUeXBlIjoiU1AiLCJwcm9kdWN0SW5mb19wcm9kdWN0U3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDA6MDA6MDAuMDAwWiIsInByb2R1Y3RJbmZvX2NlcnRpZmljYXRlRGV0YWlsQWRtaW5pc3RyYXRvciI6IkZpbmFuY2lhbCBJbnN0aXR1dGlvbiIsInByb2R1Y3RJbmZvX2JhY2tQcmVtaXVtQ29sbGVjdGlvblBlcmlvZCI6MCwicHJvZHVjdEluZm9fcHJvZHVjdEluVXNlIjoiWWVzIiwicHJvZHVjdEluZm9fcHJvZHVjdEJ1c2luZXNzTW9kZWwiOiJNZXJjaGFudCIsInByb2R1Y3RJbmZvX2NvbW1lbnQiOiJOZXcgZGlzdHJpYnV0aW9uIGd1aWRlIHZlcnNpb24gQ0RfU1BDQVJFRlJFRV8wNjE4In0"
        this.planDetailsData = JSON.parse(Base64.decode(data))
      });
  }

  onClickOfAddProduct() {
    this.selectedTab = 1
  }

  @HostListener('click', ['$event.target'])
  onClick(element) {
      debugger;
      this.isResizeTrue = true;
      setTimeout(() => {
          this.isResizeTrue = false;
      }, 2000)
  }


}
