import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RateDetailFormBuilderService } from '../../../form-builder/rateDetails/rate-detail-form-builder.service';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../_services/ds';
import { MDCommonGetterSetter } from '../../../_services/common';

declare var $: any;



@Component({
    selector: 'app-ratingDetails-designer',
    templateUrl: './ratingDetails.component.html',
    styleUrls: ['./ratingDetails.component.css'],

})

export class RatingDetailsComponent implements OnInit {
    @Input() set rateDetails(data) {
        if (Object.keys(data).length > 0) {
            debugger;
            this.isGridShow = true;
            this.isSubmitBtn = true;
            this.isUpdateBtn = false;
            this.isFieldreadonly = true;
            this.addRow = "";
            this.rateGridData = data.planRatingStructureHeader.PlanRatingStructureDetails;
            for (let i = 0; i < this.rateGridData.length; i++) {
                let rateFormArray = (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails'));
                for (let j = 0; j < rateFormArray.length; j++) {
                    if (rateFormArray.length < this.rateGridData.length) {
                        rateFormArray.push(
                            this.fb.group({
                                loanAmountStartValue: [''],
                                loanAmountEndValue: [''],
                                multiLife: [''],
                                multiLifeTerm: [''],
                                coverageCodeInPlanRatingStructure: [''],
                                termStartValue: [''],
                                termEndValue: [''],
                                ageStartValue: [''],
                                ageEndValue: [''],
                                eliminationPeriodInPlanRatingStructure: [''],
                                premiumAmountInPlanRatingStructure: [''],
                                rateStructureDetailsId: [''],
                                rateStructureHeaderId: ['']
                            })
                        )
                    }
                }
            }
            this.rateDetailsForm.patchValue(data);
        } else {
            this.isGridShow = false;
            this.isSubmitBtn = false;
            this.isUpdateBtn = true;
            this.isFieldreadonly = false;
            this.rateDetailsForm = this.fb.group({
                planRatingStructureHeader: this.fb.group({
                    rateName: [''],
                    rateType: [''],
                    jointLifeMultiplier: ['0.925'],
                    toleranceLevel: ['0.02'],
                    PlanRatingStructureDetails: this.fb.array([
                        this.fb.group({
                            loanAmountStartValue: [''],
                            loanAmountEndValue: [''],
                            multiLife: [''],
                            multiLifeTerm: [''],
                            coverageCodeInPlanRatingStructure: [''],
                            termStartValue: [''],
                            termEndValue: [''],
                            ageStartValue: [''],
                            ageEndValue: [''],
                            eliminationPeriodInPlanRatingStructure: [''],
                            premiumAmountInPlanRatingStructure: [''],
                            rateStructureDetailsId: [''],
                            rateStructureHeaderId: ['']
                        })
                    ])
                })
            });
            this.addRow = "addRow";
        }
    }


    public premiumProvinceList: any;
    rateDetailsForm: FormGroup;
    public rateGridData: any = [];
    public csfrToken: any;
    public isGridShow: boolean = false;
    public isSubmitBtn: boolean = false;
    public isUpdateBtn: boolean = false;
    public isFieldreadonly: boolean = false;
    public premium: any;
    public addRow: string;
    public rateFormArray: any;
    constructor(private http: HttpClient,
        private rateDetailService: RateDetailFormBuilderService,
        private fb: FormBuilder,
        private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterAndSetter: MDCommonGetterSetter) { }

    ngOnInit() {
        // debugger;
        this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
            if (data) {
                this.csfrToken = data;
            }
        });
        this.rateDetailsForm = this.rateDetailService.form;
    }

    addSpinnerLimits() {
        debugger;
        var num = parseFloat($('#jointLifeMultiplier').val()) + 0.025;
        var newNum = num.toFixed(3);
        $("#jointLifeMultiplier").val(newNum);

    }

    subSpinnerLimits() {
        debugger;
        var num = parseFloat($('#jointLifeMultiplier').val()) - 0.025;
        var newNum = num.toFixed(3);
        $("#jointLifeMultiplier").val(newNum);
        if ($('#jointLifeMultiplier').val() == 0 || $('#jointLifeMultiplier').val() < 0) {
            $('#jointLifeMultiplier').val(0.025);
        }
    }

    addToleranceSpinnerLimits() {
        var num = parseFloat($('#toleranceLevel').val()) + 0.02;
        var newNum = num.toFixed(2);
        $('#toleranceLevel').val(newNum);
    }

    subToleranceSpinnerLimits() {
        var num = parseFloat($('#toleranceLevel').val()) - 0.02;
        var numVal = num.toFixed(2)
        $('#toleranceLevel').val(numVal);
        if ($('#toleranceLevel').val() == 0 || $('#toleranceLevel').val() < 0) {
            $('#toleranceLevel').val(0.02);
        }
    }

    addTable() {
        debugger;
        this.rateFormArray = (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails'));
        if (this.addRow == "addRow") {
            this.isGridShow = true;
            this.addRow = "";
        } else if ((this.rateFormArray.length == 1) || (this.rateFormArray.length > 1)) {
            this.isGridShow = true;
            this.createRow();
        } else {
            this.isGridShow = true;
            this.createRow();
        }
    }

    createRow() {
        this.rateFormArray.push(
            this.fb.group({
                loanAmountStartValue: [''],
                loanAmountEndValue: [''],
                multiLife: [''],
                multiLifeTerm: [''],
                coverageCodeInPlanRatingStructure: [''],
                termStartValue: [''],
                termEndValue: [''],
                ageStartValue: [''],
                ageEndValue: [''],
                eliminationPeriodInPlanRatingStructure: [''],
                premiumAmountInPlanRatingStructure: [''],
                rateStructureDetailsId: [''],
                rateStructureHeaderId: ['']
            })
        )
    }

    deleteRow(index) {
        debugger
        (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails')).removeAt(index);
    }

    onClickOfRateUpdate() {
        this.isSubmitBtn = false;
        this.isFieldreadonly = false;
    }
    onClickOfRateSubmit() {
        debugger;
        this.rateDetailsForm.value
        let formData = btoa(JSON.stringify(this.rateDetailsForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanRateStructureData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
            data => {
                // console.log("onClickOfRateSubmit data", data);
                this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

            }, error => {
                debugger;
                this.mdMondServiceDS.MDError(error);
                // let data = "eyJtZXNzYWdlIjoiUmVjb3JkIEluc2VydGVkIFN1Y2Nlc3NmdWxseSIsInBsYW5SYXRpbmdTdHJ1Y3R1cmVIZWFkZXIiOnsicmF0ZVR5cGUiOiJIaWdoIiwicmF0ZU5hbWUiOiJUZXN0MiIsImpvaW50TGlmZU11bHRpcGxpZXIiOjAuOTI1LCJ0b2xlcmFuY2VMZXZlbCI6MC4wMiwiUGxhblJhdGluZ1N0cnVjdHVyZURldGFpbHMiOlt7ImFnZVN0YXJ0VmFsdWUiOjE2LCJlbGltaW5hdGlvblBlcmlvZEluUGxhblJhdGluZ1N0cnVjdHVyZSI6IjE4IiwiY292ZXJhZ2VDb2RlSW5QbGFuUmF0aW5nU3RydWN0dXJlIjoiMTMiLCJhZ2VFbmRWYWx1ZSI6MTcsInByZW1pdW1BbW91bnRJblBsYW5SYXRpbmdTdHJ1Y3R1cmUiOjE5LCJ0ZXJtU3RhcnRWYWx1ZSI6MTQsIm11bHRpTGlmZVRlcm0iOiJTYW1lIiwibG9hbkFtb3VudEVuZFZhbHVlIjoxMiwibG9hbkFtb3VudFN0YXJ0VmFsdWUiOjExLCJtdWx0aUxpZmUiOiJZZXMiLCJ0ZXJtRW5kVmFsdWUiOjE1fV19LCJzdGF0dXMiOiJTdWNjZXNzIn0\u003d";
                // this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

            });
    }

}