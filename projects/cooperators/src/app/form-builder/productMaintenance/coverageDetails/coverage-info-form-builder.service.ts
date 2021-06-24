import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { CoverageDetailFormBuilderModule } from './coverage-detail-form.module';


/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: CoverageDetailFormBuilderModule
})

export class CoverageInfoFormBuilderService {

    public coverageInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getCoverageInfoForm() {
        return this.fb.group({
            lineOfBusiness: ['', Validators.required],
            coverageType: ['', Validators.required],
            generalLedgerAccountNumber: [''],
            coverageEffectiveDate: ['', Validators.required],
            coverageStatus: [''],
            coverageTerminationDate: [''],
            coverageInUse: [''],
            maximumBenefitAmount: [''],
            maximumClaimBenefitTerm: [''],
            maximumMonthlyClaimBenefitAmount: [''],
            comment: [''],
            terminationDueToClaim: [''],
            lowerMaximumCoverageAmount: [''],
            riderBenefit: [''],
            riderBenefitPrerequisite: [''],//hidden
            minimumIssueAge: [''],
            maximumIssueAge: [''],
            lowerMaximumCoverageAmountBasedAge: [''],
            maximumCoverageAmount: [''],
            minimumCoverageAmt: [''],
            minimumAgeLowerCoverageAmount: [''],
            maximumInsurableLoanPeriodRegular: [''],
            maximumInsurableLoanPeriodResidualValue: [''],
            eligibilityHoursAmount: [''],
            nonEvidenceMaximumAmount: [''],
            maximumMonthlyBenefitAmount: [''],
            lossOfEmploymentContinuousWorkPeriod: [''],
            coverageTerminationAge: [''],
            certificateFee: [''],
            curp: [''],
            minimumPremium: [''],
            lastUpdateDate: [''],
            currentRecordFlag: [''],
            coverageStatusEndDate: [''],
            coverageCode: [''],
            planCoverageInfoId: ['']
        });
    }
}