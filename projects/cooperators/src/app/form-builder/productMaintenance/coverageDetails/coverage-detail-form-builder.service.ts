import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ProductInfoFormBuilderService } from './../productDetails/product-info-form-builder.service';
import { PlanInfoFormBuilderService } from './../planDetails/plan-info-form-builder.service';
import { CoverageDetailFormBuilderModule } from './coverage-detail-form.module';
import { CoverageInfoFormBuilderService } from './coverage-info-form-builder.service';

/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: CoverageDetailFormBuilderModule
})

export class CoverageDetailFormBuilderService {

    public coverageDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private productInfoForm: ProductInfoFormBuilderService,
        private planProductInfoForm:PlanInfoFormBuilderService,
        private coverageInfoForm: CoverageInfoFormBuilderService) {
        this.getCoverageDetailForm()
    }

    getCoverageDetailForm() {
        this.coverageDetailForm = this.fb.group({
            mondFormDateFormat:[''],//extra field
            productInfo: this.productInfoForm.getProductInfoForm(),
            planProductInfo: this.planProductInfoForm.getPlanInfoForm(),
            coverageInfo:this.coverageInfoForm.getCoverageInfoForm()       
        });
    }


    get form() {
        return this.coverageDetailForm;
    }


}
