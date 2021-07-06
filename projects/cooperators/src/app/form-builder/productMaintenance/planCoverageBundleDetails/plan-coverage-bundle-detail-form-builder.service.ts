import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { PlanCoverageBundleDetailsModule } from './plan-coverage-bundle-detail-form.module';
import { PlanInfoCoverageBundleService } from './plan-info-coverage-bundle-detail-form-builder.service';


/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: PlanCoverageBundleDetailsModule
})

export class PlanCoverageFormBuilderService {

    public PlanCoverageBundleDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private planInfoCoverageForm: PlanInfoCoverageBundleService) {
        this.getPlanCoverageBundleDetailForm()
    }

    getPlanCoverageBundleDetailForm() {
        this.PlanCoverageBundleDetailForm = this.fb.group({
            planCoverageBundleInfo: this.planInfoCoverageForm.getPlanCoverageInfoForm()
        });
    }

    get form() {
        return this.PlanCoverageBundleDetailForm;
    }

}
