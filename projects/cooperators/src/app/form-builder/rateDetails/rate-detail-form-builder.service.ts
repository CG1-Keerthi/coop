import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { RateDetailFormBuilderModule } from './rate-detail-form.module';
import { RateInfoFormBuilderService } from './rate-info-form-builder.service';



/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: RateDetailFormBuilderModule
})

export class RateDetailFormBuilderService {

    public rateDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private rateInfoForm: RateInfoFormBuilderService) {
        this.getRateDetailForm()
    }

    getRateDetailForm() {
        this.rateDetailForm = this.fb.group({
            planRatingStructureHeader: this.rateInfoForm.getRateInfoForm()
            // PlanRatingStructureDetails:this.rateInfoForm.getRateInfoForm()
        });
    }


    get form() {
        return this.rateDetailForm;
    }


}
