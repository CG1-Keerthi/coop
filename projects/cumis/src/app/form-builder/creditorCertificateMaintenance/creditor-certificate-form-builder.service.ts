import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CreditorCertificateFormBuilderModule } from './creditor-certificate-form.module';
import { ClientInfoFormBuilderService } from './creditor-certificate-info-form-builder.service';

/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: CreditorCertificateFormBuilderModule
})

export class CreditorCertificateFormBuilderService {

    public creditorCertificateForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private clientInfoForm: ClientInfoFormBuilderService) {
        this.getCreditorCertificateForm()
    }

    getCreditorCertificateForm() {
        this.creditorCertificateForm = this.fb.group({
            creditorCertificateInfo:this.clientInfoForm.getcreditorCertificateInfoForm()
        });
    }


    get form() {
        return this.creditorCertificateForm;
    }


}
