import { Component, ElementRef, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormGroup } from '@angular/forms';
import { Base64 } from 'js-base64';
import { PlanCoverageFormBuilderService } from 'projects/cooperators/src/app/form-builder/productMaintenance/planCoverageBundleDetails/plan-coverage-bundle-detail-form-builder.service';
import { MDCommonGetterSetter } from 'projects/cooperators/src/app/_services/common/MDCommonGetterSetter';
import { MDCodeListHeaderDS, MDMondServiceDS } from 'projects/cooperators/src/app/_services/ds';


declare var $: any;

@Component({
  selector: 'app-product-Plan-coverage-Bundle-designer',
  templateUrl: './productPlanCoverageBundle.component.html',
  styleUrls: ['./productPlanCoverageBundle.component.css']
})

export class ProductPlanCoverageBundleComponent implements OnInit {

  @Input() set planCoverageBundleList(data) {
    debugger;
    this.ProductPlanList = data;
  }

  @Input() set planCoverageBundleInformationList(data) {
    debugger;
    this.planCoverageInfoList = data;

  }

  public planCoverageBundleGridData: any;
  public planCoverageBundleFormArray: any;

  public productBusinessModelList: any;
  public clientNameListData: any;
  public ProductPlanList: any;
  public productType: any;
  public productName: any;
  public productBusinessModel: any;
  public productEffectiveDate: any;
  public productStatus: any;
  public planNumber: any;
  public planName: any;
  public clientName: any;
  public planEffectiveDate: any;
  public planStatus: any;
  public isProdFieldReadonly: boolean = true;
  public planCoverageInfoList: any;
  public planCoverageBundleForm: FormGroup;
  public isGridShow: boolean = false;
  public csfrToken: any;
  public isSubmitBtnDisabled: boolean = true;

  @ViewChild('planStatusList') planStatusList: ElementRef;
  @ViewChild('businessList') businessList: ElementRef;
  @ViewChild('productStatusList') productStatusList: ElementRef;

  constructor(private mdCodeListHeaderDS: MDCodeListHeaderDS,
    private mdMondServiceDS: MDMondServiceDS,
    private render: Renderer2, private planCoverageFormBuilder: PlanCoverageFormBuilderService,
    private fb: FormBuilder, private mdCommonGetterAndSetter: MDCommonGetterSetter) {

  }
  ngOnInit() {
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.planCoverageBundleForm = this.planCoverageFormBuilder.form;

    this.productType = this.ProductPlanList.productInfo.productType;
    this.productName = this.ProductPlanList.productInfo.productName;
    this.productBusinessModel = this.ProductPlanList.productInfo.productBusinessModel;
    this.productEffectiveDate = this.ProductPlanList.productInfo.productEffectiveDate;
    this.productStatus = this.ProductPlanList.productInfo.productStatus;
    this.planNumber = this.ProductPlanList.planProductInfo.planNumber;
    this.planName = this.ProductPlanList.planProductInfo.planName;
    this.clientName = this.ProductPlanList.planProductInfo.clientName;
    this.planEffectiveDate = this.ProductPlanList.planProductInfo.planEffectiveDate;
    this.planStatus = this.ProductPlanList.planProductInfo.planStatus;

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-BusinessModel').subscribe(
      data => {
        this.productBusinessModelList = data;

      }, error => {
        this.mdCodeListHeaderDS.MDError(error);
        let data = [{ "codeListValuesId": 145639, "codeListHeaderId": 1566, "code": "1", "description": "Merchant" }, { "codeListValuesId": 145640, "codeListHeaderId": 1566, "code": "2", "description": "Location" }]
        this.productBusinessModelList = data;
      }
    )

    // this.planCoverageBundleForm = 

  }


  ngAfterViewInit() {
    debugger;
    this.isGridShow = false;
    this.isProdFieldReadonly = true;
    this.render.setAttribute(this.planStatusList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.businessList.nativeElement, 'disabled', 'true');
    this.render.setAttribute(this.productStatusList.nativeElement, 'disabled', 'true');
    console.log('this.planCoverageBundleForm.value', this.planCoverageBundleForm.value)
    console.log('this.planCoverageInfoList', this.planCoverageInfoList)
    // planCoverageBundleInfoObj
    this.planCoverageBundleGridData = this.planCoverageInfoList.planCoverageBundleInfo.planCoverageBundleInfo;
    if (this.planCoverageBundleGridData != undefined) {
      this.isGridShow = true;
      // this.addRow = "";
      for (let i = 0; i < this.planCoverageBundleGridData.length; i++) {
        this.planCoverageBundleFormArray = (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo'));
        if (this.planCoverageBundleFormArray.length == 0) {
          this.createRow();
        }
        for (let j = 0; j < this.planCoverageBundleFormArray.length; j++) {
          // if formcontrol have length greater than or less than from rategrid array
          if (this.planCoverageBundleFormArray.length < this.planCoverageBundleGridData.length) {
            this.createRow();
          } else if (this.planCoverageBundleFormArray.length > this.planCoverageBundleGridData.length) {
            if (this.planCoverageBundleFormArray.value[j].loanAmountStartValue == null) {
              (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
            } else {
              (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
            }
          }
        }
      }
    }
    this.planCoverageBundleForm.patchValue(this.planCoverageInfoList);

  }


  getClientNameDetails(event) {
    debugger
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchListOfClientNames", JSON.stringify({ "clientName": event.target.value.trim() }), "").subscribe(
      data => {
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        let data = { "key": "key", "value": "eyJyZXNwb25zZV9yZXNwb25zZSI6W3siaWQiOiI1IiwidmFsdWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4ifSx7ImlkIjoiMiIsInZhbHVlIjoiQ3JlbG9naXgifV19" }
        this.clientNameListData = JSON.parse(Base64.decode(data.value)).response_response;
      }
    )
  }

  createRow() {
    this.planCoverageBundleFormArray.push(
      this.fb.group({
        coverageCode: [''],
        premiumSplitPercentage: [''],
        planProductInfoId: ['']
      }))
  }

  deleteRow(index) {
    (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(index);
  }

  onClickOfAddResetBtn() {
    debugger;
    this.isGridShow = false;
    let planCoverageBundleInformationGridList;
    this.mdMondServiceDS.invokeMondServiceGET("Creditor Self Admin", "fetchPlanCoverageList", "1.00", btoa(JSON.stringify({ "planProductInfoId": this.ProductPlanList.planProductInfo.planProductInfoId })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        planCoverageBundleInformationGridList = JSON.parse(atob(data));

        this.planCoverageBundleGridData = planCoverageBundleInformationGridList.planCoverageBundleInfo.planCoverageBundleInfo;
        if (this.planCoverageBundleGridData != undefined) {
          this.isGridShow = true;
          // this.addRow = "";
          for (let i = 0; i < this.planCoverageBundleGridData.length; i++) {
            this.planCoverageBundleFormArray = (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo'));
            if (this.planCoverageBundleFormArray.length == 0) {
              this.createRow();
            }
            for (let j = 0; j < this.planCoverageBundleFormArray.length; j++) {
              // if formcontrol have length greater than or less than from rategrid array
              if (this.planCoverageBundleFormArray.length < this.planCoverageBundleGridData.length) {
                this.createRow();
              } else if (this.planCoverageBundleFormArray.length > this.planCoverageBundleGridData.length) {
                if (this.planCoverageBundleFormArray.value[j].loanAmountStartValue == null) {
                  (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
                } else {
                  (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
                }
              }
            }
          }
        }

        this.planCoverageBundleForm.reset();
        this.planCoverageBundleForm.patchValue(planCoverageBundleInformationGridList);
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        // let data = "ewogICJwbGFuQ292ZXJhZ2VCdW5kbGVJbmZvIjogewogICAgInBsYW5Db3ZlcmFnZUJ1bmRsZUluZm8iOiBbCiAgICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkyIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgICB9LAoJICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkzIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkxJIgogICAgICB9LAoJICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTk0IiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkpJIgogICAgICB9CiAgICBdCiAgfQp9";
        let data = "ewogICJwbGFuQ292ZXJhZ2VCdW5kbGVJbmZvIjogewogICAgInBsYW5Db3ZlcmFnZUJ1bmRsZUluZm8iOiBbCiAgICAgIHsKICAgICAgICAicGxhblByb2R1Y3RJbmZvSWQiOiAiMTkyIiwKICAgICAgICAicHJlbWl1bVNwbGl0UGVyY2VudGFnZSI6IDEwMCwKICAgICAgICAiY292ZXJhZ2VDb2RlIjogIkRJIgogICAgICB9CiAgICBdCiAgfQp9";
        planCoverageBundleInformationGridList = JSON.parse(atob(data));

        this.planCoverageBundleGridData = planCoverageBundleInformationGridList.planCoverageBundleInfo.planCoverageBundleInfo;
        if (this.planCoverageBundleGridData != undefined) {
          this.isGridShow = true;
          // this.addRow = "";
          for (let i = 0; i < this.planCoverageBundleGridData.length; i++) {
            this.planCoverageBundleFormArray = (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo'));
            if (this.planCoverageBundleFormArray.length == 0) {
              this.createRow();
            }
            for (let j = 0; j < this.planCoverageBundleFormArray.length; j++) {
              // if formcontrol have length greater than or less than from rategrid array
              if (this.planCoverageBundleFormArray.length < this.planCoverageBundleGridData.length) {
                this.createRow();
              } else if (this.planCoverageBundleFormArray.length > this.planCoverageBundleGridData.length) {
                if (this.planCoverageBundleFormArray.value[j].loanAmountStartValue == null) {
                  (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
                } else {
                  (<FormArray>this.planCoverageBundleForm.get('planCoverageBundleInfo.planCoverageBundleInfo')).removeAt(j);
                }
              }
            }
          }
        }

        this.planCoverageBundleForm.reset();
        this.planCoverageBundleForm.patchValue(planCoverageBundleInformationGridList);
      });
  }
  onkeyUpOfPremiumSplitField() {
    this.isSubmitBtnDisabled = false;
  }

  onClickOfCoveragebundleSubmit() {
    debugger;
    let gridArray = this.planCoverageBundleForm.value.planCoverageBundleInfo.planCoverageBundleInfo;
    let premiumPercentage = 0;
    for (let i = 0; i < gridArray.length; i++) {
      if (gridArray[i].premiumSplitPercentage == '0' || gridArray[i].premiumSplitPercentage == 0) {
        gridArray[i].premiumSplitPercentage = '';
      }
      premiumPercentage += parseFloat(gridArray[i].premiumSplitPercentage);
      gridArray[i].planProductInfoId = this.ProductPlanList.planProductInfo.planProductInfoId;
    }

    if (premiumPercentage > 100 || premiumPercentage < 100) {
      this.mdMondServiceDS.showErrorMessage("Premium Split Percentage should be equal to 100");
      premiumPercentage = 0;
    } else if (premiumPercentage == 100) {
      let formData = btoa(JSON.stringify(this.planCoverageBundleForm.value));
      this.mdMondServiceDS.invokeMondService("Creditor Self Admin", "SavePlanCoverageBundleInfo", "1.00", formData, this.csfrToken, true, true, true, true).subscribe(
        data => {
          // console.log("onClickOfClientSubmit data", data);
          this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);

        }, error => {
          this.mdMondServiceDS.MDError(error);
        });
    } else {
      this.mdMondServiceDS.showErrorMessage("Premium Split Percentage for the bundles should be greater than 0");
    }

  }

}