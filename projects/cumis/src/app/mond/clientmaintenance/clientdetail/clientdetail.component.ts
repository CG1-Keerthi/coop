import { Component, ElementRef, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../_services/constants/MDDateFormate';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../_services/ds';
import { MDCommonGetterSetter } from '../../../_services/common';
import { ClientDetailFormBuilderService } from "../../../form-builder/clientMaintenance/clientDetails/client-detail-form-builder.service";
import { ClientAddressDetailFormBuilderService } from "../../../form-builder/clientMaintenance/clientAddressdetails/client-address-detail-form-builder.service";



@Component({
    selector: 'app-clientdetail-designer',
    templateUrl: './clientdetail.component.html',
    styleUrls: ['./clientdetail.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]

})

export class ClientDetailComponent implements OnInit {
    @Input() set clientDetails(data) {
        console.log("clientDetails-Data", data)
        if (Object.keys(data).length > 0) {
            this.isFieldreadonly = true;
            this.isTerminationDateFieldreadonly = true;
            this.isAddressterminationDateFieldreadonly = true;
            // this.isAddressFieldreadonly = false;
            this.renderer.setAttribute(this.clientStatusList.nativeElement, 'disabled', 'true');
            this.renderer.setAttribute(this.clientProvinceList.nativeElement, 'disabled', 'true');
            this.renderer.setAttribute(this.clientLanguageList.nativeElement, 'disabled', 'true');
            this.renderer.setAttribute(this.clientSubmit.nativeElement, 'disabled', 'true');
            this.renderer.setAttribute(this.clientAddressSubmit.nativeElement, 'disabled', 'true');
            this.clientDetailsForm.reset();
            // this.clientAddressList = [];
            this.clientAddressForm.reset();
            this.clientDetailsForm.patchValue(data);
            this.clientAddressList = data.clientAddressInfo_clientAddressInfo;
            this.clientDetailsValues = data;
            this.isClientAddressDisable = false;

        } else {
            this.clientDetailsForm.reset();
            this.clientAddressList = [];
            this.clientAddressForm.reset();
            this.isFieldreadonly = false;
            this.isClientAddressDisable = true;
            this.isTerminationDateFieldreadonly = true;
            this.renderer.setAttribute(this.clientStatusList.nativeElement, 'disabled', 'true');
            this.renderer.setProperty(this.clientProvinceList.nativeElement, 'disabled', false);
            this.renderer.setProperty(this.clientLanguageList.nativeElement, 'disabled', false);
            this.renderer.setProperty(this.clientSubmit.nativeElement, 'disabled', false);
            this.renderer.setAttribute(this.clientAddressSubmit.nativeElement, 'disabled', 'true');
        }

    }
    clientDetailsForm: FormGroup;
    clientAddressForm: FormGroup;
    public isFieldreadonly: boolean = true;
    public butDisabled: boolean = true;
    public isTerminationDateFieldreadonly: boolean = true;
    public isAddressFieldreadonly: boolean;
    public isAddressterminationDateFieldreadonly: boolean = true;
    public clientStatus: any;
    public clientLanguage: any = [];
    public clientProvinceCode: any = [];
    public addressType: any = [];
    public countryList: any = [];
    public csfrToken: string;
    public clientAddressList: any;
    public clientDetailsValues: any;
    public isClientAddressDisable: boolean;
    public fromDateVal: any;
    public tillDateVal: any;
    public addEffDateVal: any;
    public addTerDateVal: any;
    public isSubmit: boolean = false;

    @ViewChild('clientStatusList') clientStatusList: ElementRef;
    @ViewChild('clientProvinceList') clientProvinceList: ElementRef;
    @ViewChild('clientLanguageList') clientLanguageList: ElementRef;
    @ViewChild('clientSubmit') clientSubmit: ElementRef;
    @ViewChild('addressTypeList') addressTypeList: ElementRef;
    @ViewChild('provinceCodeList') provinceCodeList: ElementRef;
    @ViewChild('countryAddress') countryAddress: ElementRef;
    @ViewChild('clientAddressSubmit') clientAddressSubmit: ElementRef;
    @ViewChild('fromDate') fromDate: ElementRef;
    @ViewChild('tillDate') tillDate: ElementRef;
    @ViewChild('addEffDate') addEffDate: ElementRef;
    @ViewChild('addTerDate') addTerDate: ElementRef;
    constructor(private mdCodeListHeaderDS: MDCodeListHeaderDS,
        private mdMondServiceDS: MDMondServiceDS,
        private fb: FormBuilder,
        private mdCommonGetterAndSetter: MDCommonGetterSetter,
        private renderer: Renderer2,
        private clientDetailervice: ClientDetailFormBuilderService,
        private clientAddressDetailService: ClientAddressDetailFormBuilderService) { }


    ngOnInit() {

        this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
            if (data) {
                this.csfrToken = data;
            }
        });

        this.clientDetailsForm = this.clientDetailervice.form;
        this.clientAddressForm = this.clientAddressDetailService.form;

        this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ClientStatus').subscribe(
            data => {
                this.clientStatus = data;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                console.log(error);
                // let data = [{ "codeListValuesId": 145716, "codeListHeaderId": 1578, "code": "1", "description": "Active" }, { "codeListValuesId": 145717, "codeListHeaderId": 1578, "code": "2", "description": "Terminated" }];
                // this.clientStatus = data;
            });

        this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LanguageCode').subscribe(
            data => {
                this.clientLanguage = data;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = [{ "codeListValuesId": 145695, "codeListHeaderId": 1575, "code": "1", "description": "English" }, { "codeListValuesId": 145697, "codeListHeaderId": 1575, "code": "2", "description": "French" }]
                // this.clientLanguage = data;
            });

        this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ClientAddressProvince').subscribe(
            data => {
                this.clientProvinceCode = data;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = [{ "codeListValuesId": 145758, "codeListHeaderId": 1583, "code": "AB", "description": "AB" }, { "codeListValuesId": 145759, "codeListHeaderId": 1583, "code": "BC", "description": "BC" }, { "codeListValuesId": 145760, "codeListHeaderId": 1583, "code": "AL", "description": "AL" }, { "codeListValuesId": 145761, "codeListHeaderId": 1583, "code": "AR", "description": "AR" }];
                // this.clientProvinceCode = data;
            });

        this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ClientAddressType').subscribe(
            data => {
                this.addressType = data;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = [{ "codeListValuesId": 145756, "codeListHeaderId": 1582, "code": "1", "description": "Mailing" }, { "codeListValuesId": 145757, "codeListHeaderId": 1582, "code": "2", "description": "Billing" }];
                // this.addressType = data;
            });
        this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ClientAddressCountry').subscribe(
            data => {
                this.countryList = data;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = [{ "codeListValuesId": 145754, "codeListHeaderId": 1581, "code": "CA", "description": "Canada" }, { "codeListValuesId": 145755, "codeListHeaderId": 1581, "code": "US", "description": "United States" }];
                // this.countryList = data;
            });

    }


    onClickOfClientClear() {
        debugger;
        this.clientDetailsForm.reset();
    }

    onClickOfClientSubmit() {
        debugger;
        this.isSubmit = true;
        this.clientDetailsForm.value
        this.clientDetailsForm.value.clientInfo.clientEffectiveDate = this.fromDateVal;
        if (this.tillDateVal != undefined) {
            this.clientDetailsForm.value.clientInfo.clientTerminationDate = this.tillDateVal;
        }

        if (this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag == true) {
            this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag = "Y"
        } else {
            this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag = "N"
        }

        if (this.clientDetailsForm.value.clientInfo.groupPolicyHolder == true) {
            this.clientDetailsForm.value.clientInfo.groupPolicyHolder = "YES"
        } else {
            this.clientDetailsForm.value.clientInfo.groupPolicyHolder = "NO"
        }

        console.log('Form Submitted with value: ', JSON.stringify(this.clientDetailsForm.value));
        let formData = btoa(JSON.stringify(this.clientDetailsForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveClientData", "1.00", formData, this.csfrToken, true, true, true).subscribe(
            data => {
                console.log("onClickOfClientSubmit data", data);
                this.mdMondServiceDS.showSuccessMessage("Client Record Inserted Successfully");

            }, error => {
                this.mdMondServiceDS.MDError(error);

            });

    }

    clientEffectiveDateKeyup(event) {
        debugger;
        this.fromDateVal = this.fromDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfTerminationDate(event) {
        this.tillDateVal = this.tillDate.nativeElement.value + "T00:00:00.000Z";
    }
    onClickOfClientAddressListRow(event) {
        debugger;
        this.clientAddressForm.patchValue(event.data);
        this.isAddressFieldreadonly = true;
        this.renderer.setAttribute(this.addressTypeList.nativeElement, 'disabled', 'true');
        this.renderer.setAttribute(this.provinceCodeList.nativeElement, 'disabled', 'true');
        this.renderer.setAttribute(this.countryAddress.nativeElement, 'disabled', 'true');

    }

    onClickOfClientAddressSubmit() {
        debugger;
        this.isSubmit = true;
        this.clientAddressForm.value
        this.clientAddressForm.value.clientAddressInfo.addressEffectiveDate = this.addEffDateVal;
        if (this.addTerDateVal != undefined) {
            this.clientAddressForm.value.clientAddressInfo.addressTerminationDate = this.addTerDateVal;
        }
        this.clientAddressForm.value.clientAddressInfo.clientIdentifier = this.clientDetailsValues.clientInfo.clientIdentifier;
        this.clientAddressForm.value.clientAddressInfo.clientNumber = this.clientDetailsValues.clientInfo.clientNumber;
        let formData = btoa(JSON.stringify(this.clientAddressForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveClientAddressData", "1.00", formData, this.csfrToken, true, true, true).subscribe(
            data => {
                console.log("onClickOfClientSubmit data", data);
                this.mdMondServiceDS.showSuccessMessage("Client Address Record Inserted Successfully");
            }, error => {
                this.mdMondServiceDS.MDError(error);
            });
    }

    onClickOfAddEffDate(event) {
        this.addEffDateVal = this.addEffDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfAddTerminationDate(event) {
        this.addTerDateVal = this.addTerDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfClientUpdatePlan() {
        debugger
        this.isFieldreadonly = false;
        this.isTerminationDateFieldreadonly = false;
        this.renderer.setProperty(this.clientStatusList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientProvinceList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientLanguageList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientSubmit.nativeElement, 'disabled', false);
    }

    onClickOfClientAddressUpdatePlan() {
        debugger;
        if (this.clientAddressForm.value.clientAddressInfo_addressType == "" || this.clientAddressForm.value.clientAddressInfo_addressType == null) {
            this.mdMondServiceDS.showErrorMessage("please select a row");
            return;
        }
        this.isAddressFieldreadonly = false;
        this.isAddressterminationDateFieldreadonly = false;
        this.renderer.setProperty(this.addressTypeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.provinceCodeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.countryAddress.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientAddressSubmit.nativeElement, 'disabled', false);
    }

    onClickOfClientAddAddress() {
        debugger
        this.clientAddressForm.reset();
        this.isAddressFieldreadonly = false;
        this.isAddressterminationDateFieldreadonly = true;
        this.renderer.setProperty(this.addressTypeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.provinceCodeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.countryAddress.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientAddressSubmit.nativeElement, 'disabled', false);
    }

}