import { Component, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoverageDetailFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/coverageDetails/coverage-detail-form-builder.service';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';


@Component({
  selector: 'app-product-add-coverage-designer',
  templateUrl: './productAddCoverage.component.html',
  styleUrls: ['./productAddCoverage.component.css']
})

export class ProductAddCoverageComponent implements OnInit {
  @Input() set coverageData(data) {
    this.coverageDetailList = data;
  }

  public coverageDetailsForm: FormGroup;
  public lineOfBusinessList: any;
  public GLAccountNumberList: any;
  public terminationDueToClaimList: any;
  public coverageDetailList: any;
  public coverageTypeList: any;
  public isMaxClaimTooltip: boolean;
  public isMaxNumClaimTooltip: boolean;
  public isMaxMonthClaimTooltip: boolean;
  public isMaxIssueTooltip: boolean;
  public isMinIssueTooltip: boolean;
  public isMaxCoverageTooltip: boolean;
  public isMaxCoverageAmountTooltip: boolean;
  public isMinCoverageAmountTooltip: boolean;
  public isMinIssueAmountTooltip: boolean;
  public isMinInsurableTooltip: boolean;
  public isMaxInsurableTooltip: boolean;
  public isWorkingPeriodTooltip: boolean;
  public isGuaranteedAmountTooltip: boolean;
  public isMaxMonthAmtTooltip: boolean;
  public isLossOfEmpTooltip: boolean;
  public isCoverageTerminationTooltip: boolean;
  public isCertificateFeeTooltip: boolean;
  public isCURPTooltip: boolean;
  public isMinimumPremiumTooltip: boolean;
  public isTooltip: boolean = false;
  public csfrToken: any;
  public coverageCode: string;
  public coverageType: string;

  constructor(private mdCodeListHeaderDS: MDCodeListHeaderDS,
    private mdMondServiceDS: MDMondServiceDS,
    private coverageDetailService: CoverageDetailFormBuilderService,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
  ) { }

  ngOnInit() {
    debugger;

    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LineOfBusiness').subscribe(
      data => {
        let lineOfBusinessArray = [];
        let lineOfBusinessObj = {};
        lineOfBusinessObj["description"] = "Please select a value";
        lineOfBusinessArray.push(lineOfBusinessObj);
        for (let i = 0; i < data.length; i++) {
          lineOfBusinessArray.push(data[i]);
        }
        this.lineOfBusinessList = lineOfBusinessArray;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145511, "codeListHeaderId": 1530, "code": "1", "description": "901" }, { "codeListValuesId": 145535, "codeListHeaderId": 1530, "code": "2", "description": "902" }, { "codeListValuesId": 404830, "codeListHeaderId": 1530, "code": "3", "description": "904" }, { "codeListValuesId": 404831, "codeListHeaderId": 1530, "code": "4", "description": "906" }]
        let lineOfBusinessArray = [];
        let lineOfBusinessObj = {};
        lineOfBusinessObj["description"] = "Please select a value";
        lineOfBusinessArray.push(lineOfBusinessObj);
        for (let i = 0; i < data.length; i++) {
          lineOfBusinessArray.push(data[i]);
        }
        this.lineOfBusinessList = lineOfBusinessArray;
      }
    )

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-GLAccountNumber').subscribe(
      data => {
        let GLAccountNumberArray = [];
        let GLAccountNumberObj = {};
        GLAccountNumberObj["description"] = "Please select a value";
        GLAccountNumberArray.push(GLAccountNumberObj);
        for (let i = 0; i < data.length; i++) {
          GLAccountNumberArray.push(data[i]);
        }
        this.GLAccountNumberList = GLAccountNumberArray;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145532, "codeListHeaderId": 1538, "code": "1", "description": "1000500" }, { "codeListValuesId": 145533, "codeListHeaderId": 1538, "code": "2", "description": "3001000" }, { "codeListValuesId": 145534, "codeListHeaderId": 1538, "code": "3", "description": "3004500" }]
        let GLAccountNumberArray = [];
        let GLAccountNumberObj = {};
        GLAccountNumberObj["description"] = "Please select a value";
        GLAccountNumberArray.push(GLAccountNumberObj);
        for (let i = 0; i < data.length; i++) {
          GLAccountNumberArray.push(data[i]);
        }
        this.GLAccountNumberList = GLAccountNumberArray;
      }
    )

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-TerminationDueToClaim').subscribe(
      data => {
        let terminationDueToClaimArray = [];
        let terminationDueToClaimObj = {};
        terminationDueToClaimObj["description"] = "Please select a value";
        terminationDueToClaimArray.push(terminationDueToClaimObj);
        for (let i = 0; i < data.length; i++) {
          terminationDueToClaimArray.push(data[i]);
        }
        this.terminationDueToClaimList = terminationDueToClaimArray;
      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145540, "codeListHeaderId": 1540, "code": "1", "description": "No Termination" }, { "codeListValuesId": 145541, "codeListHeaderId": 1540, "code": "2", "description": "Applicant Benefit" }, { "codeListValuesId": 145542, "codeListHeaderId": 1540, "code": "3", "description": "Applicant Certificate" }]
        let terminationDueToClaimArray = [];
        let terminationDueToClaimObj = {};
        terminationDueToClaimObj["description"] = "Please select a value";
        terminationDueToClaimArray.push(terminationDueToClaimObj);
        for (let i = 0; i < data.length; i++) {
          terminationDueToClaimArray.push(data[i]);
        }
        this.terminationDueToClaimList = terminationDueToClaimArray;
      })

    this.coverageDetailsForm = this.coverageDetailService.form;
    this.coverageDetailsForm.patchValue(this.coverageDetailList);
  }

  ngAfterViewInit() {
  }

  onChangeOfLOB(event) {
    debugger;
    let formVariable = {
      "clientId": this.coverageDetailList.planProductInfo.clientIdentifier,
      "lineOfBusiness": event.currentTarget.value
    }

    this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
      data => {
        let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
        let coverageTypeArray = [];
        let coverageTypeObj = {};
        coverageTypeObj["coverageType"] = "Please select a value";
        coverageTypeArray.push(coverageTypeObj);
        for (let i = 0; i < parsedData.length; i++) {
          coverageTypeArray.push(parsedData[i]);
        }
        this.coverageTypeList = coverageTypeArray;

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVR5cGVMaXN0X2NvdmVyYWdlTG9va1VwIjogWwogICAgewogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIKICAgIH0sCgl7CiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFREkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgfQogIF0KfQ==" };
        let parsedData = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
        let coverageTypeArray = [];
        let coverageTypeObj = {};
        coverageTypeObj["coverageType"] = "Please select a value";
        coverageTypeArray.push(coverageTypeObj);
        for (let i = 0; i < parsedData.length; i++) {
          coverageTypeArray.push(parsedData[i]);
        }
        this.coverageTypeList = coverageTypeArray;

      }
    )
  }

  onKeyUpMaxClaim(event) {
    if (event.target.value == "") {
      this.isMaxClaimTooltip = true;
      setTimeout(() => {
        this.isMaxClaimTooltip = false;
      }, 2000)
    } else {
      this.isMaxClaimTooltip = false;
    }
  }

  onKeyUpMaxNum(event) {
    if (event.target.value == "") {
      this.isMaxNumClaimTooltip = true;
      setTimeout(() => {
        this.isMaxNumClaimTooltip = false;
      }, 2000)
    } else {
      this.isMaxNumClaimTooltip = false;
    }
  }
  onKeyUpMaxMonth(event) {

    if (event.target.value == "") {
      this.isMaxMonthClaimTooltip = true;
      setTimeout(() => {
        this.isMaxMonthClaimTooltip = false;
      }, 2000)
    } else {
      this.isMaxMonthClaimTooltip = false;
    }
  }

  onKeyUpMaxIssue(event) {
    if (event.target.value == "") {
      this.isMaxIssueTooltip = true;
      setTimeout(() => {
        this.isMaxIssueTooltip = false;
      }, 2000)
    } else {
      this.isMaxIssueTooltip = false;
    }
  }

  onKeyUpMinIssue(event) {
    if (event.target.value == "") {
      this.isMinIssueTooltip = true;
      setTimeout(() => {
        this.isMinIssueTooltip = false;
      }, 2000)
    } else {
      this.isMinIssueTooltip = false;
    }
  }

  onKeyUpMaxCoverage(event) {
    if (event.target.value == "") {
      this.isMaxCoverageTooltip = true;
      setTimeout(() => {
        this.isMaxCoverageTooltip = false;
      }, 2000)
    } else {
      this.isMaxCoverageTooltip = false;
    }
  }

  onKeyUpMaxCoverageAmount(event) {
    if (event.target.value == "") {
      this.isMaxCoverageAmountTooltip = true;
      setTimeout(() => {
        this.isMaxCoverageAmountTooltip = false;
      }, 2000)
    } else {
      this.isMaxCoverageAmountTooltip = false;
    }
  }

  onKeyUpMinCoverageAmount(event) {
    if (event.target.value == "") {
      this.isMinCoverageAmountTooltip = true;
      setTimeout(() => {
        this.isMinCoverageAmountTooltip = false;
      }, 2000)
    } else {
      this.isMinCoverageAmountTooltip = false;
    }
  }

  onKeyUpMinIssueAmount(event) {
    if (event.target.value == "") {
      this.isMinIssueAmountTooltip = true;
      setTimeout(() => {
        this.isMinIssueAmountTooltip = false;
      }, 2000)
    } else {
      this.isMinIssueAmountTooltip = false;
    }
  }

  onKeyUpMinInsurable(event) {
    if (event.target.value == "") {
      this.isMinInsurableTooltip = true;
      setTimeout(() => {
        this.isMinInsurableTooltip = false;
      }, 2000)
    } else {
      this.isMinInsurableTooltip = false;
    }
  }

  onKeyUpMaxInsurable(event) {
    if (event.target.value == "") {
      this.isMaxInsurableTooltip = true;
      setTimeout(() => {
        this.isMaxInsurableTooltip = false;
      }, 2000)
    } else {
      this.isMaxInsurableTooltip = false;
    }
  }

  onKeyUpWorkingPeriod(event) {
    if (event.target.value == "") {
      this.isWorkingPeriodTooltip = true;
      setTimeout(() => {
        this.isWorkingPeriodTooltip = false;
      }, 2000)
    } else {
      this.isWorkingPeriodTooltip = false;
    }
  }

  onKeyUpGuaranteedAmount(event) {
    if (event.target.value == "") {
      this.isGuaranteedAmountTooltip = true;
      setTimeout(() => {
        this.isGuaranteedAmountTooltip = false;
      }, 2000)
    } else {
      this.isGuaranteedAmountTooltip = false;
    }
  }

  onKeyUpMaxMonthAmt(event) {
    if (event.target.value == "") {
      this.isMaxMonthAmtTooltip = true;
      setTimeout(() => {
        this.isMaxMonthAmtTooltip = false;
      }, 2000)
    } else {
      this.isMaxMonthAmtTooltip = false;
    }
  }

  onKeyUpLossOfEmp(event) {
    if (event.target.value == "") {
      this.isLossOfEmpTooltip = true;
      setTimeout(() => {
        this.isLossOfEmpTooltip = false;
      }, 2000)
    } else {
      this.isLossOfEmpTooltip = false;
    }
  }

  onKeyUpCoverageTermination(event) {
    if (event.target.value == "") {
      this.isCoverageTerminationTooltip = true;
      setTimeout(() => {
        this.isCoverageTerminationTooltip = false;
      }, 2000)
    } else {
      this.isCoverageTerminationTooltip = false;
    }
  }

  onKeyUpCertificateFee(event) {
    if (event.target.value == "") {
      this.isCertificateFeeTooltip = true;
      setTimeout(() => {
        this.isCertificateFeeTooltip = false;
      }, 2000)
    } else {
      this.isCertificateFeeTooltip = false;
    }
  }

  onKeyUpCURP(event) {
    if (event.target.value == "") {
      this.isCURPTooltip = true;
      setTimeout(() => {
        this.isCURPTooltip = false;
      }, 2000)
    } else {
      this.isCURPTooltip = false;
    }
  }

  onKeyUpMinPremium(event) {
    if (event.target.value == "") {
      this.isMinimumPremiumTooltip = true;
      setTimeout(() => {
        this.isMinimumPremiumTooltip = false;
      }, 2000)
    } else {
      this.isMinimumPremiumTooltip = false;
    }
  }

  onMouseover() {
    debugger;
    this.isTooltip = true;
    setTimeout(() => {
      this.isTooltip = false;
    }, 2000)
  }

  onChangeOfCoverageType(event) {
    debugger;
    this.coverageCode = event.currentTarget.value;
    this.coverageType = event.target.options[event.target.options.selectedIndex].text;
  }

  onclickOfCoverageSubmit() {
    debugger;

    if (this.coverageDetailsForm.value.coverageInfo.lowerMaximumCoverageAmount == true) {
      this.coverageDetailsForm.value.coverageInfo.lowerMaximumCoverageAmount = "Y";
    } else {
      this.coverageDetailsForm.value.coverageInfo.lowerMaximumCoverageAmount = "N";
    }

    if (this.coverageDetailsForm.value.coverageInfo.riderBenefit == true) {
      this.coverageDetailsForm.value.coverageInfo.riderBenefit = "Y";
    } else {
      this.coverageDetailsForm.value.coverageInfo.riderBenefit = "N";
    }
    this.coverageDetailsForm.value.coverageInfo.currentRecordFlag = "N";
    this.coverageDetailsForm.value.coverageInfo.coverageCode = this.coverageCode;
    this.coverageDetailsForm.value.coverageInfo.coverageType = this.coverageType;
    let coverageArray = [];
    let coverageObj = {};
    let productInfo = {
      "productType": this.coverageDetailsForm.value.productInfo.productType,
      "productName": this.coverageDetailsForm.value.productInfo.productName,
      "productBusinessModel": this.coverageDetailsForm.value.productInfo.productBusinessModel,
      "productEffectiveDate": this.coverageDetailsForm.value.productInfo.productEffectiveDate,
      "productStatus": this.coverageDetailsForm.value.productInfo.productStatus,
      "productId": this.coverageDetailsForm.value.productInfo.productId
    }
    let planProductInfo = {
      "planNumber": this.coverageDetailsForm.value.planProductInfo.planNumber,
      "planName": this.coverageDetailsForm.value.planProductInfo.planName,
      "clientName": this.coverageDetailsForm.value.planProductInfo.clientName,
      "planEffectiveDate": this.coverageDetailsForm.value.planProductInfo.planEffectiveDate,
      "planStatus": this.coverageDetailsForm.value.planProductInfo.planStatus,
      "clientIdentifier": this.coverageDetailsForm.value.planProductInfo.clientIdentifier,
      "planProductInfoId": this.coverageDetailsForm.value.planProductInfo.planProductInfoId
    }

    coverageObj["productInfo"] = productInfo;
    coverageObj["planProductInfo"] = planProductInfo;
    coverageObj["coverageInfo"] = this.coverageDetailsForm.value.coverageInfo;
    coverageObj["mondFormDateFormat"] = this.coverageDetailsForm.value.mondFormDateFormat;
    coverageArray.push(coverageObj);
    console.log("coverageArray", coverageArray);

    console.log(" this.coverageDetailsForm", this.coverageDetailsForm);
    // let formData = btoa(JSON.stringify(this.coverageDetailsForm.value));
    let formData = btoa(JSON.stringify(coverageArray[0]));
    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanCoverageData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
      data => {
        // console.log("onClickOfClientSubmit data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

      }, error => {
        this.mdMondServiceDS.MDError(error);
      });
  }

}
