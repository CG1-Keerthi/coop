import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { ClientDetailFormBuilderModule } from './client-detail-form.module';


/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: ClientDetailFormBuilderModule
})

export class ClientInfoFormBuilderService {

    public clientInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getClientInfoForm() {
        return this.fb.group({
            // clientInfo: this.fb.group({
                clientNumber: ['', Validators.required],
                clientName: ['', Validators.required],
                clientEffectiveDate: ['', Validators.required],
                clientStatus: [''],
                clientTerminationDate: [''],
                clientProvinceCode: ['', Validators.required],
                clientLanguageCode: ['', Validators.required],
                clientProfitSharingFlag: [''],
                groupPolicyHolder: [''],
                clientPhone1: [''],
                clientPhone2: [''],
                clientFaxNumber: [''],
                clientEmail: ['']
            // })
        });
    }
}