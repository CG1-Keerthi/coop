import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDConnectedPartnersDS } from '../../_services/ds/MDConnectedPartnersDS';
import { HttpClient } from '@angular/common/http';
import { MDCodeListHeaderDS, MDMondServiceDS } from '../../_services/ds';
import { MDCommonGetterSetter } from '../../_services/common';

@Component({
  selector: 'app-clientmaintenance-designer',
  templateUrl: './clientmaintenance.component.html',
  styleUrls: ['./clientmaintenance.component.css'],

})

export class ClientMaintenanceComponent implements OnInit {
  public clientNameVal: any;
  public clientName: string;
  public clientStatus: any;
  public clientStatusVal: string = "";
  public clientNumber: string = "";
  public clientMaintenanceListData: any = [{}];
  selectedTab: number = 0;
  planDetailsData: any = {}
  public csfrToken: any;
  constructor(private http: HttpClient,
    private mdCommonGetterAndSetter: MDCommonGetterSetter,
    private mdConnectedPartnersDS: MDConnectedPartnersDS,
    private mdMondServiceDS: MDMondServiceDS,
    private mdCodeListHeaderDS: MDCodeListHeaderDS
  ) { }


  ngOnInit() {
    // debugger;
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });

    this.mdCodeListHeaderDS.getListOfCodeLists('Coop-ClientStatus').subscribe(
      data => {
        this.clientStatus = data;
      }, error => {
        console.log(error);
        // let data = [{ "codeListValuesId": 145716, "codeListHeaderId": 1578, "code": "1", "description": "Active" }, { "codeListValuesId": 145717, "codeListHeaderId": 1578, "code": "2", "description": "Terminated" }];
        // this.clientStatus = data;
      }
    )
  }

  clientNameKeyup(event) {
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

  onClientListRowSelect(event) {
    debugger;
    this.selectedTab = 1;

    this.mdMondServiceDS.invokeMondServiceGET("Creditor Self Admin", "FetchClientDetails", "1.00", btoa(JSON.stringify({ "clientId": event.data.clientIdentifier })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.planDetailsData = JSON.parse(atob(data))
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        // // let data ={"key":"key","value":"eyJjbGllbnRJbmZvX2NsaWVudExhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJjbGllbnRJbmZvX2NsaWVudE5hbWUiOiJMR00iLCJjbGllbnRJbmZvX2NsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudEluZm9fY2xpZW50VGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwMDowMDowMC4wMDBaIiwiY2xpZW50SW5mb19jbGllbnRQcm92aW5jZUNvZGUiOiJCQyIsImNsaWVudEluZm9fY2xpZW50TnVtYmVyIjoiODUyNzU3NzkiLCJjbGllbnRJbmZvX2NsaWVudFN0YXR1c0VuZERhdGUiOiI5OTk5LTEyLTMxVDAwOjAwOjAwLjAwMFoiLCJjbGllbnRJbmZvX2dyb3VwUG9saWN5SG9sZGVyIjoiWSIsImNsaWVudEluZm9fY2xpZW50RmF4TnVtYmVyIjoiODAwNTEwNzYwNSIsImNsaWVudEluZm9fY2xpZW50UGhvbmUxIjoiODAwNTEwODM3MiIsImNsaWVudEluZm9fY2xpZW50UHJvZml0U2hhcmluZ0ZsYWciOiJOIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0luZm8iOlt7ImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRBZGRyZXNzSWRlbnRpZmllciI6MSwiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDE4LTA3LTExVDEzOjAwOjQwLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiVjZFIDBDMyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUeXBlIjoiQmlsbGluZyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAxMi0wOC0xNFQwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJCQyIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6Ijg1Mjc1Nzc5IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MSwiY2xpZW50QWRkcmVzc0luZm9fY2l0eSI6IlZhbmNvdXZlciIsImNsaWVudEFkZHJlc3NJbmZvX2NvdW50cnkiOiJDYW5hZGEiLCJjbGllbnRBZGRyZXNzSW5mb19jdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTEiOiJTdWl0ZSA0MDAsIDEwMjEgV2VzdCBIYXN0aW5ncyBTdHJlZXQifV0sImNsaWVudEluZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDE4LTA3LTEyVDE0OjI3OjExLjAwMFoiLCJjbGllbnRJbmZvX2NsaWVudElkZW50aWZpZXIiOjEsImNsaWVudEluZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50SW5mb19jbGllbnRFZmZlY3RpdmVEYXRlIjoiMjAxMi0wMS0wMVQwMDowMDowMC4wMDBaIn0\u003d"}
        // // let data = {"key":"key","value":"eyJjbGllbnRJbmZvX2NsaWVudExhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJjbGllbnRJbmZvX2NsaWVudE5hbWUiOiJURVNUIiwiY2xpZW50SW5mb19jbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnRJbmZvX2NsaWVudFRlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEluZm9fY2xpZW50UHJvdmluY2VDb2RlIjoiQUIiLCJjbGllbnRJbmZvX2NsaWVudE51bWJlciI6IjEyMzQiLCJjbGllbnRJbmZvX2NsaWVudFN0YXR1c0VuZERhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRJbmZvX2dyb3VwUG9saWN5SG9sZGVyIjoiTiIsImNsaWVudEluZm9fY2xpZW50UHJvZml0U2hhcmluZ0ZsYWciOiJOIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0luZm8iOlt7ImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRBZGRyZXNzSWRlbnRpZmllciI6MjIsImNsaWVudEFkZHJlc3NJbmZvX2xhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNC0yMVQwNToyNjozNC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcG9zdGFsQ29kZSI6IjEyMzQ1NiIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUeXBlIjoiTWFpbGluZyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0yMVQwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJBSyIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6IjEyMzQiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRJZGVudGlmaWVyIjoxMSwiY2xpZW50QWRkcmVzc0luZm9fY2l0eSI6IkNpdHkiLCJjbGllbnRBZGRyZXNzSW5mb19jb3VudHJ5IjoiQ2FuYWRhIiwiY2xpZW50QWRkcmVzc0luZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUyIjoiQWRkcmVzcyBMaW5lIDIiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTEiOiJBZGRyZXNzIExpbmUgMSJ9XSwiY2xpZW50SW5mb19sYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDQtMjFUMDU6MjQ6NTEuMDAwWiIsImNsaWVudEluZm9fY2xpZW50SWRlbnRpZmllciI6MTEsImNsaWVudEluZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50SW5mb19jbGllbnRFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIn0\u003d"};
        // let data = { "key": "key", "value": "eyJjbGllbnRJbmZvX2NsaWVudExhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJjbGllbnRJbmZvX2NsaWVudE5hbWUiOiJUZXN0MiIsImNsaWVudEluZm9fY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50SW5mb19jbGllbnRFbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY2xpZW50SW5mb19jbGllbnRUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRJbmZvX2NsaWVudFByb3ZpbmNlQ29kZSI6IkFCIiwiY2xpZW50SW5mb19jbGllbnROdW1iZXIiOiIxMjM0NTYiLCJjbGllbnRJbmZvX2NsaWVudFN0YXR1c0VuZERhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRJbmZvX2dyb3VwUG9saWN5SG9sZGVyIjoiWSIsImNsaWVudEluZm9fY2xpZW50RmF4TnVtYmVyIjoiMTIzNCIsImNsaWVudEluZm9fY2xpZW50UGhvbmUxIjoiMTIzNDU2IiwiY2xpZW50SW5mb19jbGllbnRQaG9uZTIiOiI3ODkxMjM0NSIsImNsaWVudEluZm9fY2xpZW50UHJvZml0U2hhcmluZ0ZsYWciOiJZIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0luZm8iOlt7ImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRBZGRyZXNzSWRlbnRpZmllciI6MjUsImNsaWVudEFkZHJlc3NJbmZvX2N1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNsaWVudEFkZHJlc3NJbmZvX2xhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNC0yMlQwODo0OTozMS4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTIwVDAwOjAwOjAwLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wcm92aW5jZSI6IklOIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50TnVtYmVyIjoiMTIzNDU2IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MTJ9LHsiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudEFkZHJlc3NJZGVudGlmaWVyIjoyNCwiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTIyVDA4OjQ4OjMyLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiMTIiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzVHlwZSI6Ik1haWxpbmciLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzRWZmZWN0aXZlRGF0ZSI6IjIwMjEtMDQtMDZUMDA6MDA6MDAuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX3Byb3ZpbmNlIjoiSEkiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnROdW1iZXIiOiIxMjM0NTYiLCJjbGllbnRBZGRyZXNzSW5mb19jbGllbnRJZGVudGlmaWVyIjoxMiwiY2xpZW50QWRkcmVzc0luZm9fY2l0eSI6IkhQVCIsImNsaWVudEFkZHJlc3NJbmZvX2NvdW50cnkiOiJDYW5hZGEiLCJjbGllbnRBZGRyZXNzSW5mb19jdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTIiOiJhZGRyZXNzMiIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NMaW5lMSI6ImFkZHJlc3MxIn0seyJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjIzLCJjbGllbnRBZGRyZXNzSW5mb19sYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDQtMjJUMDg6NDY6MzAuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX3Bvc3RhbENvZGUiOiIxMjM0IiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTAxVDAwOjAwOjAwLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wcm92aW5jZSI6IkFCIiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50TnVtYmVyIjoiMTIzNDU2IiwiY2xpZW50QWRkcmVzc0luZm9fY2xpZW50SWRlbnRpZmllciI6MTIsImNsaWVudEFkZHJlc3NJbmZvX2NpdHkiOiJIUFQiLCJjbGllbnRBZGRyZXNzSW5mb19jb3VudHJ5IjoiQ2FuYWRhIiwiY2xpZW50QWRkcmVzc0luZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc0xpbmUyIjoiYWRkcmVzcyBMaW5lIDIiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTEiOiJhZGRyZXNzIExpbmUgMSJ9XSwiY2xpZW50SW5mb19sYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDQtMjJUMDU6MDg6MjEuMDAwWiIsImNsaWVudEluZm9fY2xpZW50SWRlbnRpZmllciI6MTIsImNsaWVudEluZm9fY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50SW5mb19jbGllbnRFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIn0\u003d" };
      //  let data = "eyJjbGllbnRBZGRyZXNzSW5mbyI6eyJjbGllbnRBZGRyZXNzSW5mbyI6W3siY2xpZW50QWRkcmVzc0luZm9fYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudEFkZHJlc3NJZGVudGlmaWVyIjozMCwiY2xpZW50QWRkcmVzc0luZm9fbGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA0LTI3VDA1OjE0OjQyLjAwMFoiLCJjbGllbnRBZGRyZXNzSW5mb19wb3N0YWxDb2RlIjoiY29kZSIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NUeXBlIjoiTWFpbGluZyIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0yN1QwMDowMDowMC4wMDBaIiwiY2xpZW50QWRkcmVzc0luZm9fcHJvdmluY2UiOiJBQiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudE51bWJlciI6IjEyMzQ1NiIsImNsaWVudEFkZHJlc3NJbmZvX2NsaWVudElkZW50aWZpZXIiOjEyLCJjbGllbnRBZGRyZXNzSW5mb19jaXR5IjoiY2l0eSIsImNsaWVudEFkZHJlc3NJbmZvX2NvdW50cnkiOiJDYW5hZGEiLCJjbGllbnRBZGRyZXNzSW5mb19jdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjbGllbnRBZGRyZXNzSW5mb19hZGRyZXNzTGluZTIiOiJsaW5lMiIsImNsaWVudEFkZHJlc3NJbmZvX2FkZHJlc3NMaW5lMSI6ImxpbmUxIn1dfSwiY2xpZW50SW5mbyI6eyJjbGllbnRQcm92aW5jZUNvZGUiOiJBQiIsImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNsaWVudE5hbWUiOiJUZXN0MiIsImNsaWVudEVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJjbGllbnRGYXhOdW1iZXIiOiIxMjM0IiwiY2xpZW50U3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNC0yMlQwNTowODoyMS4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6MTIsImNsaWVudExhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiIxMjM0NTYiLCJjbGllbnRUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJjbGllbnRQcm9maXRTaGFyaW5nRmxhZyI6IlkiLCJncm91cFBvbGljeUhvbGRlciI6IlkiLCJjbGllbnRFZmZlY3RpdmVEYXRlIjoiMjAyMS0wNC0wMVQwMDowMDowMC4wMDBaIiwiY2xpZW50UGhvbmUyIjoiNzg5MTIzNDUiLCJjbGllbnRQaG9uZTEiOiIxMjM0NTYifX0=";
      //   this.planDetailsData = JSON.parse(atob(data))

      });
  }

  onClickOfClientMaintenanceSearch() {
    debugger;
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchClientList", JSON.stringify({ "clientNumber": this.clientNumber, "clientName": this.clientName, "clientStatus": this.clientStatusVal }), "").subscribe(
      data => {
        this.clientMaintenanceListData = JSON.parse(atob(data.value)).clientList_clientSummary;
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        // let data = { "key": "key", "value": "eyJjbGllbnRMaXN0X2NsaWVudFN1bW1hcnkiOlt7ImNsaWVudE5hbWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4iLCJjbGllbnRJZGVudGlmaWVyIjoxMCwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUzODM3MzkifSx7ImNsaWVudE5hbWUiOiJDcmVsb2dpeCIsImNsaWVudElkZW50aWZpZXIiOjIsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MjgyODk4In0seyJjbGllbnROYW1lIjoiTEFJUyIsImNsaWVudElkZW50aWZpZXIiOjMsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MDg0MDU0In0seyJjbGllbnROYW1lIjoiTEdNIiwiY2xpZW50SWRlbnRpZmllciI6MSwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUyNzU3NzkifSx7ImNsaWVudE5hbWUiOiJURVNUIiwiY2xpZW50SWRlbnRpZmllciI6MTEsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjEyMzQifV19" };
        // // this.productMaintenanceListData = JSON.parse(Base64.decode(data)).productList_productSummary;

        // let data = {"key":"key","value":"eyJjbGllbnRMaXN0X2NsaWVudFN1bW1hcnkiOlt7ImNsaWVudE5hbWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4iLCJjbGllbnRJZGVudGlmaWVyIjoxMCwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUzODM3MzkifSx7ImNsaWVudE5hbWUiOiJDcmVsb2dpeCIsImNsaWVudElkZW50aWZpZXIiOjIsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MjgyODk4In0seyJjbGllbnROYW1lIjoiTEFJUyIsImNsaWVudElkZW50aWZpZXIiOjMsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MDg0MDU0In0seyJjbGllbnROYW1lIjoiTEdNIiwiY2xpZW50SWRlbnRpZmllciI6MSwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUyNzU3NzkifSx7ImNsaWVudE5hbWUiOiJURVNUIiwiY2xpZW50SWRlbnRpZmllciI6MTEsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjEyMzQifSx7ImNsaWVudE5hbWUiOiJUZXN0MTAiLCJjbGllbnRJZGVudGlmaWVyIjoxOSwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiMjAifSx7ImNsaWVudE5hbWUiOiJUZXN0MiIsImNsaWVudElkZW50aWZpZXIiOjEyLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiIxMjM0NTYifSx7ImNsaWVudE5hbWUiOiJUZXN0MjEiLCJjbGllbnRJZGVudGlmaWVyIjoyMSwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiMjEifSx7ImNsaWVudE5hbWUiOiJ0ZXN0MjIiLCJjbGllbnRJZGVudGlmaWVyIjoyMiwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiMjIifSx7ImNsaWVudE5hbWUiOiJUZXN0MjMiLCJjbGllbnRJZGVudGlmaWVyIjoyNSwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiMjMifSx7ImNsaWVudE5hbWUiOiJUZXN0MjQiLCJjbGllbnRJZGVudGlmaWVyIjoyNiwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiMjQifSx7ImNsaWVudE5hbWUiOiJUZXN0MyIsImNsaWVudElkZW50aWZpZXIiOjEzLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiIxNSJ9LHsiY2xpZW50TmFtZSI6IlRlc3Q0IiwiY2xpZW50SWRlbnRpZmllciI6MTQsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjE2In1dfQ\u003d\u003d"};
        // this.clientMaintenanceListData = JSON.parse(atob(data.value)).clientList_clientSummary;

      });
  }

  onClickOfClientReset() {
    // debugger;
    this.clientNumber = "";
    this.clientName = "";
    this.clientStatusVal = "";
    this.clientMaintenanceListData = [];
  }

  onClickOfAddClient() {
    debugger;
    this.planDetailsData = {};
    this.selectedTab = 1;
  }













}