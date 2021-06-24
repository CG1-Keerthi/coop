import { Component, ElementRef, Input, OnInit, Output,EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlanDetailFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/planDetails/plan-detail-form-builder.service';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common/MDCommonGetterSetter';
import { MDConnectedPartnersDS } from 'projects/cooperators/src/app/_services/ds/MDConnectedPartnersDS';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../../../_services/ds'

@Component({
  selector: 'app-product-add-plan-designer',
  templateUrl: './productAddPlan.component.html',
  styleUrls: ['./productAddPlan.component.css']
})

export class ProductAddPlanComponent implements OnInit {
  @Input() set tabName(name) {
    // debugger;
    this.tabNameval = name;
  }
  @Input() set planDetails(data) {
    // debugger;
    if (Object.keys(data).length > 0) {
      this.list = data;    
      this.isProductInfoFieldreadonly = true;
      this.isplanProductInforeadonly = true;
    }
  }

  @Output() AddCoverage = new EventEmitter();

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
  public isPlanSubmitBtn: boolean;
  public tabNameval: string;
  public isFieldreadonly: boolean;
  public isplanInUsereadonly: boolean;
  public planRateStrList: any;
  public isBillingSubmitted: boolean;
  public isLanguageSubmitted: boolean;
  public isAmountTooltip: boolean;

  @ViewChild('businessList') businessList: ElementRef;
  @ViewChild('productStatusList') productStatusList: ElementRef;
  @ViewChild('planStatusList') planStatusList: ElementRef;
  @ViewChild('languageElement') languageElement: ElementRef;
  @ViewChild('BillingElement') BillingElement: ElementRef;
  @ViewChild('TerminationElement') TerminationElement: ElementRef;
  @ViewChild('permitElement') permitElement: ElementRef;
  @ViewChild('maxNumElement') maxNumElement: ElementRef;
  @ViewChild('PremiumCalElement') PremiumCalElement: ElementRef;
  @ViewChild('PremiumCalMethodElement') PremiumCalMethodElement: ElementRef;
  @ViewChild('premiumPaidElement') premiumPaidElement: ElementRef;
  @ViewChild('loanElement') loanElement: ElementRef;
  @ViewChild('ageElement') ageElement: ElementRef;
  @ViewChild('insuranceElement') insuranceElement: ElementRef;
  @ViewChild('loanTypeElement') loanTypeElement: ElementRef;
  @ViewChild('loanTypeCategoryElement') loanTypeCategoryElement: ElementRef;
  @ViewChild('rateStrElement') rateStrElement: ElementRef;


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
        let clientLanguageArray = [];
        let clientLanguageObj = {};
        clientLanguageObj["description"] = "Please select a value";
        clientLanguageArray.push(clientLanguageObj);
        for (let i = 0; i < data.length; i++) {
          clientLanguageArray.push(data[i]);
        }
        this.clientLanguage = clientLanguageArray;
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
        let defaultBillingTypeArray = [];
        let defaultBillingTypeObj = {};
        defaultBillingTypeObj["description"] = "Please select a value";
        defaultBillingTypeArray.push(defaultBillingTypeObj);
        for (let i = 0; i < data.length; i++) {
          defaultBillingTypeArray.push(data[i]);
        }
        this.defaultBillingTypeList = defaultBillingTypeArray;

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
        let riskExposureCodeArray = [];
        let riskExposureCodeObj = {};
        riskExposureCodeObj["description"] = "Please select a value";
        riskExposureCodeArray.push(riskExposureCodeObj);
        for (let i = 0; i < data.length; i++) {
          riskExposureCodeArray.push(data[i]);
        }
        this.riskExposureCodeList = riskExposureCodeArray;
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
        let permitCoverageAmountChangesPostIssuanceArray = [];
        let permitCoverageAmountChangesPostIssuanceObj = {};
        permitCoverageAmountChangesPostIssuanceObj["description"] = "Please select a value";
        permitCoverageAmountChangesPostIssuanceArray.push(permitCoverageAmountChangesPostIssuanceObj);
        for (let i = 0; i < data.length; i++) {
          permitCoverageAmountChangesPostIssuanceArray.push(data[i]);
        }
        this.permitCoverageList = permitCoverageAmountChangesPostIssuanceArray;
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
        let maxApplicantAllowedArray = [];
        let maxApplicantAllowedObj = {};
        maxApplicantAllowedObj["description"] = "Please select a value";
        maxApplicantAllowedArray.push(maxApplicantAllowedObj);
        for (let i = 0; i < data.length; i++) {
          maxApplicantAllowedArray.push(data[i]);
        }
        this.maxApplicantAllowed = maxApplicantAllowedArray;
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
       
        let premCalcAlgorithmArray = [];
        let premCalcAlgorithmObj = {};
        premCalcAlgorithmObj["description"] = "Please select a value";
        premCalcAlgorithmArray.push(premCalcAlgorithmObj);
        for (let i = 0; i < data.length; i++) {
          premCalcAlgorithmArray.push(data[i]);
        }
        this.premCalcAlgorithmList = premCalcAlgorithmArray;
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
        let premiumCalculationMethodArray = [];
        let premiumCalculationMethodObj = {};
        premiumCalculationMethodObj["description"] = "Please select a value";
        premiumCalculationMethodArray.push(premiumCalculationMethodObj);
        for (let i = 0; i < data.length; i++) {
          premiumCalculationMethodArray.push(data[i]);
        }
        this.premiumCalculationMethodList = premiumCalculationMethodArray;

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
        let premiumPaidByArray = [];
        let premiumPaidByObj = {};
        premiumPaidByObj["description"] = "Please select a value";
        premiumPaidByArray.push(premiumPaidByObj);
        for (let i = 0; i < data.length; i++) {
          premiumPaidByArray.push(data[i]);
        }
        this.premiumPaidByList = premiumPaidByArray;

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
        let loanBalanceMethodArray = [];
        let loanBalanceMethodObj = {};
        loanBalanceMethodObj["description"] = "Please select a value";
        loanBalanceMethodArray.push(loanBalanceMethodObj);
        for (let i = 0; i < data.length; i++) {
          loanBalanceMethodArray.push(data[i]);
        }
        this.loanBalanceMethodList = loanBalanceMethodArray;

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
        let ageMethodArray = [];
        let ageMethodObj = {};
        ageMethodObj["description"] = "Please select a value";
        ageMethodArray.push(ageMethodObj);
        for (let i = 0; i < data.length; i++) {
          ageMethodArray.push(data[i]);
        }
        this.ageMethodList = ageMethodArray;
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
        let insurancePaymentMethodArray = [];
        let insurancePaymentMethodObj = {};
        insurancePaymentMethodObj["description"] = "Please select a value";
        insurancePaymentMethodArray.push(insurancePaymentMethodObj);
        for (let i = 0; i < data.length; i++) {
          insurancePaymentMethodArray.push(data[i]);
        }
        this.insurancePaymentMethodList = insurancePaymentMethodArray;
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
        let loanTypeArray = [];
        let loanTypeObj = {};
        loanTypeObj["description"] = "Please select a value";
        loanTypeArray.push(loanTypeObj);
        for (let i = 0; i < data.length; i++) {
          loanTypeArray.push(data[i]);
        }
        this.loanTypeList = loanTypeArray;

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
        let loanTypeCategoryArray = [];
        let loanTypeCategoryObj = {};
        loanTypeCategoryObj["description"] = "Please select a value";
        loanTypeCategoryArray.push(loanTypeCategoryObj);
        for (let i = 0; i < data.length; i++) {
          loanTypeCategoryArray.push(data[i]);
        }
        this.loanTypeCategoryList = loanTypeCategoryArray;
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

    this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchListOfPlanRateStructure', JSON.stringify({}), null).subscribe(
      data => {
        this.planRateStrList = JSON.parse(atob(data.value)).planRatingStructureHeaderList_PlanRatingStructureHeader;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = { "key": "key", "value": "eyJwbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyTGlzdF9QbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyIjpbeyJyYXRlVHlwZSI6IkhpZ2giLCJyYXRlTmFtZSI6IkVzc2VudGlhbFBsdXMtU2luZ2xlUmF0ZXMtSGlnbiBDb21wIiwiam9pbnRMaWZlTXVsdGlwbGllciI6MC45MjUsInRvbGVyYW5jZUxldmVsIjowLjAyLCJQbGFuUmF0aW5nU3RydWN0dXJlRGV0YWlscyI6W10sInJhdGVTdHJ1Y3R1cmVIZWFkZXJJZCI6ODd9LHsicmF0ZVR5cGUiOiJIaWdoIiwicmF0ZU5hbWUiOiJDYXJlZnJlZSBIaWdoIiwiam9pbnRMaWZlTXVsdGlwbGllciI6MC45MjUsInRvbGVyYW5jZUxldmVsIjowLjAyLCJQbGFuUmF0aW5nU3RydWN0dXJlRGV0YWlscyI6W10sInJhdGVTdHJ1Y3R1cmVIZWFkZXJJZCI6ODh9XX0\u003d" };
        this.planRateStrList = JSON.parse(atob(data.value)).planRatingStructureHeaderList_PlanRatingStructureHeader;
      }
    )

    debugger;

    this.planDetailsForm = this.planDetailService.form;
    this.planDetailsForm.reset();
    this.planDetailsForm.patchValue(this.list);


  }

  ngAfterViewInit() {
    if (this.tabNameval == "Plan Details") {
      this.isPlanSubmitBtn = true;
      this.isBtnDisabled = false;
      this.isFieldreadonly = true;
      this.isplanInUsereadonly = true;
      this.render.setAttribute(this.languageElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.BillingElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.TerminationElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.permitElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.maxNumElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.PremiumCalElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.PremiumCalMethodElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.premiumPaidElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.loanElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.ageElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.insuranceElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.loanTypeElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.loanTypeCategoryElement.nativeElement, 'disabled', 'true');
      this.render.setAttribute(this.rateStrElement.nativeElement, 'disabled', 'true');


    }
    if (this.tabNameval == "Product AddPlan") {
      this.isPlanSubmitBtn = false;
      this.isBtnDisabled = true;
      this.isplanInUsereadonly = true;
    }

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

  onKeyUpAmount(event){
    if (event.target.value == "") {
      this.isAmountTooltip = true;
      setTimeout(() => {
        this.isAmountTooltip = false;
      }, 2000)
    } else {
      this.isAmountTooltip = false;
    } 
  }

  onClickOfPlanDetailSubmit() {
    debugger;
    if ((this.planDetailsForm.value.planProductInfo.planNumber == null || this.planDetailsForm.value.planProductInfo.planNumber == "")
      || (this.planDetailsForm.value.planProductInfo.planName == null || this.planDetailsForm.value.planProductInfo.planName == "")
      || (this.planDetailsForm.value.planProductInfo.planDescription == null || this.planDetailsForm.value.planProductInfo.planDescription == "")
      || (this.planDetailsForm.value.planProductInfo.clientName == null || this.planDetailsForm.value.planProductInfo.clientName == "")

      || (this.planDetailsForm.value.planProductInfo.planEffectiveDate == null || this.planDetailsForm.value.planProductInfo.planEffectiveDate == "")) {
      // if (this.planDetailsForm.invalid) {

      this.isSubmitted = true;
      if (this.planDetailsForm.value.planProductInfo.languageCode == "Please select a value") {
        this.isBillingSubmitted = true;
      }
      if (this.planDetailsForm.value.planProductInfo.defaultBillingType == "Please select a value") {
        this.isLanguageSubmitted = true;
      }
      this.mdMondServiceDS.showErrorMessage("please enter the value for mandatory fields");
      return;
      // }
    }

    if (this.planDetailsForm.value.planProductInfo.languageCode == "Please select a value") {
      this.isLanguageSubmitted = true;
      this.mdMondServiceDS.showErrorMessage("please enter the value for mandatory fields");
      return;
    }
    if (this.planDetailsForm.value.planProductInfo.defaultBillingType == "Please select a value") {   
      this.isBillingSubmitted = true;
      this.mdMondServiceDS.showErrorMessage("please enter the value for mandatory fields");
      return;
    }

    this.isBillingSubmitted = false;
    this.isLanguageSubmitted = false;

    if (this.planDetailsForm.value.planProductInfo.permitCertificateChangesPostIssuance == true) {
      this.planDetailsForm.value.planProductInfo.permitCertificateChangesPostIssuance = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.permitCertificateChangesPostIssuance = "N";
    }

    if (this.planDetailsForm.value.planProductInfo.isBundledPlan == true) {
      this.planDetailsForm.value.planProductInfo.isBundledPlan = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.isBundledPlan = "N";
    }
    if (this.planDetailsForm.value.planProductInfo.loanExtension == true) {
      this.planDetailsForm.value.planProductInfo.loanExtension = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.loanExtension = "N";
    }

    if (this.planDetailsForm.value.planProductInfo.refundAllowed == true) {
      this.planDetailsForm.value.planProductInfo.refundAllowed = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.refundAllowed = "N";
    }

    if (this.planDetailsForm.value.planProductInfo.grossUpInterestOnly == true) {
      this.planDetailsForm.value.planProductInfo.grossUpInterestOnly = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.grossUpInterestOnly = "N";
    }

    if (this.planDetailsForm.value.planProductInfo.grossUpLumpsumCode == true) {
      this.planDetailsForm.value.planProductInfo.grossUpLumpsumCode = "Y";
    } else {
      this.planDetailsForm.value.planProductInfo.grossUpLumpsumCode = "N";
    }
    if (this.tabNameval == "Product AddPlan") {
      this.planDetailsForm.value.planProductInfo.currentRecordFlag = "N";
      this.planDetailsForm.value.planProductInfo.clientIdentifier = 2;
      this.planDetailsForm.value.planProductInfo.rateStructureHeaderId = undefined;
    }
    if (this.tabNameval == "Plan Details") {
      this.planDetailsForm.value.planProductInfo.currentRecordFlag = "Y";
      this.planDetailsForm.value.planProductInfo.clientIdentifier = this.list.planProductInfo.clientIdentifier;
      this.planDetailsForm.value.planProductInfo.planProductInfoId = this.list.planProductInfo.planProductInfoId;
      this.planDetailsForm.value.planProductInfo.lastUpdateDate = this.list.planProductInfo.lastUpdateDate;
      this.planDetailsForm.value.planProductInfo.planStatusEndDate = this.list.planProductInfo.planStatusEndDate;
      this.planDetailsForm.value.planProductInfo.planCreationDate = this.list.planProductInfo.planCreationDate;
      this.planDetailsForm.value.planProductInfo.mondFormDateFormat = this.list.planProductInfo.mondFormDateFormat;
    }

    this.planDetailsForm.value.isBundleExists = false;

    this.planDetailsForm.value.productInfo.productNumber = undefined;
    this.planDetailsForm.value.productInfo.productTerminationDate = undefined;
    this.planDetailsForm.value.productInfo.productInUse = undefined;
    this.planDetailsForm.value.productInfo.backPremiumCollectionPeriod = undefined;
    this.planDetailsForm.value.productInfo.insuranceDistributorGuideReferenceNum = undefined;
    this.planDetailsForm.value.productInfo.certificateDetailAdministrator = undefined;
    this.planDetailsForm.value.productInfo.freeLookPeriodRefund = undefined;
    this.planDetailsForm.value.productInfo.memberInitiatedTerminationRule = undefined;
    this.planDetailsForm.value.productInfo.comment = undefined;
    this.planDetailsForm.value.productInfo.productStatusEndDate = undefined;
    this.planDetailsForm.value.productInfo.productCurrentRecordFlag = undefined;
    this.planDetailsForm.value.productInfo.lastUpdateDate = undefined;
    this.planDetailsForm.value.productInfo.mondFormDateFormat = undefined;

    let formData = btoa(JSON.stringify(this.planDetailsForm.value));
    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanProductData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
      data => {
        // console.log("onClickOfClientSubmit data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

      }, error => {
        this.mdMondServiceDS.MDError(error);
      });
  }

  onClickOfUpdatePlan() {
    debugger;
    this.isPlanSubmitBtn = false;
    this.isplanInUsereadonly = true;
    this.isFieldreadonly = false;
    this.isplanProductInforeadonly = false;
    this.render.setProperty(this.languageElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.BillingElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.TerminationElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.permitElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.maxNumElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.PremiumCalElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.PremiumCalMethodElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.premiumPaidElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.loanElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.ageElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.insuranceElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.loanTypeElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.loanTypeCategoryElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.rateStrElement.nativeElement, 'disabled', false);
    this.render.setProperty(this.planStatusList.nativeElement, 'disabled', false);
  }

  onChangeOfBilling() {
    debugger;
    this.isBillingSubmitted = false;
  }

  onChangeOfLanguage() {
    this.isLanguageSubmitted = false;
  }

  onClickOfAddCoverage(item){
    debugger;
    this.AddCoverage.emit(item);
  }

}
