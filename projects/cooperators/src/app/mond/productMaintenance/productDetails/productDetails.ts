import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../_services/ds'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductDetailFormBuilderService } from '../../../form-builder/productMaintenance/productDetails/product-detail-form-builder.service';
import { MDCommonGetterSetter } from '../../../_services/common';
import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-product-details-tab',
  templateUrl: './productDetails.html',
  styleUrls: ['./productDetails.css']
})

export class ProductDetailsComponent implements OnInit {

  @Input() set productDetails(data) {
    if (Object.keys(data).length > 0){
      this.productDetailsData = data;
      this.isFieldsreadonly = true;
      this.isSubmitBtnDisabled = true;
      this.isProductInuseFieldsreadonly = true;
      this.isTerminationDateFieldreadonly = true;
      this.isUpdateDateFieldReadonly = false;
      this.renderer.setAttribute(this.productBusinessModelList.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.CertificateDetailList.nativeElement, 'disabled', "true");
      this.renderer.setAttribute(this.memberInitiatedList.nativeElement, 'disabled', "true");
      this.productDetailsForm.reset();
      this.productDetailsForm.patchValue(data);
    }else{
      this.productDetailsForm.reset();
      this.isSubmitted = false;
      this.isFieldsreadonly = false;
      this.isSubmitBtnDisabled = false;
      this.isProductInuseFieldsreadonly = true;
      this.isTerminationDateFieldreadonly = true;
      this.isUpdateDateFieldReadonly = true;
      let selectedProductDetailDropdownVal = {
        "productInfo": {
          "productBusinessModel": "",
          "productStatus":"",
          "certificateDetailAdministrator":"",
          "memberInitiatedTerminationRule":"" 
        }
      }
      this.productDetailsForm.patchValue(selectedProductDetailDropdownVal);
      this.renderer.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
      this.renderer.setProperty(this.productBusinessModelList.nativeElement, 'disabled', false);
      this.renderer.setProperty(this.CertificateDetailList.nativeElement, 'disabled', false);
      this.renderer.setProperty(this.memberInitiatedList.nativeElement, 'disabled', false);
    }
  }
  productDetailsForm: FormGroup;
  isFieldsreadonly: boolean = false;
  public csfrToken: any;
  public productDetailsData: any;
  public isProductInuseFieldsreadonly: boolean = false;
  public isTerminationDateFieldreadonly: boolean = false;
  public isUpdateDateFieldReadonly: boolean = false;
  public isSubmitBtnDisabled:boolean = false;
  public isSubmitted: boolean = false;
  public isTooltip: boolean = false;
  public isRefundTooltip: boolean = false;

  @ViewChild('productStatusList') productStatusList: ElementRef;
  @ViewChild('productBusinessModelList') productBusinessModelList: ElementRef;
  @ViewChild('CertificateDetailList') CertificateDetailList: ElementRef;
  @ViewChild('memberInitiatedList') memberInitiatedList: ElementRef;

  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private productDetailService: ProductDetailFormBuilderService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
          this.csfrToken = data;
      }
  });

    this.productDetailsForm =  this.productDetailService.form;

    // this.productDetailsForm = this.fb.group({
    //   "productInfo_productType": "",
    //   "productInfo_productName": "",
    //   "productInfo_productNumber": "",
    //   "productInfo_productBusinessModel": "",
    //   "productInfo_productEffectiveDate": "",
    //   "productInfo_productStatus": "",
    //   "productInfo_productTerminationDate": "",
    //   "productInfo_productInUse": "",
    //   "productInfo_backPremiumCollectionPeriod": '',
    //   "productInfo_insuranceDistributorGuideReferenceNum": "",
    //   "productInfo_certificateDetailAdministrator": "",
    //   "productInfo_freeLookPeriodRefund": '',
    //   "productInfo_memberInitiatedTerminationRule": "",
    //   "productInfo_comment": "",

    //   "productInfo_lastUpdateDate": "",
    //   "productInfo_productCurrentRecordFlag": "",
    //   "productInfo_productId": "",
    //   "productInfo_productStatusEndDate": "",
    // })

  }

  onClickOfProductDetailSubmit(){
    debugger;

    if(this.productDetailsForm.invalid){
      this.mdMondServiceDS.showErrorMessage("please enter the value for mandatory fields");
      this.isSubmitted = true
      return;
    }

    if(this.productDetailsData == undefined){
      this.productDetailsForm.value.productInfo.productCurrentRecordFlag = 'N';
    }else{
      this.productDetailsForm.value.productInfo.productCurrentRecordFlag = 'Y';
      this.productDetailsForm.value.productInfo.productId = this.productDetailsData.productInfo.productId;
      this.productDetailsForm.value.productInfo.productStatusEndDate = this.productDetailsData.productInfo.productStatusEndDate;
      this.productDetailsForm.value.productInfo.lastUpdateDate = this.productDetailsData.productInfo.lastUpdateDate;
      this.productDetailsForm.value.productInfo.mondFormDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX";
    }
    let formData = btoa(JSON.stringify(this.productDetailsForm.value));
    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveProductData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
        data => {
            // console.log("onClickOfClientSubmit data", data);
            this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

        }, error => {
            this.mdMondServiceDS.MDError(error);
        });
  }


  onKeyUpPremiumPeriod(event){
    debugger;
   if(event.target.value == ""){
    this.isTooltip = true;
   setTimeout(()=>{
    this.isTooltip = false;
   },2000)
    
   }else{
    this.isTooltip = false;
   }
  
  }

  onKeyUpRefund(event){
    if(event.target.value == ""){
      this.isRefundTooltip = true;
     setTimeout(()=>{
      this.isRefundTooltip = false;
     },2000)
      
     }else{
      this.isRefundTooltip = false;
     }
  }

  onClickOfUpdatePlan() {
    debugger;
    this.isFieldsreadonly = false;
    this.isSubmitBtnDisabled = false;
    // this.isProductInuseFieldsreadonly = false;
    this.isTerminationDateFieldreadonly = false;
    this.renderer.setProperty(this.productStatusList.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.productBusinessModelList.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.CertificateDetailList.nativeElement, 'disabled', false);
    this.renderer.setProperty(this.memberInitiatedList.nativeElement, 'disabled', false);
  }


  onClikOfClear(){
    debugger;
    this.productDetailsForm.reset();
    let selectedProductDetailDropdownVal = {
      "productInfo": {
        "productBusinessModel": "",
        "productStatus":"",
        "certificateDetailAdministrator":"",
        "memberInitiatedTerminationRule":"" 
      }
    }
    this.productDetailsForm.patchValue(selectedProductDetailDropdownVal);
  }

}
