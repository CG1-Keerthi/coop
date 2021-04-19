import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDCommonGetterSetter } from '../../_services/common';
import { MDMondServiceDS } from '../../_services/ds/MDMondServiceDS';
import { MDConnectedPartnersDS } from '../../_services/ds/MDConnectedPartnersDS'
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-designer',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})

export class ReportsComponent implements OnInit {

  public selectedFromDate: string;
  public selectedTillDate: string;
  public csfrToken: string;
  public formVariables: any;
  public clientName: string;
  public customerClientName: string;
  public customerSelectedFromDate: string;
  public customerSelectedTillDate: string;
  public clientNameVal: any;
  public customerClientNameVal: any;

  @ViewChild('fromDate') fromDate: ElementRef;
  @ViewChild('tillDate') tillDate: ElementRef;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('customerFromDate') customerFromDate: ElementRef;
  @ViewChild('customerTillDate') customerTillDate: ElementRef;
  @ViewChild('customerFilter') customerFilter: ElementRef;

  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private mdConnectedPartnersDS: MDConnectedPartnersDS,
    private router: Router) { }


  ngOnInit() {
    // debugger;
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });
  }

  acturialKeyup(event) {
    // debugger;
    this.mdConnectedPartnersDS.getListOfPartnerCompaniesTypeAhead(event.target.value).subscribe(
      data => {
        this.clientNameVal = data;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // this.clientNameVal = [{ "companyId": 6883, "inheritFromCompanyId": -1, "companyIdentifier": "24002", "companyName": "Crelogix", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 156, "createDate": "Oct 13, 2017 5:43:01 AM", "updateDate": "Oct 14, 2017 1:23:27 PM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 7102, "inheritFromCompanyId": -1, "companyIdentifier": "24003", "companyName": "LAIS", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Apr 12, 2019 5:13:34 AM", "updateDate": "Apr 12, 2019 5:13:34 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 6882, "inheritFromCompanyId": -1, "companyIdentifier": "24001", "companyName": "LGM", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Oct 13, 2017 5:42:37 AM", "updateDate": "Oct 23, 2017 5:10:03 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }]
      }
    )
  }


  OnFromDateChange(event) {
    // debugger;
    this.selectedFromDate = this.fromDate.nativeElement.value;
  }

  OnTillDateChange(event) {
    // debugger;
    this.selectedTillDate = this.tillDate.nativeElement.value;
  }

  onClickOfAddFilters() {
    // debugger
    this.filter.nativeElement.style.display = 'block';
  }

  onClickOfActuarialPlay() {

    this.formVariables = {
      startDate: this.selectedFromDate,
      endDate: this.selectedTillDate,
      clientName: this.clientName
    }

    this.mdMondServiceDS.getFormDataFromMondService('Reports', 'Invoke-CertificateRegistar', JSON.stringify(this.formVariables), this.csfrToken).subscribe(
      data => {
        console.log("data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data.value)).message)
      }, error => {
        console.log(error);
        this.mdMondServiceDS.MDError(error);
      })
  }


  // Customer Report functionalities
  customerKeyup(event) {
    // debugger
    this.mdConnectedPartnersDS.getListOfPartnerCompaniesTypeAhead(event.target.value).subscribe(
      data => {
        this.customerClientNameVal = data;
      }, error => {
        this.mdMondServiceDS.MDError(error);
      }
    )
  }

  OnCustomerFromDateChange(event) {
    // debugger;
    this.customerSelectedFromDate = this.customerFromDate.nativeElement.value;
  }

  OnCustomerTillDateChange(event) {
    // debugger;
    this.customerSelectedTillDate = this.customerTillDate.nativeElement.value;
  }

  onClickOfCustomerAddFilters() {
    this.customerFilter.nativeElement.style.display = 'block';
  }

  onClickOfCustomerPlay() {
    this.formVariables = {
      startDate: this.customerSelectedFromDate,
      endDate: this.customerSelectedTillDate,
      clientName: this.customerClientName
    }

    this.mdMondServiceDS.getFormDataFromMondService('Reports', 'Invoke-ClaimsCustomerExp', JSON.stringify(this.formVariables), this.csfrToken).subscribe(
      data => {
        console.log("data", data);
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data.value)).message)
      }, error => {
        console.log(error);
        this.mdMondServiceDS.MDError(error);
      })
  }

  onClickOfNetPremiumPlay(){
    debugger;
    this.router.navigateByUrl(('/home/netpremiumreportComponent'), { skipLocationChange: true });
  }

  onClickOfLogicalDeletePlay(){
    debugger;
    this.router.navigateByUrl(('/home/logicalDeleteReportComponent'), { skipLocationChange: true });
  }
}