import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { PlanDetailFormBuilderModule } from './plan-detail-form.module';
import { ProductInfoFormBuilderService } from './../productDetails/product-info-form-builder.service';
import { PlanInfoFormBuilderService } from './plan-info-form-builder.service';

/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: PlanDetailFormBuilderModule
})

export class PlanDetailFormBuilderService {

    public planDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private productInfoForm: ProductInfoFormBuilderService,
        private planProductInfoForm:PlanInfoFormBuilderService) {
        this.getProductDetailForm()
    }

    getProductDetailForm() {
        this.planDetailForm = this.fb.group({
            productInfo: this.productInfoForm.getProductInfoForm(),
            planProductInfo: this.planProductInfoForm.getPlanInfoForm()       
        });
    }


    get form() {
        return this.planDetailForm;
    }


}
