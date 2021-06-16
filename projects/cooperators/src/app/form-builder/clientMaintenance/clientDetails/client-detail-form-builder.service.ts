import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ClientDetailFormBuilderModule } from './client-detail-form.module';
import { ClientInfoFormBuilderService } from './client-info-form-builder.service';


/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: ClientDetailFormBuilderModule
})

export class ClientDetailFormBuilderService {

    public clientDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private clientInfoForm: ClientInfoFormBuilderService) {
        this.getClientDetailForm()
    }

    getClientDetailForm() {
        this.clientDetailForm = this.fb.group({
            clientInfo: this.clientInfoForm.getClientInfoForm()        
        });
    }


    get form() {
        return this.clientDetailForm;
    }


}
