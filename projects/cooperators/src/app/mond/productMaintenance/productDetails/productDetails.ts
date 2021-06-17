import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../_services/ds'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductDetailFormBuilderService } from '../../../form-builder/productMaintenance/productDetails/product-detail-form-builder.service';
import { MDCommonGetterSetter } from '../../../_services/common';

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
      this.isProductInuseFieldsreadonly = true;
      this.isTerminationDateFieldreadonly = true;
      this.isUpdateDateFieldReadonly = false;
      this.productDetailsForm.patchValue(data);
    }else{
      this.isProductInuseFieldsreadonly = true;
      this.isTerminationDateFieldreadonly = true;
      this.isUpdateDateFieldReadonly = true;
      this.renderer.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
    }
  }
  productDetailsForm: FormGroup;
  isFieldsreadonly: boolean = false;
  public csfrToken: any;
  public productDetailsData: any;
  public isProductInuseFieldsreadonly: boolean = false;
  public isTerminationDateFieldreadonly: boolean = false;
  public isUpdateDateFieldReadonly: boolean = false;

  @ViewChild('productStatusList') productStatusList: ElementRef;

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
    if(this.productDetailsData == undefined){
      this.productDetailsForm.value.productInfo.productCurrentRecordFlag = 'N';
    }else{
      this.productDetailsForm.value.productInfo.productCurrentRecordFlag = 'Y';
      this.productDetailsForm.value.productInfo.productId = this.productDetailsData.productInfo_productId;
      this.productDetailsForm.value.productInfo.productStatusEndDate = this.productDetailsData.productInfo_productStatusEndDate;
      this.productDetailsForm.value.productInfo.lastUpdateDate = this.productDetailsData.productInfo_lastUpdateDate;
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

  onClickOfUpdatePlan() {
    debugger;
    this.isFieldsreadonly = false;
    this.isProductInuseFieldsreadonly = false;
    this.isTerminationDateFieldreadonly = false;
    this.renderer.setProperty(this.productStatusList.nativeElement, 'disabled', false);
  }

}
