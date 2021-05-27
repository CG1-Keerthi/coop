import { Component, ElementRef, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../_services/constants/MDDateFormate';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../_services/ds';
import { MDCommonGetterSetter } from '../../../_services/common';
import { ClientDetailFormBuilderService } from "../../../form-builder/clientMaintenance/clientDetails/client-detail-form-builder.service";
import { ClientAddressDetailFormBuilderService } from "../../../form-builder/clientMaintenance/clientAddressdetails/client-address-detail-form-builder.service";
declare var $: any;


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
            this.isUpdateDateFieldReadonly = false;
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
            this.clientAddressList = data.clientAddressInfo.clientAddressInfo;
            this.clientDetailsValues = data;
            this.isClientAddressDisable = false;
            this.isDateUpdate = "Date";
            this.clientDetailsForm.value.clientInfo.lastUpdateDate = this.clientDetailsForm.value.clientInfo.clientEffectiveDate;
            this.clientDetailsForm.value.clientInfo.clientStatusEndDate = this.clientDetailsForm.value.clientInfo.clientTerminationDate;
            this.clientDetailsForm.value.clientInfo.currentRecordFlag = "Y";
            this.clientAddressForm.value.clientAddressInfo.currentRecordFlag = "Y";

        } else {
            this.clientDetailsForm.reset();
            this.clientAddressList = [];
            this.clientAddressForm.reset();
            this.isFieldreadonly = false;
            this.isClientAddressDisable = true;
            this.isTerminationDateFieldreadonly = true;
            this.isUpdateDateFieldReadonly = true;
            this.isDateUpdate = "";
            this.clientDetailsValues.clientInfo.clientIdentifier = undefined;
            this.renderer.setAttribute(this.clientStatusList.nativeElement, 'disabled', 'true');
            this.renderer.setProperty(this.clientProvinceList.nativeElement, 'disabled', false);
            this.renderer.setProperty(this.clientLanguageList.nativeElement, 'disabled', false);
            this.renderer.setProperty(this.clientSubmit.nativeElement, 'disabled', false);
            this.renderer.setAttribute(this.clientAddressSubmit.nativeElement, 'disabled', 'true');
            // this.clientDetailsForm.value.clientInfo.lastUpdateDate = "";

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
    public isAddressSubmit: boolean = false;
    // public clientIdentifier: string;
    public recentAddress: any;
    public isUpdateDateFieldReadonly: boolean;
    public clientAddressIdentifier: string;
    public isUpdate: string;
    public isDateUpdate: string;
  

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
        this.clientDetailsForm.reset();
    }

    onClickOfClientSubmit() {
        if (this.clientDetailsForm.value.clientInfo.clientNumber == null && this.clientDetailsForm.value.clientInfo.clientName == null &&
            this.clientDetailsForm.value.clientInfo.clientEffectiveDate == null && this.clientDetailsForm.value.clientInfo.clientProvinceCode == null &&
            this.clientDetailsForm.value.clientInfo.clientLanguageCode == null) {
            this.isSubmit = true;
            this.mdMondServiceDS.showErrorMessage("Please fill out the field.");
            return
        }
        if (this.isDateUpdate != "Date") {
            this.clientDetailsForm.value.clientInfo.lastUpdateDate = "";
            this.clientDetailsForm.value.clientInfo.clientStatusEndDate = "";
        }

        this.isDateUpdate = "";
        if (this.isUpdate != 'update') {
            this.clientDetailsForm.value.clientInfo.currentRecordFlag = "N";
        }
        this.isUpdate = "";
        if (this.clientDetailsValues != undefined) {
            this.clientDetailsForm.value.clientInfo.clientIdentifier = this.clientDetailsValues.clientInfo.clientIdentifier;
            this.clientDetailsValues.clientInfo.clientIdentifier = undefined;
        } else {
            this.clientDetailsForm.value.clientInfo.clientIdentifier = this.clientDetailsValues;
        }

        if (this.fromDateVal != undefined) {
            this.clientDetailsForm.value.clientInfo.clientEffectiveDate = this.fromDateVal;
        }

        if (this.tillDateVal != undefined) {
            this.clientDetailsForm.value.clientInfo.clientTerminationDate = this.tillDateVal;
        }

        if (this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag == true || this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag == "Y") {
            this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag = "Y"
        } else {
            this.clientDetailsForm.value.clientInfo.clientProfitSharingFlag = "N"
        }

        if (this.clientDetailsForm.value.clientInfo.groupPolicyHolder == true || this.clientDetailsForm.value.clientInfo.groupPolicyHolder == "Y") {
            this.clientDetailsForm.value.clientInfo.groupPolicyHolder = "YES"
        } else {
            this.clientDetailsForm.value.clientInfo.groupPolicyHolder = "NO"
        }

        console.log('Form Submitted with value: ', JSON.stringify(this.clientDetailsForm.value));
        let formData = btoa(JSON.stringify(this.clientDetailsForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveClientData-V2", "1.00", formData, this.csfrToken, true, true, true,true).subscribe(
            data => {
                // console.log("onClickOfClientSubmit data", data);
                this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

            }, error => {                
                this.mdMondServiceDS.MDError(error);           
            });

    }

    clientEffectiveDateKeyup(event) {
        this.fromDateVal = this.fromDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfTerminationDate(event) {
        this.tillDateVal = this.tillDate.nativeElement.value + "T00:00:00.000Z";
    }
    onClickOfClientAddressListRow(event) {
        let addressRowData = this.fb.group({
            clientAddressInfo: event.data
        });
        this.clientAddressIdentifier = addressRowData.value.clientAddressInfo.clientAddressIdentifier;
        this.clientAddressForm.patchValue(addressRowData.value);
        // this.clientIdentifier = addressRowData.value.clientAddressInfo.clientIdentifier;
        this.isAddressFieldreadonly = true;
        this.renderer.setAttribute(this.addressTypeList.nativeElement, 'disabled', 'true');
        this.renderer.setAttribute(this.provinceCodeList.nativeElement, 'disabled', 'true');
        this.renderer.setAttribute(this.countryAddress.nativeElement, 'disabled', 'true');
    }

    onClickOfClientAddressSubmit() {
        if (this.clientAddressForm.value.clientAddressInfo.addressType != undefined) {
            if (this.clientAddressForm.value.clientAddressInfo.addressType == null && this.clientAddressForm.value.clientAddressInfo.addressEffectiveDate == null) {
                this.isAddressSubmit = true;
                this.mdMondServiceDS.showErrorMessage("Please fill out the field.");
                return;
            }
        }
        if (this.isUpdate != 'updateAddress') {
            this.clientAddressForm.value.clientAddressInfo.currentRecordFlag = "N";
        }
        this.isUpdate = "";
        this.clientAddressForm.value.clientAddressInfo.clientAddressIdentifier = this.clientAddressIdentifier;
        this.clientAddressIdentifier = "";
        if (this.addEffDateVal != undefined) {
            this.clientAddressForm.value.clientAddressInfo.addressEffectiveDate = this.addEffDateVal;
        }
        if (this.addTerDateVal != undefined) {
            this.clientAddressForm.value.clientAddressInfo.addressTerminationDate = this.addTerDateVal;
        }
        this.clientAddressForm.value.clientAddressInfo.clientIdentifier = this.clientDetailsValues.clientInfo.clientIdentifier;
        this.clientAddressForm.value.clientAddressInfo.clientNumber = this.clientDetailsValues.clientInfo.clientNumber;
        let formData = btoa(JSON.stringify(this.clientAddressForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveClientAddressData-V2", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
            data => {
                // console.log("onClickOfClientSubmit data", data);
                let newAddressList = JSON.parse(atob(data)).clientAddressInfo.clientAddressInfo
                this.clientAddressList = [];
                for(var i=0; i<newAddressList.length; i++){                   
                    this.clientAddressList.push(newAddressList[i]);
                }
                this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);         
                this.clientAddressForm.reset();
                
            }, error => {
                this.mdMondServiceDS.MDError(error);         
            //    let data = "eyJjbGllbnRBZGRyZXNzSW5mbyI6eyJjbGllbnRBZGRyZXNzSW5mbyI6W3siY291bnRyeSI6IkNhbmFkYSIsImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNpdHkiOiJSTlIiLCJhZGRyZXNzVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA1LTA0VDA0OjQxOjQxLjAwMFoiLCJjbGllbnRJZGVudGlmaWVyIjo2OCwicG9zdGFsQ29kZSI6IjEyMzQiLCJhZGRyZXNzRWZmZWN0aXZlRGF0ZSI6IjIwMjEtMDUtMDNUMDA6MDA6MDAuMDAwWiIsImNsaWVudE51bWJlciI6IjQ4IiwicHJvdmluY2UiOiJJRCIsImNsaWVudEFkZHJlc3NJZGVudGlmaWVyIjoxMjAsImFkZHJlc3NMaW5lMSI6IkxpbmUxIiwiYWRkcmVzc0xpbmUyIjoiTGluZTIifSx7ImNvdW50cnkiOiJDYW5hZGEiLCJjdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjaXR5IjoiY2l0eSIsImFkZHJlc3NUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJhZGRyZXNzVHlwZSI6Ik1haWxpbmciLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDUtMDRUMDU6MTA6NDEuMDAwWiIsImNsaWVudElkZW50aWZpZXIiOjY4LCJwb3N0YWxDb2RlIjoiMTExMSIsImFkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIiwiY2xpZW50TnVtYmVyIjoiNDgiLCJwcm92aW5jZSI6IkhJIiwiY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjEyMSwiYWRkcmVzc0xpbmUxIjoibGluZTEiLCJhZGRyZXNzTGluZTIiOiJsaW5lMiJ9XX0sIm1lc3NhZ2UiOiJSZWNvcmQgSW5zZXJ0ZWQgU3VjY2Vzc2Z1bGx5Iiwic3RhdHVzIjoiU3VjY2VzcyJ9"
            });
    }

    onClickOfAddEffDate(event) {
        this.addEffDateVal = this.addEffDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfAddTerminationDate(event) {
        this.addTerDateVal = this.addTerDate.nativeElement.value + "T00:00:00.000Z";
    }

    onClickOfClientUpdatePlan() {
        this.isUpdate = "update";
        this.isFieldreadonly = false;
        this.isTerminationDateFieldreadonly = false;
        this.renderer.setProperty(this.clientStatusList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientProvinceList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientLanguageList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientSubmit.nativeElement, 'disabled', false);
    }

    onClickOfClientAddressUpdatePlan() {
        if (this.clientAddressForm.value.clientAddressInfo.addressType == "" || this.clientAddressForm.value.clientAddressInfo.addressType == null) {
            this.mdMondServiceDS.showErrorMessage("please select a row");
            return;
        }
        this.isUpdate = 'updateAddress';
        this.isAddressFieldreadonly = false;
        this.isAddressterminationDateFieldreadonly = false;
        this.renderer.setProperty(this.addressTypeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.provinceCodeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.countryAddress.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientAddressSubmit.nativeElement, 'disabled', false);
    }

    onClickOfClientAddAddress() {
        this.clientAddressForm.reset();
        this.isAddressFieldreadonly = false;
        this.isAddressterminationDateFieldreadonly = true;
        this.renderer.setProperty(this.addressTypeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.provinceCodeList.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.countryAddress.nativeElement, 'disabled', false);
        this.renderer.setProperty(this.clientAddressSubmit.nativeElement, 'disabled', false);
    }


    onClickOfHistoricalAddress() { 
        $("#historicalModelId").click();
        let formVariables = JSON.stringify({ "clientId": this.clientDetailsValues.clientInfo.clientIdentifier });
        this.mdMondServiceDS.getFormDataDebugLevel('Creditor Self Admin', 'BasedOnService', 'FetchClientAddressHistory', '1.00', formVariables, new Date().getTime()).subscribe(
            res => {
                var decodedData = atob(res.value);
                var parseDecodeData = JSON.parse(decodedData);
                this.recentAddress = parseDecodeData.clientAddressInfo_clientAddressInfo;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = "eyJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRBZGRyZXNzSW5mbyI6W3siY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1R5cGUiOiJCaWxsaW5nIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudEFkZHJlc3NJZGVudGlmaWVyIjo0MywiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI5VDA1OjMyOjE1LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiY29kZSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJLUyIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6IjEyMzQ1NiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudElkZW50aWZpZXIiOjEyLCJjbGllbnRBZGRyZXNzSW5mb19jaXR5IjoiY2l0eSIsImNsaWVudEFkZHJlc3NJbmZvX2NvdW50cnkiOiJDYW5hZGEiLCJjbGllbnRBZGRyZXNzSW5mb19jdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTIiOiJsaW5lMiIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NMaW5lMSI6ImxpbmUxIn0seyJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjMwLCJjbGllbnRBZGRyZXNzSW5mb19sYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDQtMjdUMDU6MTQ6NDIuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX3Bvc3RhbENvZGUiOiJjb2RlIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTI3VDAwOjAwOjAwLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wcm92aW5jZSI6IkFCIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50TnVtYmVyIjoiMTIzNDU2IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MTIsImNsaWVudEFkZHJlc3NJbmZvX2NpdHkiOiJjaXR5IiwiY2xpZW50QWRkcmVzc0luZm9fY291bnRyeSI6IkNhbmFkYSIsImNsaWVudEFkZHJlc3NJbmZvX2N1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NMaW5lMiI6ImxpbmUyIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUxIjoibGluZTEifV19";
                //   let data = {"key":"key","value":"eyJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRBZGRyZXNzSW5mbyI6W3siY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudEFkZHJlc3NJZGVudGlmaWVyIjo0MiwiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI5VDA1OjI5OjA4LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiMTExMSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUeXBlIjoiQmlsbGluZyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0yOVQwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJJTiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6IjI3IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MzAsImNsaWVudEFkZHJlc3NJbmZvX2NpdHkiOiJCYW5nYWxvcmUiLCJjbGllbnRBZGRyZXNzSW5mb19jb3VudHJ5IjoiQ2FuYWRhIiwiY2xpZW50QWRkcmVzc0luZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUyIjoiU3VpdGUgMzAwIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUxIjoiNDk1IFJpY2htb25kIFN0In0seyJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjQ1LCJjbGllbnRBZGRyZXNzSW5mb19sYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDQtMjlUMDY6MDc6MDYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX3Bvc3RhbENvZGUiOiJjb2RlIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTI4VDAwOjAwOjAwLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wcm92aW5jZSI6IkhJIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50TnVtYmVyIjoiMjciLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRJZGVudGlmaWVyIjozMCwiY2xpZW50QWRkcmVzc0luZm9fY2l0eSI6ImNpdHkiLCJjbGllbnRBZGRyZXNzSW5mb19jb3VudHJ5IjoiQ2FuYWRhIiwiY2xpZW50QWRkcmVzc0luZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUyIjoibGluZTIiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTEiOiJsaW5lMSJ9LHsiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudEFkZHJlc3NJZGVudGlmaWVyIjo0NCwiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI5VDA2OjAzOjE3LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiY29kZSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUeXBlIjoiTWFpbGluZyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJDQSIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6IjI3IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MzAsImNsaWVudEFkZHJlc3NJbmZvX2NpdHkiOiJjaXR5IiwiY2xpZW50QWRkcmVzc0luZm9fY291bnRyeSI6IkNhbmFkYSIsImNsaWVudEFkZHJlc3NJbmZvX2N1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NMaW5lMiI6ImxpbmUyIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUxIjoibGluZTEifV19"};

                //     var decodedData = atob(data.value);
                //     var parseDecodeData = JSON.parse(decodedData);
                //     this.recentAddress = parseDecodeData.clientAddressInfo_clientAddressInfo;
            });
    }

}