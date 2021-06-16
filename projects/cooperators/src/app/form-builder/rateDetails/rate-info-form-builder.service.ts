import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { RateDetailFormBuilderModule } from './rate-detail-form.module';



/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: RateDetailFormBuilderModule
})

export class RateInfoFormBuilderService {

    public RateInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getRateInfoForm() {
        return this.fb.group({
            
            rateName: ['', Validators.required],
            rateType: ['', Validators.required],
            jointLifeMultiplier: ['0.925', Validators.required],
            toleranceLevel: ['0.02', Validators.required],
            rateStructureHeaderId: [''],
            PlanRatingStructureDetails: this.fb.array([
                this.fb.group({
                    loanAmountStartValue: [''],
                    loanAmountEndValue: [''],
                    multiLife: [''],
                    multiLifeTerm: [''],
                    coverageCodeInPlanRatingStructure: [''],
                    termStartValue: [''],
                    termEndValue: [''],
                    ageStartValue: [''],
                    ageEndValue: [''],
                    eliminationPeriodInPlanRatingStructure: [''],
                    premiumAmountInPlanRatingStructure: [''],
                    rateStructureDetailsId: [''],
                    rateStructureHeaderId: ['']
                })
            ])

        });

    }
}