import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ClientAddressDetailFormBuilderModule } from './client-address-detail-form.module';
import {ClientAddressInfoFormBuilderService} from './client-address-info-form-builder.service'




/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: ClientAddressDetailFormBuilderModule
})

export class ClientAddressDetailFormBuilderService {

    public clientAddressDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private clientAddressInfoForm: ClientAddressInfoFormBuilderService) {
        this.getClientAddressDetailForm()
    }

    getClientAddressDetailForm() {
        this.clientAddressDetailForm = this.fb.group({
            clientAddressInfo: this.clientAddressInfoForm.getClientAddressInfoForm()
          
        });
    }


    get form() {
        return this.clientAddressDetailForm;
    }


}
