import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { PlanDetailFormBuilderModule } from './plan-detail-form.module';

/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: PlanDetailFormBuilderModule
})

export class PlanInfoFormBuilderService {

    public planInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getPlanInfoForm() {
        return this.fb.group({
            planNumber:['',Validators.required],
            planName:['',Validators.required],
            planDescription:['',Validators.required],
            clientName:['',Validators.required],
            languageCode:['',Validators.required],
            defaultBillingType:['',Validators.required],
            planEffectiveDate:['',Validators.required],
            planStatus:[''],
            planTerminationDate:[''],
            planInUse:[''],
            permitCertificateChangesPostIssuance:[''],
            properInsuranceThresholdAmount:[''],
            comment:[''],
            isBundledPlan:[''],
            isBundleExists:[''],//extra field
            loanExtension:[''],
            terminationOfRisk:[''],
            permitCoverageAmountChangesPostIssuance:[''],
            refundAllowed:[''],
            minimumTermQuantity:[''],
            aggregateExposureAmount:[''],
            reinstatementPeriodQuantity:[''],
            maximumPeriodToBackDateQuantity:[''],
            maximumPeriodToFutureDateQuantity:[''],
            refundMaximumPeriodQuantity:[''],
            minimumAmortizationPeriodQuantity:[''],
            maximumAmortizationPeriodQuantity:[''],
            maximumApplicantAllowedQuantity:[''],
            premiumCalculationAlgorithm:[''],
            premiumCalculationMethod:[''],
            premiumPaidBy:[''],
            loanBalanceMethod:[''],
            ageMethod:[''],
            insurancePaymentMethod:[''],
            loanType:[''],
            loanTypeCategory:[''],
            grossUpInterestOnly:[''],
            grossUpLumpsumCode:[''],
            planProductInfoId:[''],
            lastUpdateDate:[''],
            currentRecordFlag:[''],
            planStatusEndDate:[''],
            planCreationDate:[''],
            mondFormDateFormat:['']

        });
    }
}