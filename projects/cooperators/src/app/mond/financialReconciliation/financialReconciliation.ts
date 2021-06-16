import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MDCodeListHeaderDS, MDMondServiceDS, MDExecuteServiceDS, MDFormAccessDS } from '../../_services/ds'
import { Base64 } from 'js-base64';
import { SelectItem } from 'primeng/api';
import { saveAs } from 'file-saver';
import { MDCommonGetterSetter } from '../../_services/common';

export interface PremiumInterface {
  total: number;
  premiumProvince: string;
  differenceOtherPremium: number;
  differenceLifePremium: number;
  sysCalcLifePremium: number;
  sysCalcOtherPremium: number;
  clientReportLifePremium: number;
  clientReportOtherPremium: number;
}

@Component({
  selector: 'app-financial-reconciliation-designer',
  templateUrl: './financialReconciliation.html',
  styleUrls: ['./financialReconciliation.css'],

})

export class FinancialReconciliationComponent implements OnInit {
  public selectedMonth: any;
  public selectedYear: any;
  public reportClientName: any;
  public reconciliationHeaderSummary: any;
  public reconciliationSummary: any;
  public summary: any;
  public commission: any;
  public taxes: any;
  public premium: any;
  isDisabledFl: boolean = true;
  selectedClient: any;
  reconciliationEntry: FormGroup;
  selectedTab: number = 0;
  premiumArray: Array<any>;
  premiumProvinceList: SelectItem[];
  taxesProvinceList: SelectItem[];
  commissionProvinceList: SelectItem[];

  clonedPremium: { [s: string]: PremiumInterface } = {};
  rowGroupPremiumGridMetadata: {};
  rowGroupCommissionGridMetadata: {};
  rowGroupTaxesGridMetadata: {};
  dropDownOptionList: {};
  premiumFooterClientRepLifeTotalPremium: any;
  premiumFooterClientRepOtherTotalPremium: any;
  premiumFooterSysCalcLifeTotalPremium: any;
  premiumFooterSysCalcOtherTotalPremium: any;
  premiumFooterDifferenceLifeTotalPremium: any;
  premiumFooterDifferenceOtherTotalPremium: any;
  clonedTaxes: any;
  clonedCommission: any;
  taxesFooterClientRepTotalDealerRemitTax: any;
  taxesFooterClientRepTotalDealerNotRemitTax: any;
  taxesFooterSysCalcTotalDealerRemitTax: any;
  taxesFooterSysCalcTotalDealerNotRemitTax: any;
  taxesFooterDifferenceTotalDealerRemitTax: any;
  taxesFooterDifferenceTotalDealerNotRemitTax: any;
  commissionFooterClientRepLifeTotalCompAmt: any;
  commissionFooterClientRepOtherTotalCompAmt: any;
  commissionFooterSysCalcLifeTotalCompAmt: any;
  commissionFooterSysCalcOtherTotalCompAmt: any;
  commissionFooterDifferenceLifeTotalCompAmt: any;
  commissionFooterDifferenceOtherTotalCompAmt: any;
  reportTaxRemitByClientFlag: any;
  reportClientNameDisp: any;
  searchFl: boolean = false;
  addReconFl: boolean = false;
  generatReportFl: boolean = false;
  calSysValFl: boolean = false;
  refreshTotalFl: boolean = false;
  clearFl: boolean = false;
  submitFl: boolean = false;
  reportPeriodMonth: any;
  reportPeriodYear: any;
  selectedReconciliationHeaderIdentifier: any;
  selectedReportCreatedBy: any;
  reportTaxRemitByClientFlagToJSON: string;
  csfrToken: string;
  reportPeriodMonthSearch: string;
  reportPeriodYearSearch: string;


  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdExecuteServiceDS: MDExecuteServiceDS,
    private mdFormAccessDS: MDFormAccessDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private codeListFetch: MDCodeListHeaderDS) { }

  ngOnInit() {
    debugger;
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.codeListFetch.getListOfCodeLists('LAIS-ProvinceCode').subscribe(
      data => {
        let optionObject = {};
        let dropdownOptionArray: Array<any> = [];
        for (let codeList of data) {
          debugger;
          optionObject[codeList.code] = codeList.description;

          let dropdownObj = {};
          dropdownObj["label"] = codeList.description;
          dropdownObj["value"] = codeList.code;
          dropdownOptionArray.push(dropdownObj);
        }
        this.dropDownOptionList = optionObject;
        this.premiumProvinceList = dropdownOptionArray;
        this.taxesProvinceList = dropdownOptionArray;
        this.commissionProvinceList = dropdownOptionArray;
      },
      err => {
        let optionObject = {};
        let data = [{ "codeListValuesId": 148932, "codeListHeaderId": 1649, "code": "AB", "description": "Alberta" }, { "codeListValuesId": 148933, "codeListHeaderId": 1649, "code": "BC", "description": "British Columbia" }, { "codeListValuesId": 148934, "codeListHeaderId": 1649, "code": "MB", "description": "Manitoba" }, { "codeListValuesId": 148935, "codeListHeaderId": 1649, "code": "NB", "description": "New Brunswick" }, { "codeListValuesId": 148936, "codeListHeaderId": 1649, "code": "NL", "description": "Newfoundland and Labrador" }, { "codeListValuesId": 148937, "codeListHeaderId": 1649, "code": "NS", "description": "Nova Scotia" }, { "codeListValuesId": 148938, "codeListHeaderId": 1649, "code": "NT", "description": "Northwest Territories" }, { "codeListValuesId": 148939, "codeListHeaderId": 1649, "code": "NU", "description": "Nunavut" }, { "codeListValuesId": 148940, "codeListHeaderId": 1649, "code": "ON", "description": "Ontario" }, { "codeListValuesId": 148941, "codeListHeaderId": 1649, "code": "PE", "description": "Prince Edward Island" }, { "codeListValuesId": 148942, "codeListHeaderId": 1649, "code": "QC", "description": "Quebec" }, { "codeListValuesId": 148943, "codeListHeaderId": 1649, "code": "SK", "description": "Saskatchewan" }, { "codeListValuesId": 148944, "codeListHeaderId": 1649, "code": "YT", "description": "Yukon" }]
        let dropdownOptionArray: Array<any> = [];
        for (let codeList of data) {
          debugger;
          optionObject[codeList.code] = codeList.description;

          let dropdownObj = {};
          dropdownObj["label"] = codeList.description;
          dropdownObj["value"] = codeList.code;
          dropdownOptionArray.push(dropdownObj);
        }
        this.dropDownOptionList = optionObject;
        this.premiumProvinceList = dropdownOptionArray;
        this.taxesProvinceList = dropdownOptionArray;
        this.commissionProvinceList = dropdownOptionArray;

      });
    //Setting default value for summary grid
    this.summary = [{ "feeName": "Refund Admin Fee" }, { "feeName": "Net Total" }];

    //Showing the buttons based on accessrights
    this.mdFormAccessDS.getFormAccessAllowedBasedOnFormName('Financial Reconciliation Report').subscribe(
      listOfActions => {
        for (let accessObj of listOfActions) {
          if (accessObj.actionName == "Reconciliation Search" && accessObj.allowedFlag == true) {
            this.searchFl = true;
          }
          if (accessObj.actionName == "Add Reconciliation" && accessObj.allowedFlag == true) {
            this.addReconFl = true;
          }
          if (accessObj.actionName == "Generate FR Discrepancy" && accessObj.allowedFlag == true) {
            this.generatReportFl = true;
          }
          if (accessObj.actionName == "Calculate System Values" && accessObj.allowedFlag == true) {
            this.calSysValFl = true;
          }
          if (accessObj.actionName == "Refresh Totals" && accessObj.allowedFlag == true) {
            this.refreshTotalFl = true;
          }
          if (accessObj.actionName == "Clear" && accessObj.allowedFlag == true) {
            this.clearFl = true;
          }
          if (accessObj.actionName == "Submit" && accessObj.allowedFlag == true) {
            this.submitFl = true;
          }
        }
      },
      err => {
        debugger;
        let listOfActions = [{ "formName": "Financial Reconciliation Report", "actionName": "Add Reconciliation", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Calculate System Values", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Clear", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Generate FR Discrepancy", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Reconciliation Search", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Refresh Totals", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Report", "allowedFlag": true }, { "formName": "Financial Reconciliation Report", "actionName": "Submit", "allowedFlag": true }];
        for (let accessObj of listOfActions) {
          if (accessObj.actionName == "Reconciliation Search" && accessObj.allowedFlag == true) {
            this.searchFl = true;
          }
          if (accessObj.actionName == "Add Reconciliation" && accessObj.allowedFlag == true) {
            this.addReconFl = true;
          }
          if (accessObj.actionName == "Generate FR Discrepancy" && accessObj.allowedFlag == true) {
            this.generatReportFl = true;
          }
          if (accessObj.actionName == "Calculate System Values" && accessObj.allowedFlag == true) {
            this.calSysValFl = true;
          }
          if (accessObj.actionName == "Refresh Totals" && accessObj.allowedFlag == true) {
            this.refreshTotalFl = true;
          }
          if (accessObj.actionName == "Clear" && accessObj.allowedFlag == true) {
            this.clearFl = true;
          }
          if (accessObj.actionName == "Submit" && accessObj.allowedFlag == true) {
            this.submitFl = true;
          }
        }
      })
  }

  onChangeOfTaxRemittedByClientCheckBox(event) {

  }

  getDropdownDisplayValue(key) {
    return this.dropDownOptionList[key];
  }

  onClickOfMonthAndYear(event) {
    debugger;
    let pickedDate = event;
    let splitedValue = pickedDate.split(" ");
    this.reportPeriodMonth = this.getMonthNumberBasedOnMonthName(splitedValue[0]);
    this.reportPeriodYear = splitedValue[1];
  }

  onRowSelectOfReconciliation(event) {
    debugger;
    this.selectedTab = 1;
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchReconciliationDetails", JSON.stringify({ "reconciliationHeaderId": event.data.reconciliationHeaderIdentifier }), this.csfrToken).subscribe(
      data => {
        // this.selectedTab = 1;
        let responseData = JSON.parse(Base64.decode(data.value));
        this.setValuesForFields(responseData);
        this.isDisabledFl = false;
      },
      error => {
        debugger;
        // this.selectedTab = 1;
        // let data = JSON.parse(Base64.decode("eyJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBUb3RhbERlYWxlclJlbWl0VGF4IjozNTAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydFBlcmlvZE1vbnRoIjo5LCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZWNvbmNpbGlhdGlvbkhlYWRlcklkZW50aWZpZXIiOjIwLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9zeXNDYWxjTGlmZVRvdGFsQ29tcEFtdCI6NjUzNzcuNSwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY090aGVyVG90YWxDb21wQW10IjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9mZWVTdW1tYXJ5IjpbeyJjbGllbnRSZXBMaWZlQW1vdW50IjowLCJkaWZmZXJlbmNlTGlmZUFtb3VudCI6MCwiY2xpZW50UmVwT3RoZXJBbW91bnQiOjAsInN5c0NhbGNMaWZlQW1vdW50IjowLCJmZWVOYW1lIjoiUmVmdW5kQWRtaW5GZWUiLCJzeXNDYWxjT3RoZXJBbW91bnQiOjAsImRpZmZlcmVuY2VPdGhlckFtb3VudCI6MH0seyJjbGllbnRSZXBMaWZlQW1vdW50IjoxMjc2MCwiZGlmZmVyZW5jZUxpZmVBbW91bnQiOjY1MDQ2LjQ1LCJjbGllbnRSZXBPdGhlckFtb3VudCI6MzY3NjAsInN5c0NhbGNMaWZlQW1vdW50Ijo2NjQ2OC41NSwiZmVlTmFtZSI6Ik5ldFRvdGFsIiwic3lzQ2FsY090aGVyQW1vdW50IjoyOTg2LjA1LCJkaWZmZXJlbmNlT3RoZXJBbW91bnQiOjMzNzczLjk1fV0sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX3ByZW1pdW0iOlt7InByZW1pdW1Qcm92aW5jZSI6Ik5CIiwiZGlmZmVyZW5jZU90aGVyUHJlbWl1bSI6ODM1My43NSwiZGlmZmVyZW5jZUxpZmVQcmVtaXVtIjoyOTUxLjI1LCJzeXNDYWxjTGlmZVByZW1pdW0iOjU0OC43NSwic3lzQ2FsY090aGVyUHJlbWl1bSI6MTY0Ni4yNSwiY2xpZW50UmVwb3J0TGlmZVByZW1pdW0iOjM1MDAsImNsaWVudFJlcG9ydE90aGVyUHJlbWl1bSI6MTAwMDB9LHsicHJlbWl1bVByb3ZpbmNlIjoiUUMiLCJkaWZmZXJlbmNlT3RoZXJQcmVtaXVtIjo2ODAzLjc1LCJkaWZmZXJlbmNlTGlmZVByZW1pdW0iOjIxMDEuMjUsInN5c0NhbGNMaWZlUHJlbWl1bSI6Mzk4Ljc1LCJzeXNDYWxjT3RoZXJQcmVtaXVtIjoxMTk2LjI1LCJjbGllbnRSZXBvcnRMaWZlUHJlbWl1bSI6MjUwMCwiY2xpZW50UmVwb3J0T3RoZXJQcmVtaXVtIjo4MDAwfV0sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydENsaWVudE5hbWUiOiJMR00iLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9zeXNDYWxjTGlmZVRvdGFsUHJlbWl1bSI6OTQ3LjUsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX3N5c0NhbGNPdGhlclRvdGFsUHJlbWl1bSI6Mjg0Mi41LCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZXBvcnRMYXN0TW9kaWZpZWREYXRlIjoiMjAyMS0wMi0wNFQwMDowMDowMC4wMDBaIiwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY1RvdGFsRGVhbGVyTm90UmVtaXRUYXgiOjE0My41NSwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZVRvdGFsRGVhbGVyUmVtaXRUYXgiOjM1MCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY1RvdGFsRGVhbGVyUmVtaXRUYXgiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NvbW1pc3Npb24iOlt7InN5c0NhbGNPdGhlckNvbXBlbnNhdGlvbkFtb3VudCI6MCwiY2xpZW50UmVwb3J0T3RoZXJDb21wQW10IjoxMDAwMCwiZGlmZmVyZW5jZU90aGVyQ29tcEFtdCI6MTAwMDAsImNsaWVudFJlcG9ydExpZmVDb21wQW10IjozNTAwLCJkaWZmZXJlbmNlTGlmZUNvbXBBbXQiOjM0MzYzLjc1LCJzeXNDYWxjTGlmZUNvbXBlbnNhdGlvbkFtb3VudCI6Mzc4NjMuNzUsImNvbW1pc3Npb25Qcm92aW5jZSI6Ik5CIn0seyJzeXNDYWxjT3RoZXJDb21wZW5zYXRpb25BbW91bnQiOjAsImNsaWVudFJlcG9ydE90aGVyQ29tcEFtdCI6ODAwMCwiZGlmZmVyZW5jZU90aGVyQ29tcEFtdCI6ODAwMCwiY2xpZW50UmVwb3J0TGlmZUNvbXBBbXQiOjI1MDAsImRpZmZlcmVuY2VMaWZlQ29tcEFtdCI6MjUwMTMuNzUsInN5c0NhbGNMaWZlQ29tcGVuc2F0aW9uQW1vdW50IjoyNzUxMy43NSwiY29tbWlzc2lvblByb3ZpbmNlIjoiUUMifV0sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydFBlcmlvZFllYXIiOjIwMjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcFRvdGFsRGVhbGVyTm90UmVtaXRUYXgiOjQxMCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25IZWFkZXJfcmVwb3J0Q3JlYXRlZEJ5IjoiVmlkaHlhIFZlbnVnb3BhbCIsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcE90aGVyVG90YWxQcmVtaXVtIjoxODAwMCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZUxpZmVUb3RhbENvbXBBbXQiOjU5Mzc3LjUsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcE90aGVyVG90YWxDb21wQW10IjoxODAwMCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZU90aGVyVG90YWxDb21wQW10IjoxODAwMCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZUxpZmVUb3RhbFByZW1pdW0iOjUwNTIuNSwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZU90aGVyVG90YWxQcmVtaXVtIjoxNTE1Ny41LCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBMaWZlVG90YWxDb21wQW10Ijo2MDAwLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF90YXgiOlt7ImNsaWVudFJlcG9ydERlYWxlclJlbWl0VGF4IjoxNTAsImRpZmZlcmVuY2VEZWFsZXJSZW1pdFRheCI6MTUwLCJjbGllbnRSZXBvcnREZWFsZXJOb3RSZW1pdFRheCI6MjAwLCJzeXNDYWxjRGVhbGVyTm90UmVtaXRUYXgiOjAsInN5c0NhbGNEZWFsZXJSZW1pdFRheCI6MCwiZGlmZmVyZW5jZURlYWxlck5vdFJlbWl0VGF4IjoyMDAsInRheFByb3ZpbmNlIjoiTkIifSx7ImNsaWVudFJlcG9ydERlYWxlclJlbWl0VGF4IjoyMDAsImRpZmZlcmVuY2VEZWFsZXJSZW1pdFRheCI6MjAwLCJjbGllbnRSZXBvcnREZWFsZXJOb3RSZW1pdFRheCI6MjEwLCJzeXNDYWxjRGVhbGVyTm90UmVtaXRUYXgiOjE0My41NSwic3lzQ2FsY0RlYWxlclJlbWl0VGF4IjowLCJkaWZmZXJlbmNlRGVhbGVyTm90UmVtaXRUYXgiOjY2LjQ1LCJ0YXhQcm92aW5jZSI6IlFDIn1dLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9kaWZmZXJlbmNlVG90YWxEZWFsZXJOb3RSZW1pdFRheCI6MjY2LjQ1LCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9yZWNvbmNpbGlhdGlvblN1bW1hcnkiOlt7ImRpZmZlcmVuY2VSZXBvcnRBbW91bnQiOjIwMjEwLCJzdW1tYXJ5VHlwZSI6IlByZW1pdW0iLCJjbGllbnRSZXBvcnRBbW91bnQiOjI0MDAwLCJzeXN0ZW1SZXBvcnRBbW91bnQiOjM3OTB9LHsiZGlmZmVyZW5jZVJlcG9ydEFtb3VudCI6NjE2LjQ1LCJzdW1tYXJ5VHlwZSI6IlRheCIsImNsaWVudFJlcG9ydEFtb3VudCI6NzYwLCJzeXN0ZW1SZXBvcnRBbW91bnQiOjE0My41NX0seyJkaWZmZXJlbmNlUmVwb3J0QW1vdW50Ijo0MTM3Ny41LCJzdW1tYXJ5VHlwZSI6IkNvbW1pc3Npb24iLCJjbGllbnRSZXBvcnRBbW91bnQiOjI0MDAwLCJzeXN0ZW1SZXBvcnRBbW91bnQiOjY1Mzc3LjV9LHsiZGlmZmVyZW5jZVJlcG9ydEFtb3VudCI6NjIyMDMuOTUsInN1bW1hcnlUeXBlIjoiU3VtbWFyeU5ldFRvdGFsIiwiY2xpZW50UmVwb3J0QW1vdW50Ijo0ODc2MCwic3lzdGVtUmVwb3J0QW1vdW50Ijo2OTMxMS4wNX1dLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZXBvcnRUYXhSZW1pdEJ5Q2xpZW50RmxhZyI6Ik4iLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBMaWZlVG90YWxQcmVtaXVtIjo2MDAwfQ=="))
        let data = {"key":"key","value":"eyJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBUb3RhbERlYWxlclJlbWl0VGF4IjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZXBvcnRQZXJpb2RNb250aCI6MSwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25IZWFkZXJfcmVjb25jaWxpYXRpb25IZWFkZXJJZGVudGlmaWVyIjoyMiwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY0xpZmVUb3RhbENvbXBBbXQiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX3N5c0NhbGNPdGhlclRvdGFsQ29tcEFtdCI6MCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZmVlU3VtbWFyeSI6W3siY2xpZW50UmVwTGlmZUFtb3VudCI6MCwiZGlmZmVyZW5jZUxpZmVBbW91bnQiOjAsImNsaWVudFJlcE90aGVyQW1vdW50IjowLCJzeXNDYWxjTGlmZUFtb3VudCI6MCwiZmVlTmFtZSI6IlJlZnVuZEFkbWluRmVlIiwic3lzQ2FsY090aGVyQW1vdW50IjowLCJkaWZmZXJlbmNlT3RoZXJBbW91bnQiOjB9LHsiY2xpZW50UmVwTGlmZUFtb3VudCI6MCwiZGlmZmVyZW5jZUxpZmVBbW91bnQiOjAsImNsaWVudFJlcE90aGVyQW1vdW50IjowLCJzeXNDYWxjTGlmZUFtb3VudCI6MCwiZmVlTmFtZSI6Ik5ldFRvdGFsIiwic3lzQ2FsY090aGVyQW1vdW50IjowLCJkaWZmZXJlbmNlT3RoZXJBbW91bnQiOjB9XSwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfcHJlbWl1bSI6W10sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydENsaWVudE5hbWUiOiJMR00iLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9zeXNDYWxjTGlmZVRvdGFsUHJlbWl1bSI6MCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY090aGVyVG90YWxQcmVtaXVtIjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZXBvcnRMYXN0TW9kaWZpZWREYXRlIjoiMjAyMS0wNi0wMlQwMDowMDowMC4wMDBaIiwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfc3lzQ2FsY1RvdGFsRGVhbGVyTm90UmVtaXRUYXgiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2RpZmZlcmVuY2VUb3RhbERlYWxlclJlbWl0VGF4IjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9zeXNDYWxjVG90YWxEZWFsZXJSZW1pdFRheCI6MCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfY29tbWlzc2lvbiI6W10sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydFBlcmlvZFllYXIiOjIwMjEsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcFRvdGFsRGVhbGVyTm90UmVtaXRUYXgiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uSGVhZGVyX3JlcG9ydENyZWF0ZWRCeSI6IlNvdW15YSBLIE0iLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBPdGhlclRvdGFsUHJlbWl1bSI6MCwiZmluYW5jaWFsUmVjb25jaWxpYXRpb25fcmVjb25jaWxpYXRpb25EZXRhaWxfZGlmZmVyZW5jZUxpZmVUb3RhbENvbXBBbXQiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcE90aGVyVG90YWxDb21wQW10IjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9kaWZmZXJlbmNlT3RoZXJUb3RhbENvbXBBbXQiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2RpZmZlcmVuY2VMaWZlVG90YWxQcmVtaXVtIjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9kaWZmZXJlbmNlT3RoZXJUb3RhbFByZW1pdW0iOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2NsaWVudFJlcExpZmVUb3RhbENvbXBBbXQiOjAsImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX3RheCI6W10sImZpbmFuY2lhbFJlY29uY2lsaWF0aW9uX3JlY29uY2lsaWF0aW9uRGV0YWlsX2RpZmZlcmVuY2VUb3RhbERlYWxlck5vdFJlbWl0VGF4IjowLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9yZWNvbmNpbGlhdGlvblN1bW1hcnkiOlt7ImRpZmZlcmVuY2VSZXBvcnRBbW91bnQiOjAsInN1bW1hcnlUeXBlIjoiUHJlbWl1bSJ9LHsiZGlmZmVyZW5jZVJlcG9ydEFtb3VudCI6MCwic3VtbWFyeVR5cGUiOiJUYXgifSx7ImRpZmZlcmVuY2VSZXBvcnRBbW91bnQiOjAsInN1bW1hcnlUeXBlIjoiQ29tbWlzc2lvbiJ9LHsiZGlmZmVyZW5jZVJlcG9ydEFtb3VudCI6MCwic3VtbWFyeVR5cGUiOiJTdW1tYXJ5TmV0VG90YWwiLCJjbGllbnRSZXBvcnRBbW91bnQiOjAsInN5c3RlbVJlcG9ydEFtb3VudCI6MH1dLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkhlYWRlcl9yZXBvcnRUYXhSZW1pdEJ5Q2xpZW50RmxhZyI6Ik4iLCJmaW5hbmNpYWxSZWNvbmNpbGlhdGlvbl9yZWNvbmNpbGlhdGlvbkRldGFpbF9jbGllbnRSZXBMaWZlVG90YWxQcmVtaXVtIjowfQ\u003d\u003d"}
        let responseData = JSON.parse(Base64.decode(data.value));
        this.setValuesForFields(responseData);
        this.isDisabledFl = false;
      });
  }

  setValuesForFields(data) {
    debugger
    //summary
    if (data['financialReconciliation_reconciliationDetail_feeSummary']) {
      if (data['financialReconciliation_reconciliationDetail_feeSummary'].length > 0) {
        for (let arrayObj of data['financialReconciliation_reconciliationDetail_feeSummary']) {
          arrayObj['feeName'] = arrayObj['feeName'].replace(/([A-Z])/g, ' $1').trim()
        }
      }
    }
    this.summary = data.financialReconciliation_reconciliationDetail_feeSummary;

    //Premimu
    let premiumTemp: Array<any> = [];
    premiumTemp = data.financialReconciliation_reconciliationDetail_premium;
    let tempObj = {};
    for (let i = premiumTemp.length - 1; i < premiumTemp.length; i++) {
      tempObj = {
        "clientRepLifeTotalPremium": data.financialReconciliation_reconciliationDetail_clientRepLifeTotalPremium,
        "clientRepOtherTotalPremium": data.financialReconciliation_reconciliationDetail_clientRepOtherTotalPremium,
        "sysCalcLifeTotalPremium": data.financialReconciliation_reconciliationDetail_sysCalcLifeTotalPremium,
        "sysCalcOtherTotalPremium": data.financialReconciliation_reconciliationDetail_sysCalcOtherTotalPremium,
        "differenceLifeTotalPremium": data.financialReconciliation_reconciliationDetail_differenceLifeTotalPremium,
        "differenceOtherTotalPremium": data.financialReconciliation_reconciliationDetail_differenceOtherTotalPremium
      };
      // premiumTemp[i]["total"] = tempObj;
    }
    this.premium = premiumTemp;
    this.premiumFooterClientRepLifeTotalPremium = data.financialReconciliation_reconciliationDetail_clientRepLifeTotalPremium;
    this.premiumFooterClientRepOtherTotalPremium = data.financialReconciliation_reconciliationDetail_clientRepOtherTotalPremium;
    this.premiumFooterSysCalcLifeTotalPremium = data.financialReconciliation_reconciliationDetail_sysCalcLifeTotalPremium;
    this.premiumFooterSysCalcOtherTotalPremium = data.financialReconciliation_reconciliationDetail_sysCalcOtherTotalPremium;
    this.premiumFooterDifferenceLifeTotalPremium = data.financialReconciliation_reconciliationDetail_differenceLifeTotalPremium;
    this.premiumFooterDifferenceOtherTotalPremium = data.financialReconciliation_reconciliationDetail_differenceOtherTotalPremium;

    //Taxes Grid
    let taxesTemp: Array<any> = [];
    taxesTemp = data.financialReconciliation_reconciliationDetail_tax;
    let tempObj2 = {};
    for (let i = taxesTemp.length - 1; i < taxesTemp.length; i++) {
      tempObj2 = {
        "clientRepTotalDealerRemitTax": data.financialReconciliation_reconciliationDetail_clientRepTotalDealerRemitTax,
        "clientRepTotalDealerNotRemitTax": data.financialReconciliation_reconciliationDetail_clientRepTotalDealerNotRemitTax,
        "sysCalcTotalDealerRemitTax": data.financialReconciliation_reconciliationDetail_sysCalcTotalDealerRemitTax,
        "sysCalcTotalDealerNotRemitTax": data.financialReconciliation_reconciliationDetail_sysCalcTotalDealerNotRemitTax,
        "differenceTotalDealerRemitTax": data.financialReconciliation_reconciliationDetail_differenceTotalDealerRemitTax,
        "differenceTotalDealerNotRemitTax": data.financialReconciliation_reconciliationDetail_differenceTotalDealerNotRemitTax
      };
      // taxesTemp[i]["total"] = tempObj2;
    }
    this.taxes = taxesTemp;
    this.taxesFooterClientRepTotalDealerRemitTax = data.financialReconciliation_reconciliationDetail_clientRepTotalDealerRemitTax;
    this.taxesFooterClientRepTotalDealerNotRemitTax = data.financialReconciliation_reconciliationDetail_clientRepTotalDealerNotRemitTax;
    this.taxesFooterSysCalcTotalDealerRemitTax = data.financialReconciliation_reconciliationDetail_sysCalcTotalDealerRemitTax;
    this.taxesFooterSysCalcTotalDealerNotRemitTax = data.financialReconciliation_reconciliationDetail_sysCalcTotalDealerNotRemitTax;
    this.taxesFooterDifferenceTotalDealerRemitTax = data.financialReconciliation_reconciliationDetail_differenceTotalDealerRemitTax;
    this.taxesFooterDifferenceTotalDealerNotRemitTax = data.financialReconciliation_reconciliationDetail_differenceTotalDealerNotRemitTax;

    //Commission
    let commissionTemp: Array<any> = [];
    commissionTemp = data.financialReconciliation_reconciliationDetail_commission;
    let tempObj3 = {};
    for (let i = commissionTemp.length - 1; i < commissionTemp.length; i++) {
      tempObj3 = {
        "clientRepLifeTotalCompAmt": data.financialReconciliation_reconciliationDetail_clientRepLifeTotalCompAmt,
        "clientRepOtherTotalCompAmt": data.financialReconciliation_reconciliationDetail_clientRepOtherTotalCompAmt,
        "sysCalcLifeTotalCompAmt": data.financialReconciliation_reconciliationDetail_sysCalcLifeTotalCompAmt,
        "sysCalcOtherTotalCompAmt": data.financialReconciliation_reconciliationDetail_sysCalcOtherTotalCompAmt,
        "differenceLifeTotalCompAmt": data.financialReconciliation_reconciliationDetail_differenceLifeTotalCompAmt,
        "differenceOtherTotalCompAmt": data.financialReconciliation_reconciliationDetail_differenceOtherTotalCompAmt
      };
      // commissionTemp[i]["total"] = tempObj3;
    }
    this.commission = commissionTemp;
    this.commissionFooterClientRepLifeTotalCompAmt = data.financialReconciliation_reconciliationDetail_clientRepLifeTotalCompAmt;
    this.commissionFooterClientRepOtherTotalCompAmt = data.financialReconciliation_reconciliationDetail_clientRepOtherTotalCompAmt;
    this.commissionFooterSysCalcLifeTotalCompAmt = data.financialReconciliation_reconciliationDetail_sysCalcLifeTotalCompAmt;
    this.commissionFooterSysCalcOtherTotalCompAmt = data.financialReconciliation_reconciliationDetail_sysCalcOtherTotalCompAmt;
    this.commissionFooterDifferenceLifeTotalCompAmt = data.financialReconciliation_reconciliationDetail_differenceLifeTotalCompAmt;
    this.commissionFooterDifferenceOtherTotalCompAmt = data.financialReconciliation_reconciliationDetail_differenceOtherTotalCompAmt;

    //Recon summary
    this.reconciliationSummary = data.financialReconciliation_reconciliationDetail_reconciliationSummary;
    if (data.financialReconciliation_reconciliationHeader_reportTaxRemitByClientFlag == "Y") {
      this.reportTaxRemitByClientFlag = true;
    } else {
      this.reportTaxRemitByClientFlag = false;
    }
    // seting the field in the tab
    this.reportClientNameDisp = data.financialReconciliation_reconciliationHeader_reportClientName;
    this.reportPeriodMonth = data.financialReconciliation_reconciliationHeader_reportPeriodMonth;
    this.reportPeriodYear = data.financialReconciliation_reconciliationHeader_reportPeriodYear;
    this.selectedReconciliationHeaderIdentifier = data.financialReconciliation_reconciliationHeader_reconciliationHeaderIdentifier;
    this.selectedReportCreatedBy = data.financialReconciliation_reconciliationHeader_reportCreatedBy;

    this.updateRowGroupMetaData(data)
  }

  // Grid 1 - Reconciliation Entry - Premium 
  onPremiumRowEditInit(premiumRowData: PremiumInterface) {
    debugger;
    this.clonedPremium[premiumRowData.premiumProvince] = { ...premiumRowData };
  }

  onPremiumRowEditSave(premiumRowData) {
    debugger;
    delete this.clonedPremium[premiumRowData.premiumProvince];
  }

  onPremiumRowEditCancel(premiumRowData, index: number) {
    debugger;
    this.premium[index] = this.clonedPremium[premiumRowData.premiumProvince];
    delete this.clonedPremium[premiumRowData.premiumProvince];
  }

  onPremiumNewRow() {
    return {
      premiumProvince: '',
      differenceOtherPremium: '',
      differenceLifePremium: '',
      sysCalcLifePremium: '',
      sysCalcOtherPremium: '',
      clientReportLifePremium: '',
      clientReportOtherPremium: ''
    };
  }

  //Grid 2 - Reconciliation Entry - Taxes
  onTaxesRowEditInit(taxesRowData) {
    this.clonedTaxes[taxesRowData.premiumProvince] = { ...taxesRowData };
  }

  onTaxesRowEditSave(taxesRowData) {
    delete this.clonedTaxes[taxesRowData.premiumProvince];
  }

  onTaxesRowEditCancel(taxesRowData, index: number) {
    this.premium[index] = this.clonedTaxes[taxesRowData.premiumProvince];
    delete this.clonedTaxes[taxesRowData.premiumProvince];
  }

  onTaxesNewRow() {
    return {
      taxProvince: '',
      clientReportDealerRemitTax: '',
      clientReportDealerNotRemitTax: '',
      sysCalcDealerRemitTax: '',
      sysCalcDealerNotRemitTax: '',
      differenceDealerRemitTax: '',
      differenceDealerNotRemitTax: ''
    };
  }

  // Grid 3 - Reconciliation Entry - Commission 
  onCommissionRowEditInit(commissionRowData) {
    this.clonedCommission[commissionRowData.commissionProvince] = { ...commissionRowData };
  }

  onCommissionRowEditSave(commissionRowData) {
    delete this.clonedCommission[commissionRowData.commissionProvince];
  }

  onCommissionRowEditCancel(commissionRowData, index: number) {
    this.commission[index] = this.clonedCommission[commissionRowData.commissionProvince];
    delete this.clonedCommission[commissionRowData.commissionProvince];
  }

  onCommissionNewRow() {
    return {
      commissionProvince: '',
      clientReportLifeCompAmt: '',
      clientReportOtherCompAmt: '',
      sysCalcLifeCompensationAmount: '',
      sysCalcOtherCompensationAmount: '',
      differenceLifeCompAmt: '',
      differenceOtherCompAmt: ''
    };
  }


  onChangeOfReportClientName(event) {
    this.reportClientName = event.target.value;
  }

  onClickOfAddReconcilation() {
    this.selectedTab = 1;
    this.isDisabledFl = false;
    this.onClickOfClear();
  }

  onClickOfMonth(event) {
    debugger
    this.selectedMonth = event._i.month + 1;
  }

  onClickOfYear(event) {
    debugger
    this.selectedYear = event._i.year;
  }

  onChangeOfPremiumProvince(event, rowIndex) {
    debugger;
    let gridVal = this.premium;
    for (let m = 0; m < gridVal.length; m++) {
      if (m != rowIndex) {
        if (gridVal[m]["premiumProvince"] == event.value) {
          this.mdMondServiceDS.showErrorMessage(event.originalEvent.target.innerText + " has already selected please select other provience");
          this.premium[rowIndex].premiumProvince = "";
        }
      }
    }
  }

  getMonthNumberBasedOnMonthName(name) {
    if (name == "") {
      return "";
    }
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(name) + 1;
  }

  getMonthNameBasedOnNumber(number) {
    debugger;
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return months[number - 1];
  }

  onClickOfReconcilationSearch() {
    debugger;
    if (this.reportClientName == undefined) {
      this.reportClientName = "";
    }

    if (this.selectedMonth == undefined) {
      this.selectedMonth = "";
    } else {
      this.selectedMonth = JSON.stringify(this.selectedMonth);
    }

    if (this.selectedYear == undefined) {
      this.selectedYear = "";
    } else {
      this.selectedYear = JSON.stringify(this.selectedYear);
    }

    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchReconciliationHeaderList", JSON.stringify({ "reportClientName": this.reportClientName, "reportPeriodMonth": this.selectedMonth, "reportPeriodYear": this.selectedYear }), null).subscribe(
      data => {
        let reconHeaderSummary = JSON.parse(Base64.decode(data.value)).reconciliationHeaderList_ReconciliationHeaderSummary;
        if (reconHeaderSummary) {
          if (reconHeaderSummary.length <= 0) {
            this.mdMondServiceDS.showErrorMessage("No records found for the search criteria");
          } else {
            for (let data of reconHeaderSummary) {
              data['reportPeriodMonth'] = this.getMonthNameBasedOnNumber(data['reportPeriodMonth']);
            }
            this.reconciliationHeaderSummary = reconHeaderSummary;
          }
        } else {
          this.mdMondServiceDS.showErrorMessage("No records found for the search criteria");
        }
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        // let reconHeaderSummary = [
        //   {
        //     "reportCreatedBy": "Keerthi Shree",
        //     "reportPeriodYear": 2020,
        //     "reportClientName": "LGM",
        //     "reconciliationHeaderIdentifier": 20,
        //     "reportPeriodMonth": "9"
        //   }
        // ]
        let data = { "key": "key", "value": "eyJyZWNvbmNpbGlhdGlvbkhlYWRlckxpc3RfUmVjb25jaWxpYXRpb25IZWFkZXJTdW1tYXJ5IjpbeyJyZXBvcnRDcmVhdGVkQnkiOiJTb3VteWEgSyBNIiwicmVwb3J0UGVyaW9kWWVhciI6MjAxNSwicmVwb3J0Q2xpZW50TmFtZSI6IkxBSVMiLCJyZWNvbmNpbGlhdGlvbkhlYWRlcklkZW50aWZpZXIiOjIxLCJyZXBvcnRQZXJpb2RNb250aCI6NX0seyJyZXBvcnRDcmVhdGVkQnkiOiJTb3VteWEgSyBNIiwicmVwb3J0UGVyaW9kWWVhciI6MjAyMSwicmVwb3J0Q2xpZW50TmFtZSI6IkxHTSIsInJlY29uY2lsaWF0aW9uSGVhZGVySWRlbnRpZmllciI6MjIsInJlcG9ydFBlcmlvZE1vbnRoIjoxfV19" }
        let reconHeaderSummary = JSON.parse(Base64.decode(data.value)).reconciliationHeaderList_ReconciliationHeaderSummary;
        if (reconHeaderSummary) {
          if (reconHeaderSummary.length <= 0) {
            this.mdMondServiceDS.showErrorMessage("No records found for the search criteria");
          } else {
            for (let data of reconHeaderSummary) {
              data['reportPeriodMonth'] = this.getMonthNameBasedOnNumber(data['reportPeriodMonth']);
            }
            this.reconciliationHeaderSummary = reconHeaderSummary;
          }
        } else {
          this.mdMondServiceDS.showErrorMessage("No records found for the search criteria");
        }
      });
  }

  updateRowGroupMetaData(data) {
    debugger;
    //Premium Grid
    this.rowGroupPremiumGridMetadata = {};
    if (this.premium) {
      this.rowGroupPremiumGridMetadata["Total"] = { index: this.premium.length - 1, size: this.premium.length };
    }

    //Taxes Grid
    this.rowGroupTaxesGridMetadata = {};
    if (this.taxes) {
      this.rowGroupTaxesGridMetadata["Total"] = { index: this.taxes.length - 1, size: this.taxes.length };
    }

    //Commission Grid
    this.rowGroupCommissionGridMetadata = {};
    if (this.commission) {
      this.rowGroupCommissionGridMetadata["Total"] = { index: this.commission.length - 1, size: this.commission.length };
    }
  }

  resetReconciliation() {
    debugger;
    this.reportClientName = "";
    this.reportPeriodMonthSearch = "";
    this.reportPeriodYearSearch = "";
  }

  onClickOfClear() {
    debugger;
    this.premium = [];
    this.taxes = [];
    this.commission = [];
    this.summary = [{ "feeName": "Refund Admin Fee" }, { "feeName": "Net Total" }];
    this.reconciliationSummary = [];

    this.reportClientNameDisp = "";
    this.reportTaxRemitByClientFlag = false;
    this.taxesFooterClientRepTotalDealerRemitTax = "";
    this.taxesFooterClientRepTotalDealerNotRemitTax = "";
    this.taxesFooterSysCalcTotalDealerRemitTax = "";
    this.taxesFooterSysCalcTotalDealerNotRemitTax = "";
    this.taxesFooterDifferenceTotalDealerRemitTax = "";
    this.taxesFooterDifferenceTotalDealerNotRemitTax = "";
    this.commissionFooterClientRepLifeTotalCompAmt = "";
    this.commissionFooterClientRepOtherTotalCompAmt = "";
    this.commissionFooterSysCalcLifeTotalCompAmt = "";
    this.commissionFooterSysCalcOtherTotalCompAmt = "";
    this.commissionFooterDifferenceLifeTotalCompAmt = "";
    this.commissionFooterDifferenceOtherTotalCompAmt = "";
    this.premiumFooterClientRepLifeTotalPremium = "";
    this.premiumFooterClientRepOtherTotalPremium = "";
    this.premiumFooterSysCalcLifeTotalPremium = "";
    this.premiumFooterSysCalcOtherTotalPremium = "";
    this.premiumFooterDifferenceLifeTotalPremium = "";
    this.premiumFooterDifferenceOtherTotalPremium = "";
    this.reportPeriodMonth = "";
    this.reportPeriodYear = "";

  }

  checkIfReconciliationReportExists() {
    if (!this.reportPeriodMonth) {
      return;
    }

    if (!this.reportClientNameDisp) {
      return;
    }

    let dataToSend = {
      "reportClientName": this.reportClientNameDisp,
      "reportPeriodMonth": this.reportPeriodMonth,
      "reportPeriodYear": this.reportPeriodYear
    }

    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "CheckIfReconciliationReportExists", JSON.stringify(dataToSend), this.csfrToken).subscribe(
      data => {
        let dataFromServer = JSON.parse(Base64.decode(data.value));
        if (dataFromServer.reportWarningMessage) {
          this.mdMondServiceDS.showErrorMessage(dataFromServer.reportWarningMessage);
        }
      },
      error => {
        this.mdMondServiceDS.MDError(error);
      });
  }

  onClickOfSubmitReconcilation(serviceName) {
    if (!this.reportPeriodMonth) {
      this.mdMondServiceDS.showErrorMessage("Please enter Report Period");
      return;
    }

    if (!this.reportClientNameDisp) {
      this.mdMondServiceDS.showErrorMessage("Please enter Client Name");
      return;
    }

    let dataForSubmission = this.fetchDataForSubmit();

    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", serviceName, JSON.stringify(dataForSubmission), this.csfrToken).subscribe(
      data => {
        if (serviceName == "SaveReconciliationReportDetail") {
          if (data.status == "Failed") {
            this.mdMondServiceDS.showErrorMessage(JSON.parse(Base64.decode(data.value)).message);
          } else {
            this.mdMondServiceDS.showSuccessMessage(JSON.parse(Base64.decode(data.value)).message);
          }
          return;
        } else {
          if (serviceName == "FetchSystemCalculatedValues") {
            this.mdMondServiceDS.showSuccessMessage("Successfully calculated system values");
          } else {
            this.mdMondServiceDS.showSuccessMessage("Refreshed Totals");
          }
        }

      },
      error => {
        this.mdMondServiceDS.MDError(error);
      });
  }

  fetchDataForSubmit() {
    debugger;
    let finalPremiumData = this.premium;
    let premiumSysCalcLifeTotal;
    let premiumSysCalcOtherTotal;

    let finalTaxesData = this.taxes;
    let taxesSysCalcTotalDealerRemitTax;
    let taxesSysCalcTotalDealerNotRemitTax;

    let finalCommissionData = this.commission;
    let commissionSysCalcLifeTotalCompAmt;
    let commissionSysCalcOtherTotalCompAmt;

    for (let i = finalPremiumData.length - 1; i < finalPremiumData.length; i++) {
      if (finalPremiumData[i].total) {
        premiumSysCalcLifeTotal = finalPremiumData[i].total.sysCalcLifeTotalPremium;
        premiumSysCalcOtherTotal = finalPremiumData[i].total.sysCalcOtherTotalPremium;
        delete finalPremiumData[i]['total']
      }
    }

    for (let j = finalTaxesData.length - 1; j < finalTaxesData.length; j++) {
      if (finalTaxesData[j].total) {
        taxesSysCalcTotalDealerRemitTax = finalTaxesData[j].total.sysCalcTotalDealerRemitTax;
        taxesSysCalcTotalDealerNotRemitTax = finalTaxesData[j].total.sysCalcTotalDealerNotRemitTax;
        delete finalTaxesData[j]['total']
      }
    }

    for (let k = finalCommissionData.length - 1; k < finalCommissionData.length; k++) {
      if(finalCommissionData[k].total != undefined){
        if (finalCommissionData[k].total) {
          commissionSysCalcLifeTotalCompAmt = finalCommissionData[k].total.sysCalcLifeTotalCompAmt;
          commissionSysCalcOtherTotalCompAmt = finalCommissionData[k].total.sysCalcOtherTotalCompAmt;
          delete finalCommissionData[k]['total']
        }
      }    
    }

    if (this.reportTaxRemitByClientFlag == true) {
      this.reportTaxRemitByClientFlagToJSON = "Y";
    } else {
      this.reportTaxRemitByClientFlagToJSON = "N";
    }

    let updatedSummary = this.summary;
    if (updatedSummary) {
      if (updatedSummary.length > 0) {
        for (let arrayObj of updatedSummary) {
          arrayObj['feeName'] = arrayObj['feeName'].replace(/\s/g, '');
        }
      }
    }
    let reconciliationGridAndFieldsData = {
      "financialReconciliation_reconciliationDetail_sysCalcLifeTotalPremium": premiumSysCalcLifeTotal,
      "financialReconciliation_reconciliationDetail_sysCalcOtherTotalPremium": premiumSysCalcOtherTotal,
      "financialReconciliation_reconciliationDetail_sysCalcTotalDealerRemitTax": taxesSysCalcTotalDealerRemitTax,
      "financialReconciliation_reconciliationDetail_sysCalcTotalDealerNotRemitTax": taxesSysCalcTotalDealerNotRemitTax,
      "financialReconciliation_reconciliationDetail_sysCalcLifeTotalCompAmt": commissionSysCalcLifeTotalCompAmt,
      "financialReconciliation_reconciliationDetail_sysCalcOtherTotalCompAmt": commissionSysCalcOtherTotalCompAmt,
      "financialReconciliation_reconciliationHeader_reconciliationHeaderIdentifier": this.selectedReconciliationHeaderIdentifier,
      "financialReconciliation_reconciliationHeader_reportClientName": this.reportClientNameDisp,
      "financialReconciliation_reconciliationHeader_reportPeriodMonth": this.reportPeriodMonth,
      "financialReconciliation_reconciliationHeader_reportPeriodYear": this.reportPeriodYear,
      "financialReconciliation_reconciliationHeader_reportCreatedBy": this.selectedReportCreatedBy,
      "financialReconciliation_reconciliationHeader_reportTaxRemitByClientFlag": this.reportTaxRemitByClientFlagToJSON,
      "financialReconciliation_reconciliationDetail_premium": finalPremiumData,
      "financialReconciliation_reconciliationDetail_tax": finalTaxesData,
      "financialReconciliation_reconciliationDetail_commission": finalCommissionData,
      "financialReconciliation_reconciliationDetail_feeSummary": updatedSummary
    }
    return reconciliationGridAndFieldsData;
  }

  onRowUnselectOfReconciliation(event) {
    debugger;

  }

  createFinancialReconciliationReport(serviceName) {
    if (!this.reportPeriodMonth) {
      this.mdMondServiceDS.showErrorMessage("Please enter Report Period");
      return;
    }

    if (!this.reportClientNameDisp) {
      this.mdMondServiceDS.showErrorMessage("Please enter Client Name");
      return;
    }

    if (!this.selectedReconciliationHeaderIdentifier) {
      this.mdMondServiceDS.showErrorMessage("Reconciliation Header Identifier is not available");
      return;
    }
    debugger;
    let currentDate = new Date();
    let currentMonth: any = currentDate.getMonth() + 1;
    if (currentMonth.toString().length < 2) {
      currentMonth = "0" + currentMonth;
    }

    let currentDay: any = currentDate.getDate();
    if (currentDay.toString().length < 2) {
      currentDay = "0" + currentDay;
    }

    let documentTitle = "MOND-FR_Discrepancy_Report-" + currentDate.getFullYear() + currentMonth + currentDate.getDate() + ".xls";
    let params = {
      "projectName": "Reports",
      "serviceName": serviceName,
      "context": "Download",
      "version": "1.00",
      "downloadAsFile": "true",
      "returnByteArrayVariableName": "$fileContent",
      "returnByteArrayFileName": "$fileName",
      "reconciliationHeaderId": this.selectedReconciliationHeaderIdentifier,
      "reportClientName": this.reportClientNameDisp,
      "reportPeriodMonth": this.reportPeriodMonth,
      "reportPeriodYear": this.reportPeriodYear,
      "csfrToken": this.csfrToken,
      "documentTitle": documentTitle
    }
    this.mdExecuteServiceDS.invokePFDServiceWithDownload(params).subscribe(
      blob => {
        saveAs(blob, documentTitle, {
          type: 'text/plain;charset=windows-1252' // --> or whatever you need here
        });
      },
      error => {
        console.log("error onClickOfFileDownload" + JSON.stringify(error));
      })
  }
}


