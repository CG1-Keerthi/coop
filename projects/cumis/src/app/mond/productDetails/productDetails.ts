import { Component, Input, OnInit } from '@angular/core';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../_services/ds'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details-tab',
  templateUrl: './productDetails.html',
  styleUrls: ['./productDetails.css']
})

export class ProductDetailsComponent implements OnInit {

  @Input() set productDetails(data) {
    if (Object.keys(data).length > 0){
      this.isFieldsreadonly = true
      this.productDetailsForm.patchValue(data);
    }
  }
  productDetailsForm: FormGroup
  isFieldsreadonly: boolean = true

  constructor(private mdMondService: MDMondServiceDS,
    private codeListFetch: MDCodeListHeaderDS,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.productDetailsForm = this.fb.group({
      "productInfo_productType": "",
      "productInfo_productName": "",
      "productInfo_productNumber": "",
      "productInfo_productBusinessModel": "",
      "productInfo_productEffectiveDate": "",
      "productInfo_productStatus": "",
      "productInfo_productTerminationDate": "",
      "productInfo_productInUse": "",
      "productInfo_backPremiumCollectionPeriod": '',
      "productInfo_insuranceDistributorGuideReferenceNum": "",
      "productInfo_certificateDetailAdministrator": "",
      "productInfo_freeLookPeriodRefund": '',
      "productInfo_memberInitiatedTerminationRule": "",
      "productInfo_comment": "",

      "productInfo_lastUpdateDate": "",
      "productInfo_productCurrentRecordFlag": "",
      "productInfo_productId": "",
      "productInfo_productStatusEndDate": "",
    })

  }


  onClickOfUpdatePlan() {
    this.isFieldsreadonly = false
  }

}
