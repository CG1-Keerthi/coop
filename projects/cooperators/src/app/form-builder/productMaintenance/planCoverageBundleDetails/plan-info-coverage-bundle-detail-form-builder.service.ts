import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { PlanCoverageBundleDetailsModule } from './plan-coverage-bundle-detail-form.module';


/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: PlanCoverageBundleDetailsModule
})

export class PlanInfoCoverageBundleService {

    public PlanInfoCoverageform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getPlanCoverageInfoForm() {
        return this.fb.group({
           planCoverageBundleInfo: this.fb.array([
                this.fb.group({                  
                    coverageCode: [''],
                    premiumSplitPercentage: [''],
                    planProductInfoId: ['']                   
                })
            ])
        });
    }
}