import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CoverageDetailFormBuilderService } from '../coverageDetails/coverage-detail-form-builder.service';
import { CoverageInfoFormBuilderService } from '../coverageDetails/coverage-info-form-builder.service';
import { PlanInfoFormBuilderService } from '../planDetails/plan-info-form-builder.service';
import { ProductInfoFormBuilderService } from '../productDetails/product-info-form-builder.service';
import { CoverageRatingFactorDetailFormBuilderModule } from './coverage-rating-factor-detail-form.module';
import { CoverageRatingFactorInfoFormBuilderService } from './coverage-rating-factor-info-form-builder.service';

/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: CoverageRatingFactorDetailFormBuilderModule
})

export class CoverageRatingFactorDetailFormBuilderService {

    public coverageRatingFactorDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private productInfoForm: ProductInfoFormBuilderService,
        private planProductInfoForm:PlanInfoFormBuilderService,
        private coverageInfoForm: CoverageInfoFormBuilderService,
        private CoverageRatingFactorInfoForm: CoverageRatingFactorInfoFormBuilderService,
        private coverageDetailForm: CoverageDetailFormBuilderService) {
        this.getCoverageRatingFactorDetailForm()
    }

    getCoverageRatingFactorDetailForm() {
        this.coverageRatingFactorDetailForm = this.fb.group({
            mondFormDateFormat:[''],//extra field
            productInfo: this.productInfoForm.getProductInfoForm(),
            planProductInfo: this.planProductInfoForm.getPlanInfoForm(),
            coverageInfo:this.coverageInfoForm.getCoverageInfoForm(),
            coverageRatingFactorInfo:this.CoverageRatingFactorInfoForm.getCoverageRatingFactorInfoForm()        
        });
    }


    get form() {
        return this.coverageRatingFactorDetailForm;
    }


}
