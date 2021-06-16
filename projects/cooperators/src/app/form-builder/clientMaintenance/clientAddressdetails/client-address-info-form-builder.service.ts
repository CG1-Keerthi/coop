import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { ClientAddressDetailFormBuilderModule } from './client-address-detail-form.module';



/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: ClientAddressDetailFormBuilderModule
})

export class ClientAddressInfoFormBuilderService {

    public clientAddressInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getClientAddressInfoForm() {
        return this.fb.group({
                addressType: ['', Validators.required],
                addressEffectiveDate: ['', Validators.required],
                addressTerminationDate: [''],
                addressLine1: [''],
                addressLine2: [''],
                city: [''],
                province: [''],
                postalCode: [''],
                country: [''],
                clientIdentifier:[''],
                clientNumber:[''],
                clientAddressIdentifier:[''],
                currentRecordFlag: ['']
        });
    }
}