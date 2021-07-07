import { Component, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base64 } from 'js-base64';
import { CoverageDetailFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/coverageDetails/coverage-detail-form-builder.service';
import { CoverageRatingFactorDetailFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/coverageRatingFactorDetails/coverage-rating-factor-detail-form-builder.service';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common';
import { MDCodeListHeaderDS, MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';

declare var $: any;

@Component({
  selector: 'app-product-add-rating-factor-designer',
  templateUrl: './productAddRatingFactor.component.html',
  styleUrls: ['./productAddRatingFactor.component.css']
})

export class ProductAddRatingFactorComponent implements OnInit {

  @Input() set tabName(name) {
    this.coverageRatingFactorTabName = name;
  }

  @Input() set rateFactorList(data) {
    this.rateFactorDetails = data;
  }

  @Input() set coverageTypeData(list) {
    debugger;
    this.coverageTypeList = list;
  }

  //   @Output() addRatingFactor = new EventEmitter();
  public coverageRatingFactorDetailsForm: FormGroup;
  public clientNameListData: any;
  isShowRefundableField: boolean = false;
  isShowNonrefundableField: boolean = false;
  public productBusinessModelList: any;
  public lineOfBusinessList: any;
  public coverageTypeList: any;
  public rateFactorDetails: any;
  public preExistingConditionList: any;
  public ageTableQualiFierList: any;
  public disablityTableQuliFierList: any;
  public elminationPeriodList: any;
  public csfrToken: any;
  public coverageRatingFactorTabName: string;
  public isSubmitted: boolean = false;
  public isAddRatingFiledreadOnly: boolean = false;
  public payableFieldLabel: string = "Compensation Payable";
  public refundFieldLabel: string ="Compensation Refundable";
  public nonRefundFieldLabel: string = "Compensation Non-Refundable";
  public isFiledreadOnly: boolean = false;

  @ViewChild('ratingFactorStatusElement') ratingFactorStatusElement: ElementRef;
  @ViewChild('businessList') businessList: ElementRef;
  @ViewChild('productStatusList') productStatusList: ElementRef;
  @ViewChild('planStatusList') planStatusList: ElementRef;
  @ViewChild('LOBElement') LOBElement: ElementRef;
  @ViewChild('coverageTypeElement') coverageTypeElement: ElementRef;
  @ViewChild('coverageStatusList') coverageStatusList: ElementRef;
  @ViewChild('ratingFactorEffectiveDateElement') ratingFactorEffectiveDateElement: ElementRef;

  constructor(private mdCodeListHeaderDS: MDCodeListHeaderDS,
    private mdMondServiceDS: MDMondServiceDS,
    private coverageDetailService: CoverageDetailFormBuilderService,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private render: Renderer2,
    private CoverageRatingFactorDetailService: CoverageRatingFactorDetailFormBuilderService
  ) { }

  ngOnInit() {
    debugger;

    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-BusinessModel').subscribe(
      data => {
        this.productBusinessModelList = data;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145639, "codeListHeaderId": 1566, "code": "1", "description": "Merchant" }, { "codeListValuesId": 145640, "codeListHeaderId": 1566, "code": "2", "description": "Location" }]
        this.productBusinessModelList = data;
      })

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

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-AgeTableQualifier').subscribe(
      data => {
        this.ageTableQualiFierList = data;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145543, "codeListHeaderId": 1541, "code": "1", "description": "Aggregate" }, { "codeListValuesId": 145544, "codeListHeaderId": 1541, "code": "2", "description": "Age Banded" }, { "codeListValuesId": 145545, "codeListHeaderId": 1541, "code": "3", "description": "Age Banded 1" }, { "codeListValuesId": 145546, "codeListHeaderId": 1541, "code": "4", "description": "Age Banded 2" }, { "codeListValuesId": 145547, "codeListHeaderId": 1541, "code": "5", "description": "Gender Rated" }]
        this.ageTableQualiFierList = data;
      })

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-DisablityTableQualifier').subscribe(
      data => {
        this.disablityTableQuliFierList = data;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145939, "codeListHeaderId": 1592, "code": "1", "description": "N/A" }, { "codeListValuesId": 145940, "codeListHeaderId": 1592, "code": "3", "description": "Regular" }, { "codeListValuesId": 145941, "codeListHeaderId": 1592, "code": "2", "description": "DIS II" }, { "codeListValuesId": 145942, "codeListHeaderId": 1592, "code": "4", "description": "Std Class" }]
        this.disablityTableQuliFierList = data;
      })

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ElmininationPeriod').subscribe(
      data => {
        this.elminationPeriodList = data;
      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145943, "codeListHeaderId": 1593, "code": "2", "description": "14R" }, { "codeListValuesId": 145944, "codeListHeaderId": 1593, "code": "3", "description": "14NR" }, { "codeListValuesId": 145945, "codeListHeaderId": 1593, "code": "1", "description": "N/A" }, { "codeListValuesId": 145946, "codeListHeaderId": 1593, "code": "4", "description": "30R" }, { "codeListValuesId": 145947, "codeListHeaderId": 1593, "code": "5", "description": "30NR" }, { "codeListValuesId": 145948, "codeListHeaderId": 1593, "code": "6", "description": "60NR" }, { "codeListValuesId": 145949, "codeListHeaderId": 1593, "code": "7", "description": "90NR" }]
        this.elminationPeriodList = data;
      })

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-Pre_ExistingConditionValuePayOnce').subscribe(
      data => {
        this.preExistingConditionList = data;
      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145950, "codeListHeaderId": 1594, "code": "5", "description": "12/12" }, { "codeListValuesId": 145951, "codeListHeaderId": 1594, "code": "3", "description": "6/6" }, { "codeListValuesId": 145952, "codeListHeaderId": 1594, "code": "6", "description": "12/18" }, { "codeListValuesId": 145953, "codeListHeaderId": 1594, "code": "2", "description": "0/0" }, { "codeListValuesId": 145954, "codeListHeaderId": 1594, "code": "1", "description": "N/A" }, { "codeListValuesId": 145955, "codeListHeaderId": 1594, "code": "4", "description": "6/18" }, { "codeListValuesId": 145956, "codeListHeaderId": 1594, "code": "7", "description": "18/18" }, { "codeListValuesId": 145957, "codeListHeaderId": 1594, "code": "8", "description": "24/24" }, { "codeListValuesId": 145980, "codeListHeaderId": 1594, "code": "9", "description": "12/24" }]
        this.preExistingConditionList = data;
      })

    debugger;
    this.coverageRatingFactorDetailsForm = this.CoverageRatingFactorDetailService.form;
    this.coverageRatingFactorDetailsForm.reset();
    this.coverageRatingFactorDetailsForm.patchValue(this.rateFactorDetails);
  }

  ngAfterViewInit() {
    this.isAddRatingFiledreadOnly = true;
    this.isFiledreadOnly = true;
    this.render.setAttribute(this.ratingFactorStatusElement.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.businessList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.planStatusList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.LOBElement.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.coverageTypeElement.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.coverageStatusList.nativeElement, 'disabled', 'true');
    
    
    console.log('this.coverageRatingFactorDetailsForm.value', this.coverageRatingFactorDetailsForm.value)
  }

  getClientNameDetails(event) {
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchListOfClientNames", JSON.stringify({ "clientName": event.target.value.trim() }), "").subscribe(
      data => {
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = { "key": "key", "value": "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiI1IiwidmFsdWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4ifSx7ImlkIjoiMiIsInZhbHVlIjoiQ3JlbG9naXgifV19" }
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      })
  }

  onClickOfCompensationRefundable(event) {
    debugger;
    if (event.currentTarget.lastElementChild.control.checked == false) {
      this.isShowRefundableField = true;
      this.isShowNonrefundableField = true;
    } else {
      this.isShowRefundableField = false;
      this.isShowNonrefundableField = false;
    }
  }

  onChangeOfLOB(event) {
    debugger;
    // this.isLOBSubmitted = false;
    let formVariable = {
      "clientId": this.rateFactorDetails.planProductInfo.clientIdentifier,
      "lineOfBusiness": event.currentTarget.value
    }

    this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchCoverageTypeList', JSON.stringify(formVariable), null).subscribe(
      data => {
        this.coverageTypeList = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = { "key": "key", "value": "ewogICJjb3ZlcmFnZVR5cGVMaXN0X2NvdmVyYWdlTG9va1VwIjogWwogICAgewogICAgICAiY292ZXJhZ2VUeXBlIjogIkNSRUxJIiwKICAgICAgImNvdmVyYWdlQ29kZSI6ICJMSSIKICAgIH0sCgl7CiAgICAgICJjb3ZlcmFnZVR5cGUiOiAiQ1JFREkiLAogICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgfQogIF0KfQ==" };
        this.coverageTypeList = JSON.parse(atob(data.value)).coverageTypeList_coverageLookUp;
      })
  }

  onKeyUpOfLoanThresholdVal(event) {
    debugger;
    if (event.target.value == "") {
      $(".coverageHelp").tooltip('show');
    }

  }

  onKeyUpOfCompensationRatingFactor(event) {
    if (event.target.value == "") {
      $(".ratingHelp").tooltip('show');
    }
  }

  onKeyUpOfCompensationPayable(event) {
    if (event.target.value == "") {
      $(".payableHelp").tooltip('show');
    }
  }

  onKeyUpOfCompensationRefundable(event) {
    if (event.target.value == "") {
      $(".refundableHelp").tooltip('show');
    }
  }

  onKeyUpOfCompensationNonRefundable(event) {
    if (event.target.value == "") {
      $(".nonRefundable").tooltip('show');
    }
  }

  onChangeOfPayable(event) {
    debugger;
    if (event.target.value == "amount") {
      this.payableFieldLabel = "Compensation Payable Amount $";
      this.refundFieldLabel = "Compensation Refundable Amount $";
      this.nonRefundFieldLabel = "Compensation Non-Refundable  Amount $";
    }

    if (event.target.value == "percentage") {
      this.payableFieldLabel = "Compensation Payable %";
      this.refundFieldLabel = "Compensation Refundable %";
      this.nonRefundFieldLabel = "Compensation Non-Refundable %";
    }

    if(event.target.value == ""){
      this.payableFieldLabel = "Compensation Payable";
      this.refundFieldLabel = "Compensation Refundable";
      this.nonRefundFieldLabel = "Compensation Non-Refundable";
    }
  }

  onClickOfCoverageRatingFactorSubmit() {
    debugger;   
    // this.coverageRatingFactorDetailsForm.value;
    if (this.coverageRatingFactorDetailsForm.get('coverageRatingFactorInfo').invalid) {
      this.isSubmitted = true;
      this.mdMondServiceDS.showErrorMessage("Please fill the mandatory fields.");
      return;
    }
    if (this.coverageRatingFactorTabName == "Add Rating Factor") {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.currentRecordFlag = "N";
    } else {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.currentRecordFlag = "Y";
    }

    if (this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.compensationAmountRefundableFlag == true || this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.compensationAmountRefundableFlag == "Y") {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.compensationAmountRefundableFlag = "Y";
    } else {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.compensationAmountRefundableFlag = "N";
    }

    if (this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.acceleratedDeathBenefitCode == true || this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.acceleratedDeathBenefitCode == "Y") {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.acceleratedDeathBenefitCode = "Y";
    } else {
      this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.acceleratedDeathBenefitCode = "N";
    }

    this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo.ratingFactorEffectiveDate =  this.ratingFactorEffectiveDateElement.nativeElement.value + 'T00:00:00.000Z';

    let coverageRatingfactorArray = [];
    let coverageRatingFactorObj = {};

    let productInfo = {
      "productType": this.coverageRatingFactorDetailsForm.value.productInfo.productType,
      "productName": this.coverageRatingFactorDetailsForm.value.productInfo.productName,
      "productBusinessModel": this.coverageRatingFactorDetailsForm.value.productInfo.productBusinessModel,
      "productEffectiveDate": this.coverageRatingFactorDetailsForm.value.productInfo.productEffectiveDate,
      "productStatus": this.coverageRatingFactorDetailsForm.value.productInfo.productStatus,
      "productId": this.coverageRatingFactorDetailsForm.value.productInfo.productId
    }

    let planProductInfo = {
      "planNumber": this.coverageRatingFactorDetailsForm.value.planProductInfo.planNumber,
      "planName": this.coverageRatingFactorDetailsForm.value.planProductInfo.planName,
      "clientName": this.coverageRatingFactorDetailsForm.value.planProductInfo.clientName,
      "planEffectiveDate": this.coverageRatingFactorDetailsForm.value.planProductInfo.planEffectiveDate,
      "planStatus": this.coverageRatingFactorDetailsForm.value.planProductInfo.planStatus,
      "clientIdentifier": this.coverageRatingFactorDetailsForm.value.planProductInfo.clientIdentifier,
      "planProductInfoId": this.coverageRatingFactorDetailsForm.value.planProductInfo.planProductInfoId
    }

    let coverageInfo = {
      lineOfBusiness: this.coverageRatingFactorDetailsForm.value.coverageInfo.lineOfBusiness,
      coverageType: this.coverageRatingFactorDetailsForm.value.coverageInfo.coverageType,
      coverageEffectiveDate: this.coverageRatingFactorDetailsForm.value.coverageInfo.coverageEffectiveDate,
      coverageStatus: this.coverageRatingFactorDetailsForm.value.coverageInfo.coverageStatus,
      planCoverageInfoId: this.coverageRatingFactorDetailsForm.value.coverageInfo.planCoverageInfoId
    }

    coverageRatingFactorObj["productInfo"] = productInfo;
    coverageRatingFactorObj["planProductInfo"] = planProductInfo;
    coverageRatingFactorObj["coverageInfo"] = coverageInfo;
    coverageRatingFactorObj["coverageRatingFactorInfo"] = this.coverageRatingFactorDetailsForm.value.coverageRatingFactorInfo;
    coverageRatingFactorObj["mondFormDateFormat"] = this.coverageRatingFactorDetailsForm.value.mondFormDateFormat;
    coverageRatingfactorArray.push(coverageRatingFactorObj);
    console.log("coverageArray", coverageRatingfactorArray);

    console.log(" this.coverageRatingFactorDetailsForm", this.coverageRatingFactorDetailsForm);
    // let formData = btoa(JSON.stringify(this.coverageDetailsForm.value));
    let formData = btoa(JSON.stringify(coverageRatingfactorArray[0]));

    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SaveCoverageRatingFactorData", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
      data => {
        // console.log("onClickOfClientSubmit data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

      }, error => {
        this.mdMondServiceDS.MDError(error);
      });

  }
}
