import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDCommonGetterSetter } from '../../../_services/common';
import { MDMondServiceDS } from '../../../_services/ds/MDMondServiceDS';
import { MDConnectedPartnersDS } from '../../../_services/ds/MDConnectedPartnersDS';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../_services/constants/MDDateFormate';
import { MDCountdownTimer } from '../../../_services/utils';

@Component({
  selector: 'app-netpremiumreport-designer',
  templateUrl: './netpremiumreport.component.html',
  styleUrls: ['./netpremiumreport.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class NetpremiumreportComponent implements OnInit {
  // date = new FormControl(moment());

  public fromDateDatePicker: Date;
  public toDateDatePicker: Date;
  public csfrToken: string;
  public clientNameVal: any;
  public clientName: string;
  public selectedNetPremiumFromDate: string;
  public selectedNetPremiumTillDate: string;
  public downloadData: any;
  public fileUrl: any;
  public isFromDateSubmit: boolean = false;
  public isToDateSubmit: boolean = false;
  public isClientNameSubmit: boolean = false;
  public selectedClientName: string;
  public clearSelectedTillDate: any;


  @ViewChild('fromDate') fromDate: ElementRef;
  @ViewChild('tillDate') tillDate: ElementRef;



  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private mdConnectedPartnersDS: MDConnectedPartnersDS,
    private http: HttpClient,
    private counterTimerService: MDCountdownTimer) { }


  ngOnInit() {
    // debugger;
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });
  }

  netPremiumKeyup(event) {
    // debugger;
    this.selectedClientName = undefined;
    this.mdConnectedPartnersDS.getListOfPartnerCompaniesTypeAhead(event.target.value).subscribe(
      data => {
        this.clientNameVal = data;
      }, error => {
        this.mdMondServiceDS.MDError(error);
        // this.clientNameVal = [{ "companyId": 6883, "inheritFromCompanyId": -1, "companyIdentifier": "24002", "companyName": "Crelogix", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 156, "createDate": "Oct 13, 2017 5:43:01 AM", "updateDate": "Oct 14, 2017 1:23:27 PM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 7102, "inheritFromCompanyId": -1, "companyIdentifier": "24003", "companyName": "LAIS", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Apr 12, 2019 5:13:34 AM", "updateDate": "Apr 12, 2019 5:13:34 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 6882, "inheritFromCompanyId": -1, "companyIdentifier": "24001", "companyName": "LGM", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Oct 13, 2017 5:42:37 AM", "updateDate": "Oct 23, 2017 5:10:03 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }]
      }
    )
  }

  OnNetPremiumFromDateChange(event) {
    // debugger
    this.selectedNetPremiumFromDate = this.fromDate.nativeElement.value;
    this.isFromDateSubmit = false;
  }

  OnNetPremiumTillDateChange(event) {
    debugger;
    this.selectedNetPremiumTillDate = this.tillDate.nativeElement.value;
    this.isToDateSubmit = false;
  }

  onSelectClientName(event) {
    debugger;
    this.selectedClientName = event.source.value;
    this.isClientNameSubmit = false;
  }

  onClickOfNetPremiumDownload() {
    debugger;
    if (this.fromDate.nativeElement.value == "") {
      this.isFromDateSubmit = true;
      this.mdMondServiceDS.showErrorMessage("Please enter the From Date.");
      return;
    } else {
      this.isFromDateSubmit = false;
    }

    if (this.tillDate.nativeElement.value == "") {
      this.isToDateSubmit = true;
      this.mdMondServiceDS.showErrorMessage("Please enter the To Date.");
      return;
    } else {
      this.isToDateSubmit = false;
    }

    if (this.selectedClientName == undefined) {
      this.isClientNameSubmit = true;
      this.mdMondServiceDS.showErrorMessage("Please select the Client Name.");
      return;
    } else {
      this.isClientNameSubmit = false;
    }
    let projectName = 'Reports';
    let serviceName = 'CreateNetPremiumReport';
    let version = '1.00';
    let fromDate = this.selectedNetPremiumFromDate + "T00:00:00.000Z";
    let toDate = this.selectedNetPremiumTillDate + "T00:00:00.000Z";
    let partnerName = this.clientName;
    let context = 'Download';
    let downloadAsFile = 'true';
    let returnByteArrayVariableName = '$fileContent';
    let returnByteArrayFileName = '$fileName';
    let csfrToken = this.csfrToken
    this.invokeMondService(projectName, serviceName, version, fromDate, toDate, partnerName, context, downloadAsFile, returnByteArrayVariableName, returnByteArrayFileName, csfrToken);
  }



  invokeMondService(projectName: string, serviceName: string, version: string, fromDate: string, toDate: string, partnerName: any, context: string, downloadAsFile: string, returnByteArrayVariableName: string, returnByteArrayFileName: string, csfrToken: string) {
    let dataToSend = 'projectName=' + projectName + '&serviceName=' + serviceName + '&version=' + version + '&fromDate=' + fromDate +
      '&toDate=' + toDate + '&partnerName=' + partnerName + '&context=' +
      context + '&downloadAsFile=' + downloadAsFile + '&returnByteArrayVariableName=' + returnByteArrayVariableName + '&returnByteArrayFileName=' + returnByteArrayFileName + '&csfrToken=' + csfrToken + '&addSessionInfoFlag=' + true;;
    this.http.post("/mondrestws/services/executeService/invokePFDServiceWithDownload", dataToSend, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, responseType: 'blob', observe: 'response' }).subscribe(
      data => {
        let d = new Date().getTime();
        this.counterTimerService.setValidationSession(d);
        this.counterTimerService.isTimerReset = true;
        console.log("data", data);
        var contentDisposition = data.headers.get('content-disposition');
        console.log("contentDisposition", contentDisposition);
        var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        console.log("filename", filename);
        console.log("Success data onClickOfFileDownload" + JSON.stringify(data));
        console.log("Success data onClickOfFileDownload2" + data);
        this.downloadData = data.body;
        console.log(" data.body", data.body)
        console.dir("data.body", data.body);
        console.log("data.body, JSONParse", JSON.parse(JSON.stringify(data.body)));
        const blob = new Blob([this.downloadData], { type: 'application/xls' });
        console.log("downloadData" + JSON.stringify(this.downloadData));
        this.fileUrl = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = this.fileUrl; //data is object received as response
        link.download = JSON.parse(filename);
        console.log("link.download", link.download);
        console.log("link", link)
        link.click();
        console.log("after click on link,link.download", link.download);
      }, error => {
        debugger;
        console.log("error", error);
        this.mdMondServiceDS.MDError(error);
        // var contentDisposition = "Jattachment; filename=TransactionReconcile_FG-08-Sep-2020.xlsx"
        // var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        // var filename="Noname.zip"
      });
  }

  onClickOfReset() {
    debugger;
    this.fromDate.nativeElement.value = "";
    this.tillDate.nativeElement.value = "";
    this.clientName = "";
    this.fromDateDatePicker = null;
    this.toDateDatePicker = null;
    this.selectedClientName = undefined;

  }

}