import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  public isResizeTrue: boolean = false;
  public isShowTblRow: boolean = false;
  public isSpinnerShow:boolean = false;

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

    this.mdMondServiceDS.invokeMondServiceGET("Creditor Self Admin", "FetchClientDetails-V2", "1.00", btoa(JSON.stringify({ "clientId": event.data.clientIdentifier })), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.planDetailsData = JSON.parse(atob(data))
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        
      let data = "eyJjbGllbnRBZGRyZXNzSW5mbyI6eyJjbGllbnRBZGRyZXNzSW5mbyI6W3siY291bnRyeSI6IlVuaXRlZCBTdGF0ZXMiLCJjdXJyZW50UmVjb3JkRmxhZyI6IlkiLCJjaXR5IjoiSFBUIiwiYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImFkZHJlc3NUeXBlIjoiQmlsbGluZyIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNC0yN1QxMzoyNTo0MS4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6MTQsInBvc3RhbENvZGUiOiIxMjM0IiwiYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTAxVDAwOjAwOjAwLjAwMFoiLCJjbGllbnROdW1iZXIiOiIxNiIsInByb3ZpbmNlIjoiSUEiLCJjbGllbnRBZGRyZXNzSWRlbnRpZmllciI6NDEsImFkZHJlc3NMaW5lMSI6ImxpbmUxIiwiYWRkcmVzc0xpbmUyIjoiTGluZTIifV19LCJjbGllbnRJbmZvIjp7ImNsaWVudFByb3ZpbmNlQ29kZSI6IkFCIiwiY3VycmVudFJlY29yZEZsYWciOiJZIiwiY2xpZW50TmFtZSI6IlRlc3Q0IiwiY2xpZW50RW1haWwiOiJ0ZXN0NEBnYW1pbC5jb20iLCJjbGllbnRGYXhOdW1iZXIiOiIzIiwiY2xpZW50U3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNC0yNlQwNDoyOToxMi4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6MTQsImNsaWVudExhbmd1YWdlQ29kZSI6IkVuZ2xpc2giLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiIxNiIsImNsaWVudFRlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImNsaWVudFByb2ZpdFNoYXJpbmdGbGFnIjoiWSIsImdyb3VwUG9saWN5SG9sZGVyIjoiWSIsImNsaWVudEVmZmVjdGl2ZURhdGUiOiIyMDIxLTA0LTAxVDAwOjAwOjAwLjAwMFoiLCJjbGllbnRQaG9uZTIiOiIyIiwiY2xpZW50UGhvbmUxIjoiMSJ9fQ\u003d\u003d";      
      this.planDetailsData = JSON.parse(atob(data))

      });
  }

  onClickOfClientMaintenanceSearch() {
    debugger;
    this.isSpinnerShow = true;
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchClientList", JSON.stringify({ "clientNumber": this.clientNumber, "clientName": this.clientName, "clientStatus": this.clientStatusVal }), "").subscribe(
      data => {
        this.isShowTblRow = true;
        this.clientMaintenanceListData = JSON.parse(atob(data.value)).clientList_clientSummary;
        this.isSpinnerShow = false;
      },
      error => {
        this.mdMondServiceDS.MDError(error);          
        let data = {"key":"key","value":"eyJjbGllbnRMaXN0X2NsaWVudFN1bW1hcnkiOlt7InVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImNsaWVudE5hbWUiOiJDb2xsYWJyaWEgRmluYW5jaWFsIFNlcnZpY2VzIEluYy4iLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDMtMzBUMTc6NDQ6MjYuMDAwWiIsImNsaWVudElkZW50aWZpZXIiOjUsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MzgzNzM5In0seyJ1cGRhdGVkQnkiOiJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLCJjbGllbnROYW1lIjoiQ3JlbG9naXgiLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMTgtMTEtMTVUMTM6NTY6NDAuMDAwWiIsImNsaWVudElkZW50aWZpZXIiOjIsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1MjgyODk4In0seyJ1cGRhdGVkQnkiOiJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLCJjbGllbnROYW1lIjoiTEFJUyIsImxhc3RVcGRhdGVEYXRlIjoiMjAxOS0wMS0yNVQxNzowNzo1OC4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6MywiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUwODQwNTQifSx7InVwZGF0ZWRCeSI6InZpZGh5YS52ZW51Z29wYWxAbW9uZGNsb3VkLmNvbSIsImNsaWVudE5hbWUiOiJMR00iLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMTgtMDctMTJUMTQ6Mjc6MTEuMDAwWiIsImNsaWVudElkZW50aWZpZXIiOjEsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6Ijg1Mjc1Nzc5In0seyJ1cGRhdGVkQnkiOiJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLCJjbGllbnROYW1lIjoiTEdNMiIsImxhc3RVcGRhdGVEYXRlIjoiMjAxOC0wNy0wM1QxNDo0MTowMi4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6NCwiY2xpZW50U3RhdHVzIjoiQWN0aXZlIiwiY2xpZW50TnVtYmVyIjoiODUyNzU3NzkifSx7InVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImNsaWVudE5hbWUiOiJUZXN0MSIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNS0xM1QxMTo0ODo0Ny4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6NzEsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjEifSx7InVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImNsaWVudE5hbWUiOiJUZXN0MiIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMjowNDoyMi4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6NzIsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjIifSx7InVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImNsaWVudE5hbWUiOiJUZXN0MyIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMTo1ODoxOC4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6NzMsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjMifSx7InVwZGF0ZWRCeSI6InNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsImNsaWVudE5hbWUiOiJUZXN0NCIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0wOFQxMjoxMDozMy4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6NzUsImNsaWVudFN0YXR1cyI6IkFjdGl2ZSIsImNsaWVudE51bWJlciI6IjAwMDQifV19"};
        this.isShowTblRow = true;
        this.clientMaintenanceListData = JSON.parse(atob(data.value)).clientList_clientSummary;
        this.isSpinnerShow = false;

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


  @HostListener('click', ['$event.target'])
    onClick(element) {
        debugger;
        this.isResizeTrue = true;
        setTimeout(() => {
            this.isResizeTrue = false;
        }, 2000)
    }

}