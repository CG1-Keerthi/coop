import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlanDetailFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/planDetails/plan-detail-form-builder.service';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common/MDCommonGetterSetter';
import { MDConnectedPartnersDS } from 'projects/cooperators/src/app/_services/ds/MDConnectedPartnersDS';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../../_services/ds'
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ProductDetailFormBuilderService } from '../../../form-builder/productMaintenance/productDetails/product-detail-form-builder.service';
// import { MDCommonGetterSetter } from '../../../_services/common';
// import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-product-add-plan-designer',
  templateUrl: './productAddPlan.component.html',
  styleUrls: ['./productAddPlan.component.css']
})

export class ProductAddPlanComponent implements OnInit {

  @Input() set planDetails(data) {
    debugger;
    if (Object.keys(data).length > 0) {
      this.list = data;
      this.isProductInfoFieldreadonly = true;
      this.isplanProductInforeadonly = true;
      this.isBtnDisabled = true;
     
    }
  }
  public planDetailsForm: FormGroup;
  public clientLanguage: any;
  public defaultBillingTypeList: any;
  public riskExposureCodeList: any;
  public permitCoverageList: any;
  public maxApplicantAllowed: any;
  public premCalcAlgorithmList: any;
  public premiumCalculationMethodList: any;
  public premiumPaidByList: any;
  public loanBalanceMethodList: any;
  public ageMethodList: any;
  public loanTypeCategoryList: any;
  public insurancePaymentMethodList: any;
  public loanTypeList: any;
  public clientNameVal: any;
  public isTooltip: boolean;
  public isMaxTooltip: boolean;
  public isReinstatementTooltip: boolean;
  public isEffectiveDateTooltip: boolean;
  public isMaxEffectiveDateTooltip: boolean;
  public isBackRefundTooltip: boolean;
  public isMinAmortizationTooltip: boolean;
  public isMaxAmortizationTooltip: boolean;
  public csfrToken: any;
  public list: any;
  public isProductInfoFieldreadonly: boolean;
  public isplanProductInforeadonly: boolean;
  public isSubmitted: boolean;
  public isBtnDisabled: boolean;

  @ViewChild('businessList') businessList: ElementRef;
  @ViewChild('productStatusList') productStatusList: ElementRef;
  @ViewChild('planStatusList') planStatusList: ElementRef;

  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdCodeListHeaderDS: MDCodeListHeaderDS,
    private mdConnectedPartnersDS: MDConnectedPartnersDS,
    private planDetailService: PlanDetailFormBuilderService,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private render: Renderer2
  ) { }

  ngOnInit() {
debugger;

    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LanguageCode').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145695, "codeListHeaderId": 1575, "code": "1", "description": "English" }, { "codeListValuesId": 145697, "codeListHeaderId": 1575, "code": "2", "description": "French" }]
        let clientLanguageArray = [];
        let clientLanguageObj = {};
        clientLanguageObj["description"] = "Please select a value";
        clientLanguageArray.push(clientLanguageObj);
        for (let i = 0; i < data.length; i++) {
          clientLanguageArray.push(data[i]);
        }
        this.clientLanguage = clientLanguageArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-DefaultBillingType').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145644, "codeListHeaderId": 1569, "code": "1", "description": "Self Administered" }, { "codeListValuesId": 145645, "codeListHeaderId": 1569, "code": "2", "description": "Single Premium" }, { "codeListValuesId": 145665, "codeListHeaderId": 1569, "code": "3", "description": "Individual Benefit" }, { "codeListValuesId": 405216, "codeListHeaderId": 1569, "code": "4", "description": "Monthly Premium" }]
        let defaultBillingTypeArray = [];
        let defaultBillingTypeObj = {};
        defaultBillingTypeObj["description"] = "Please select a value";
        defaultBillingTypeArray.push(defaultBillingTypeObj);
        for (let i = 0; i < data.length; i++) {
          defaultBillingTypeArray.push(data[i]);
        }
        this.defaultBillingTypeList = defaultBillingTypeArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-RiskExposureCode').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145519, "codeListHeaderId": 1536, "code": "1", "description": "Not Applicable" }, { "codeListValuesId": 145520, "codeListHeaderId": 1536, "code": "2", "description": "Term" }, { "codeListValuesId": 145521, "codeListHeaderId": 1536, "code": "3", "description": "Amortization Period" }]
        let riskExposureCodeArray = [];
        let riskExposureCodeObj = {};
        riskExposureCodeObj["description"] = "Please select a value";
        riskExposureCodeArray.push(riskExposureCodeObj);
        for (let i = 0; i < data.length; i++) {
          riskExposureCodeArray.push(data[i]);
        }
        this.riskExposureCodeList = riskExposureCodeArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-PermitCoverageAmountChangesPostIssuance').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145669, "codeListHeaderId": 1572, "code": "1", "description": "Not Allowed" }, { "codeListValuesId": 145670, "codeListHeaderId": 1572, "code": "2", "description": "Increase only" }, { "codeListValuesId": 145671, "codeListHeaderId": 1572, "code": "3", "description": "Decrease only" }, { "codeListValuesId": 145672, "codeListHeaderId": 1572, "code": "4", "description": "Increase or Decrease" }]
        let permitCoverageAmountChangesPostIssuanceArray = [];
        let permitCoverageAmountChangesPostIssuanceObj = {};
        permitCoverageAmountChangesPostIssuanceObj["description"] = "Please select a value";
        permitCoverageAmountChangesPostIssuanceArray.push(permitCoverageAmountChangesPostIssuanceObj);
        for (let i = 0; i < data.length; i++) {
          permitCoverageAmountChangesPostIssuanceArray.push(data[i]);
        }
        this.permitCoverageList = permitCoverageAmountChangesPostIssuanceArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-MaxApplicantAllowed').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145528, "codeListHeaderId": 1537, "code": "1", "description": "1" }, { "codeListValuesId": 145529, "codeListHeaderId": 1537, "code": "2", "description": "2" }, { "codeListValuesId": 145530, "codeListHeaderId": 1537, "code": "3", "description": "3" }, { "codeListValuesId": 145531, "codeListHeaderId": 1537, "code": "4", "description": "4" }]
        let maxApplicantAllowedArray = [];
        let maxApplicantAllowedObj = {};
        maxApplicantAllowedObj["description"] = "Please select a value";
        maxApplicantAllowedArray.push(maxApplicantAllowedObj);
        for (let i = 0; i < data.length; i++) {
          maxApplicantAllowedArray.push(data[i]);
        }
        this.maxApplicantAllowed = maxApplicantAllowedArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-PremCalcAlgorithm').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let premCalcAlgorithmArray = [];
        let premCalcAlgorithmObj = {};
        premCalcAlgorithmObj["description"] = "Please select a value";
        premCalcAlgorithmArray.push(premCalcAlgorithmObj);
        for (let i = 0; i < data.length; i++) {
          premCalcAlgorithmArray.push(data[i]);
        }
        this.premCalcAlgorithmList = premCalcAlgorithmArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-PremiumCalculationMethod').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let premiumCalculationMethodArray = [];
        let premiumCalculationMethodObj = {};
        premiumCalculationMethodObj["description"] = "Please select a value";
        premiumCalculationMethodArray.push(premiumCalculationMethodObj);
        for (let i = 0; i < data.length; i++) {
          premiumCalculationMethodArray.push(data[i]);
        }
        this.premiumCalculationMethodList = premiumCalculationMethodArray;
      });


    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-PremiumPaidBy').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let premiumPaidByArray = [];
        let premiumPaidByObj = {};
        premiumPaidByObj["description"] = "Please select a value";
        premiumPaidByArray.push(premiumPaidByObj);
        for (let i = 0; i < data.length; i++) {
          premiumPaidByArray.push(data[i]);
        }
        this.premiumPaidByList = premiumPaidByArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LoanBalanceMethod').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let loanBalanceMethodArray = [];
        let loanBalanceMethodObj = {};
        loanBalanceMethodObj["description"] = "Please select a value";
        loanBalanceMethodArray.push(loanBalanceMethodObj);
        for (let i = 0; i < data.length; i++) {
          loanBalanceMethodArray.push(data[i]);
        }
        this.loanBalanceMethodList = loanBalanceMethodArray;
      });


    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-AgeMethod').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let ageMethodArray = [];
        let ageMethodObj = {};
        ageMethodObj["description"] = "Please select a value";
        ageMethodArray.push(ageMethodObj);
        for (let i = 0; i < data.length; i++) {
          ageMethodArray.push(data[i]);
        }
        this.ageMethodList = ageMethodArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-InsurancePaymentMethod').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let insurancePaymentMethodArray = [];
        let insurancePaymentMethodObj = {};
        insurancePaymentMethodObj["description"] = "Please select a value";
        insurancePaymentMethodArray.push(insurancePaymentMethodObj);
        for (let i = 0; i < data.length; i++) {
          insurancePaymentMethodArray.push(data[i]);
        }
        this.insurancePaymentMethodList = insurancePaymentMethodArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LoanType').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let loanTypeArray = [];
        let loanTypeObj = {};
        loanTypeObj["description"] = "Please select a value";
        loanTypeArray.push(loanTypeObj);
        for (let i = 0; i < data.length; i++) {
          loanTypeArray.push(data[i]);
        }
        this.loanTypeList = loanTypeArray;
      });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-LoanTypeCategory').subscribe(
      data => {

      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = [{ "codeListValuesId": 145673, "codeListHeaderId": 1573, "code": "1", "description": "SP" }, { "codeListValuesId": 145674, "codeListHeaderId": 1573, "code": "2", "description": "MP" }, { "codeListValuesId": 145675, "codeListHeaderId": 1573, "code": "3", "description": "GMP" }, { "codeListValuesId": 145676, "codeListHeaderId": 1573, "code": "4", "description": "MTL" }, { "codeListValuesId": 145677, "codeListHeaderId": 1573, "code": "5", "description": "Other" }]
        let loanTypeCategoryArray = [];
        let loanTypeCategoryObj = {};
        loanTypeCategoryObj["description"] = "Please select a value";
        loanTypeCategoryArray.push(loanTypeCategoryObj);
        for (let i = 0; i < data.length; i++) {
          loanTypeCategoryArray.push(data[i]);
        }
        this.loanTypeCategoryList = loanTypeCategoryArray;
      });
    debugger;

    this.planDetailsForm = this.planDetailService.form;
    this.planDetailsForm.patchValue(this.list);
    

  }

  ngAfterViewInit(){
    this.render.setAttribute(this.businessList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.planStatusList.nativeElement, 'disabled', 'true');
  }

  clientNameKeyup(event) {
    // debugger;
    // this.selectedClientName = undefined;
    // this.clientSelect = "clientSelect";
    this.mdConnectedPartnersDS.getListOfPartnerCompaniesTypeAhead(event.target.value).subscribe(
      data => {
        this.clientNameVal = data;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        this.clientNameVal = [{ "companyId": 6883, "inheritFromCompanyId": -1, "companyIdentifier": "24002", "companyName": "Crelogix", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 156, "createDate": "Oct 13, 2017 5:43:01 AM", "updateDate": "Oct 14, 2017 1:23:27 PM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 7102, "inheritFromCompanyId": -1, "companyIdentifier": "24003", "companyName": "LAIS", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Apr 12, 2019 5:13:34 AM", "updateDate": "Apr 12, 2019 5:13:34 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }]
      }
    )
  }

  onKeyUpMinField(event) {
    debugger
    if (event.target.value == "") {
      this.isTooltip = true;
      setTimeout(() => {
        this.isTooltip = false;
      }, 2000)
    } else {
      this.isTooltip = false;
    }
  }

  onKeyUpMaxField(event) {
    if (event.target.value == "") {
      this.isMaxTooltip = true;
      setTimeout(() => {
        this.isMaxTooltip = false;
      }, 2000)
    } else {
      this.isMaxTooltip = false;
    }
  }

  onKeyUpReinstatement(event) {
    if (event.target.value == "") {
      this.isReinstatementTooltip = true;
      setTimeout(() => {
        this.isReinstatementTooltip = false;
      }, 2000)
    } else {
      this.isReinstatementTooltip = false;
    }
  }

  onKeyUpEffectiveDate(event) {
    if (event.target.value == "") {
      this.isEffectiveDateTooltip = true;
      setTimeout(() => {
        this.isEffectiveDateTooltip = false;
      }, 2000)
    } else {
      this.isEffectiveDateTooltip = false;
    }
  }

  onKeyUpMaxEffectiveDate(event) {
    if (event.target.value == "") {
      this.isMaxEffectiveDateTooltip = true;
      setTimeout(() => {
        this.isMaxEffectiveDateTooltip = false;
      }, 2000)
    } else {
      this.isMaxEffectiveDateTooltip = false;
    }
  }

  onKeyUpBackRefund(event) {
    if (event.target.value == "") {
      this.isBackRefundTooltip = true;
      setTimeout(() => {
        this.isBackRefundTooltip = false;
      }, 2000)
    } else {
      this.isBackRefundTooltip = false;
    }
  }
  onKeyUpMinAmortization(event) {
    if (event.target.value == "") {
      this.isMinAmortizationTooltip = true;
      setTimeout(() => {
        this.isMinAmortizationTooltip = false;
      }, 2000)
    } else {
      this.isMinAmortizationTooltip = false;
    }
  }
  onKeyUpMaxAmortization(event) {
    if (event.target.value == "") {
      this.isMaxAmortizationTooltip = true;
      setTimeout(() => {
        this.isMaxAmortizationTooltip = false;
      }, 2000)
    } else {
      this.isMaxAmortizationTooltip = false;
    }
  }

  onClickOfPlanDetailSubmit() {
    debugger;
  
    if(this.planDetailsForm.invalid){
      this.mdMondServiceDS.showErrorMessage("please enter the value for mandatory fields");
      this.isSubmitted = true
      return;
    }

    let formData = btoa(JSON.stringify(this.planDetailsForm.value));
    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanProductData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
      data => {
        // console.log("onClickOfClientSubmit data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

      }, error => {
        this.mdMondServiceDS.MDError(error);
      });
  }

}
