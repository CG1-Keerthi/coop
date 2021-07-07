import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { CoverageRatingFactorDetailFormBuilderModule } from './coverage-rating-factor-detail-form.module';

/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: CoverageRatingFactorDetailFormBuilderModule
})

export class CoverageRatingFactorInfoFormBuilderService {

    public coverageRatingFactorInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getCoverageRatingFactorInfoForm() {
        return this.fb.group({
            ratingFactorEffectiveDate: ['',Validators.required],
            ratingFactorStatus: [''],
            ratingFactorTerminationDate: [''],
            ratingFactorInUse: [''],
            loanThresholdValue: ['',Validators.required],
            ageTableQualifier: [''],
            disabilityTableQualifier: [''],
            acceleratedDeathBenefitCode: [''],
            eliminationPeriod: [''],
            preExistingConditionValuePayOnce: [''],
            compensationPayableFactorPercentage: [''],
            compensationPayableOption: [''],
            compensationPayablePercentage: [''],
            compensationAmountRefundableFlag: [''],
            compensationRefundableAmount: [''],
            compensationNonRefundableAmount: [''],
            comment: [''],
            lastUpdateDate: [''],
            currentRecordFlag: [''],
            ratingFactorStatusEndDate: [''],
            coverageRatingFactorId: ['']
        });
    }
}