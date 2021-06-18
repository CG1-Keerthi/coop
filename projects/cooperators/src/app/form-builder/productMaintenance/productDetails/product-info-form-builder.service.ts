import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { ProductDetailFormBuilderModule } from './product-detail-form.module';


/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: ProductDetailFormBuilderModule
})

export class ProductInfoFormBuilderService {

    public productInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getProductInfoForm() {
        return this.fb.group({
            productType: ['', Validators.required],
            productName: ['', Validators.required],
            productNumber: ['',Validators.required],
            productBusinessModel: ['',Validators.required],
            productEffectiveDate: ['',Validators.required],
            productStatus: [''],
            productTerminationDate: [''],
            productInUse: [''],
            backPremiumCollectionPeriod: [''],
            insuranceDistributorGuideReferenceNum: [''],
            certificateDetailAdministrator: [''],
            freeLookPeriodRefund: [''],
            memberInitiatedTerminationRule: [''],
            comment: [''],
            productId:[''],
            productStatusEndDate:[''],
            productCurrentRecordFlag:[''],
            lastUpdateDate:[''],
            mondFormDateFormat:['']
        });
    }
}