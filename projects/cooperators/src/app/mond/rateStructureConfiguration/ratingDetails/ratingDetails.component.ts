import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            this.isGridShow = false;
            this.isSubmitBtn = true;
            this.isUpdateBtn = false;
            this.isFieldreadonly = true;
            this.rateGridData = data.planRatingStructureHeader.PlanRatingStructureDetails;
            if (this.rateGridData != undefined) {
                this.isGridShow = true;
                this.addRow = "";
                for (let i = 0; i < this.rateGridData.length; i++) {
                    this.rateFormArray = (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails'));
                    if (this.rateFormArray.length == 0) {
                        this.createRow();
                    }
                    for (let j = 0; j < this.rateFormArray.length; j++) {
                        // if formcontrol have length greater than or less than from rategrid array                       
                        if (this.rateFormArray.length < this.rateGridData.length) {
                            this.createRow();
                        } else if (this.rateFormArray.length > this.rateGridData.length) {
                            if (this.rateFormArray.value[j].loanAmountStartValue == null) {
                                (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails')).removeAt(j);
                            } else {
                                (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails')).removeAt(j);
                            }
                        }
                    }
                }
                this.checkGrid();
            }
            this.checkGrid();
            if (this.rateFormArray.length != this.rateGridData.length) {
                this.checkGrid();
            }
            this.rateDetailsForm.reset();
            this.rateDetailsForm.patchValue(data);
        } else {
            this.isGridShow = false;
            this.isSubmitBtn = false;
            this.isUpdateBtn = true;
            this.isFieldreadonly = false;
            this.rateDetailsForm.reset();
            this.rateDetailsForm = this.fb.group({
                planRatingStructureHeader: this.fb.group({
                    rateName: [''],
                    rateType: [''],
                    jointLifeMultiplier: ['0.925'],
                    toleranceLevel: ['0.02'],
                    rateStructureHeaderId: [''],
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
    public isSubmit: boolean = false;
    public startAmount: number;
    public endAmount: number;
    public termStart: number;
    public termEnd: number;
    public ageStart: number;
    public ageEnd: number;
    public isOnKeyUp: string = 'false';
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

    checkGrid() {
        if (this.rateFormArray.length != this.rateGridData.length) {
            debugger;
            for (let j = 0; j < this.rateFormArray.length; j++) {
                if (this.rateFormArray.length > this.rateGridData.length) {
                    {
                        (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails')).removeAt(j);
                    }
                }
            }
        }
    }

    deleteRow(index) {
        (<FormArray>this.rateDetailsForm.get('planRatingStructureHeader.PlanRatingStructureDetails')).removeAt(index);
    }

    onClickOfRateUpdate() {
        this.isSubmitBtn = false;
        this.isFieldreadonly = false;
    }
    onClickOfRateSubmit() {
        if (this.rateDetailsForm.value.planRatingStructureHeader.rateName == "" && this.rateDetailsForm.value.planRatingStructureHeader.rateType == "") {
            this.isSubmit = true;
            this.mdMondServiceDS.showErrorMessage("Please fill out the field.");
            return;
        }

        if ((this.endAmount < this.startAmount) || (this.termEnd < this.termStart) || (this.ageEnd < this.ageStart)) {
            this.mdMondServiceDS.showErrorMessage("Please fill out the field properly in the rate detail grid.");
            return;
        }

        this.isSubmit = false;
        if (this.rateDetailsForm.value.planRatingStructureHeader.rateStructureHeaderId == "") {
            this.rateDetailsForm.value.planRatingStructureHeader.rateStructureHeaderId = undefined;
        }
        this.rateDetailsForm.value
        let formData = btoa(JSON.stringify(this.rateDetailsForm.value));
        this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanRateStructureData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
            data => {
                // console.log("onClickOfRateSubmit data", data);
                this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);
            }, error => {
                this.mdMondServiceDS.MDError(error);
            });
    }
    onKeyUpOfStartAmount(event) {
        this.startAmount = event.target.value;
    }
    onKeyUpOfEndAmount(event) {
        this.endAmount = event.target.value;
        if (this.endAmount < this.startAmount) {
            this.mdMondServiceDS.showErrorMessage("Loan End Amount should be greater than Loan Start Amount");
            return;
        }
    }

    onKeyUpOfTermStart(event) {
        this.termStart = event.target.value;
    }

    onKeyUpOfTermEnd(event) {
        this.termEnd = event.target.value;
        if (this.termEnd < this.termStart) {
            this.mdMondServiceDS.showErrorMessage("Term End should be greater than Term Start");
            return;
        }
    }

    onKeyUpOfAgeStart(event) {
        this.ageStart = event.target.value;
    }

    onKeyUpOfAgeEnd(event) {
        this.ageEnd = event.target.value;
        if (this.ageEnd < this.ageStart) {
            this.mdMondServiceDS.showErrorMessage("Age End should be greater than Age Start");
            return;
        }
    }
}