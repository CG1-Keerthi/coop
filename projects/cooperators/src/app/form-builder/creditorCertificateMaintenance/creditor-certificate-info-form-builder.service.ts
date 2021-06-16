import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { CreditorCertificateFormBuilderModule } from './creditor-certificate-form.module';



/**
* This is the Service TS file for address Form Builder, It contains methods related to address Form Builder
*/

@Injectable({
    providedIn: CreditorCertificateFormBuilderModule
})

export class ClientInfoFormBuilderService {

    public creditorCertificateInfoform: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses.
    */
    constructor(private fb: FormBuilder) { }

    getcreditorCertificateInfoForm() {
        return this.fb.group({
            fileIdentifier: [''],
            clientName: [''],
            certificateNumber: [''],
            certificateEffectiveDateMin: [''],
            "": [''],
            certificateEffectiveDateMax: [''],
            internalLocationNumber: [''],
            applicantFirstName: [''],
            applicantLastName: [''],
            clientCertificateNumber: [''],
            additionalSearchValue: [''],
            additionalSearchField: [''],
            startRow: ['0'],
            numberOfRecordsToFetch:['50']
        });
    }
}