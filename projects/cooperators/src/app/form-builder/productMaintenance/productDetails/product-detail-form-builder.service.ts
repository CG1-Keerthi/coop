import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ProductDetailFormBuilderModule } from './product-detail-form.module';
import { ProductInfoFormBuilderService } from './product-info-form-builder.service';

/**
 * This is the Service TS file for PPP Form Builder, It contains methods related to PPP Form Builder
 */

@Injectable({
    providedIn: ProductDetailFormBuilderModule
})

export class ProductDetailFormBuilderService {

    public productDetailForm: FormGroup;

    /**
    * This is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses
    */
    constructor(private fb: FormBuilder,
        private productInfoForm: ProductInfoFormBuilderService) {
        this.getProductDetailForm()
    }

    getProductDetailForm() {
        this.productDetailForm = this.fb.group({
            productInfo: this.productInfoForm.getProductInfoForm()        
        });
    }


    get form() {
        return this.productDetailForm;
    }


}
