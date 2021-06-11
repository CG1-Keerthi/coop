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
  public clientSelect: string;
  public selectedClientName: any;

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
    this.selectedClientName = undefined;
    this.clientSelect = "clientSelect";
    this.mdConnectedPartnersDS.getListOfPartnerCompaniesTypeAhead(event.target.value).subscribe(
      data => {
        this.clientNameVal = data;
      }, error => {
        this.mdMondServiceDS.MDError(error);
      //   this.clientNameVal = [{ "companyId": 6883, "inheritFromCompanyId": -1, "companyIdentifier": "24002", "companyName": "Crelogix", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 156, "createDate": "Oct 13, 2017 5:43:01 AM", "updateDate": "Oct 14, 2017 1:23:27 PM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "-05:00", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }, { "companyId": 7102, "inheritFromCompanyId": -1, "companyIdentifier": "24003", "companyName": "LAIS", "password": "", "baseCompanyFl": false, "selectedCompany": false, "createUser": 67, "updateUser": 67, "createDate": "Apr 12, 2019 5:13:34 AM", "updateDate": "Apr 12, 2019 5:13:34 AM", "partnerCompLogo": "", "as2Identifier": "", "emailDomain": "", "companyTZ": "", "companyLogo": "", "dunsNumber": "", "rnifLocation": "", "rnifPartnerURL": "", "rnifIdentifier": "", "groupFl": false, "groupCompanyId": -1, "archiveToS3": false, "archiveYears": 0, "archiveAfterDays": 0, "userBelongToFl": 0, "decodedPassword": "", "invalidLoginAllowed": 3, "marconnCompanyRole": 1, "adminChannel": -1, "purgeAfterDays": 60, "moveToBackupDays": 30, "mdCompanyFl": true, "mcCompanyFl": false, "dmsCompanyFl": false, "bpmCompanyFl": false, "homeFolderId": 0, "authIdentifier": 1 }]
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
        
      let data = "eyJjbGllbnRBZGRyZXNzSW5mbyI6eyJjbGllbnRBZGRyZXNzSW5mbyI6W3siY291bnRyeSI6IkNhbmFkYSIsImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImNpdHkiOiJjY2NjY2NjY2NjIiwiYWRkcmVzc1Rlcm1pbmF0aW9uRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImFkZHJlc3NUeXBlIjoiTWFpbGluZyIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0xMVQxMzoyNjozMi4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6ODIsInBvc3RhbENvZGUiOiIxMTEiLCJhZGRyZXNzRWZmZWN0aXZlRGF0ZSI6IjIwMTYtMDItMDJUMDA6MDA6MDAuMDAwWiIsImNsaWVudE51bWJlciI6IjciLCJwcm92aW5jZSI6IklOIiwiY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjE0MywiYWRkcmVzc0xpbmUxIjoiYWFhYWFhYWFhYWEiLCJhZGRyZXNzTGluZTIiOiJiYmJiYmJiYmIifSx7ImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsImFkZHJlc3NUZXJtaW5hdGlvbkRhdGUiOiI5OTk5LTEyLTMxVDA5OjA4OjI2LjAwMFoiLCJhZGRyZXNzVHlwZSI6Ik1haWxpbmciLCJsYXN0VXBkYXRlRGF0ZSI6IjIwMjEtMDYtMTFUMTM6MzE6MDAuMDAwWiIsImNsaWVudElkZW50aWZpZXIiOjgyLCJjbGllbnRBZGRyZXNzSWRlbnRpZmllciI6MTQ2LCJhZGRyZXNzRWZmZWN0aXZlRGF0ZSI6IjIwMTUtMDEtMDJUMDA6MDA6MDAuMDAwWiIsImNsaWVudE51bWJlciI6IjcifSx7ImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsInByb3ZpbmNlIjoiQ08iLCJhZGRyZXNzVGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiYWRkcmVzc1R5cGUiOiJNYWlsaW5nIiwibGFzdFVwZGF0ZURhdGUiOiIyMDIxLTA2LTExVDEzOjI4OjE3LjAwMFoiLCJjbGllbnRJZGVudGlmaWVyIjo4MiwiY2xpZW50QWRkcmVzc0lkZW50aWZpZXIiOjE0NCwiYWRkcmVzc0VmZmVjdGl2ZURhdGUiOiIyMDE1LTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJjbGllbnROdW1iZXIiOiI3In1dfSwiY2xpZW50SW5mbyI6eyJjbGllbnRQcm92aW5jZUNvZGUiOiJBUiIsImN1cnJlbnRSZWNvcmRGbGFnIjoiWSIsInVwZGF0ZWRCeSI6InNvdW15YS5rbUBtb25kY2xvdWQuY29tIiwiY2xpZW50TmFtZSI6IlRlc3Q3IiwiY2xpZW50U3RhdHVzRW5kRGF0ZSI6Ijk5OTktMTItMzFUMDk6MDg6MjYuMDAwWiIsImxhc3RVcGRhdGVEYXRlIjoiMjAyMS0wNi0xMVQxMjo1NDo1MS4wMDBaIiwiY2xpZW50SWRlbnRpZmllciI6ODIsImluc2VydERhdGUiOiIyMDIxLTA2LTExVDEyOjU0OjUxLjAwMFoiLCJjbGllbnRMYW5ndWFnZUNvZGUiOiJGcmVuY2giLCJjbGllbnRTdGF0dXMiOiJBY3RpdmUiLCJjbGllbnROdW1iZXIiOiI3IiwiY2xpZW50VGVybWluYXRpb25EYXRlIjoiOTk5OS0xMi0zMVQwOTowODoyNi4wMDBaIiwiY2xpZW50UHJvZml0U2hhcmluZ0ZsYWciOiJZIiwiZ3JvdXBQb2xpY3lIb2xkZXIiOiJZRVMiLCJpbnNlcnRlZEJ5Ijoic291bXlhLmttQG1vbmRjbG91ZC5jb20iLCJjbGllbnRFZmZlY3RpdmVEYXRlIjoiMjAyMC0wMS0wMlQwMDowMDowMC4wMDBaIn19";      
      this.planDetailsData = JSON.parse(atob(data))

      });
  }

  onSelectClientName(event){
    this.selectedClientName == undefined
    this.selectedClientName = event.source.value;
  }

  onClickOfClientMaintenanceSearch() {
    debugger;
    if(this.clientName != ""){
      if( this.clientSelect == "clientSelect"){
        if (this.selectedClientName == undefined) {
          this.mdMondServiceDS.showErrorMessage("Please select the Client Name.");
          return;
        }
      }
    }
    this.isSpinnerShow = true;
    this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchClientList", JSON.stringify({ "clientNumber": this.clientNumber, "clientName": this.clientName, "clientStatus": this.clientStatusVal }), "").subscribe(
      data => {
        this.isShowTblRow = true;
        this.clientMaintenanceListData = JSON.parse(atob(data.value)).clientList_clientSummary;
        this.isSpinnerShow = false;
      },
      error => {
        this.mdMondServiceDS.MDError(error);          
        let data = {"key":"key","value":"ewogICJjbGllbnRMaXN0X2NsaWVudFN1bW1hcnkiOiBbCiAgICB7CiAgICAgICJ1cGRhdGVkQnkiOiAidmlkaHlhLnZlbnVnb3BhbEBtb25kY2xvdWQuY29tIiwKICAgICAgImNsaWVudE5hbWUiOiAiQ29sbGFicmlhIEZpbmFuY2lhbCBTZXJ2aWNlcyBJbmMuIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDMtMzBUMTc6NDQ6MjYuMDAwWiIsCiAgICAgICJjbGllbnRJZGVudGlmaWVyIjogNSwKICAgICAgImNsaWVudFN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY2xpZW50TnVtYmVyIjogIjg1MzgzNzM5IgogICAgfSwKICAgIHsKICAgICAgInVwZGF0ZWRCeSI6ICJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLAogICAgICAiY2xpZW50TmFtZSI6ICJDcmVsb2dpeCIsCiAgICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDE4LTExLTE1VDEzOjU2OjQwLjAwMFoiLAogICAgICAiY2xpZW50SWRlbnRpZmllciI6IDIsCiAgICAgICJjbGllbnRTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImNsaWVudE51bWJlciI6ICI4NTI4Mjg5OCIKICAgIH0sCiAgICB7CiAgICAgICJ1cGRhdGVkQnkiOiAidmlkaHlhLnZlbnVnb3BhbEBtb25kY2xvdWQuY29tIiwKICAgICAgImNsaWVudE5hbWUiOiAiTEFJUyIsCiAgICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDE5LTAxLTI1VDE3OjA3OjU4LjAwMFoiLAogICAgICAiY2xpZW50SWRlbnRpZmllciI6IDMsCiAgICAgICJjbGllbnRTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImNsaWVudE51bWJlciI6ICI4NTA4NDA1NCIKICAgIH0sCiAgICB7CiAgICAgICJ1cGRhdGVkQnkiOiAidmlkaHlhLnZlbnVnb3BhbEBtb25kY2xvdWQuY29tIiwKICAgICAgImNsaWVudE5hbWUiOiAiTEdNIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMTgtMDctMTJUMTQ6Mjc6MTEuMDAwWiIsCiAgICAgICJjbGllbnRJZGVudGlmaWVyIjogMSwKICAgICAgImNsaWVudFN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY2xpZW50TnVtYmVyIjogIjg1Mjc1Nzc5IgogICAgfSwKICAgIHsKICAgICAgInVwZGF0ZWRCeSI6ICJ2aWRoeWEudmVudWdvcGFsQG1vbmRjbG91ZC5jb20iLAogICAgICAiY2xpZW50TmFtZSI6ICJMR00yIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMTgtMDctMDNUMTQ6NDE6MDIuMDAwWiIsCiAgICAgICJjbGllbnRJZGVudGlmaWVyIjogNCwKICAgICAgImNsaWVudFN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY2xpZW50TnVtYmVyIjogIjg1Mjc1Nzc5IgogICAgfSwKICAgIHsKICAgICAgInVwZGF0ZWRCeSI6ICJzYWRoeWFzbWl0YS5wcnVzdHlAY29ubmVjdGdsb2JhbG9uZS5jb20iLAogICAgICAiY2xpZW50TmFtZSI6ICJUZXN0MSIsCiAgICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDIxLTA1LTEzVDExOjQ4OjQ3LjAwMFoiLAogICAgICAiY2xpZW50SWRlbnRpZmllciI6IDcxLAogICAgICAiY2xpZW50U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJjbGllbnROdW1iZXIiOiAiMSIKICAgIH0sCiAgICB7CiAgICAgICJ1cGRhdGVkQnkiOiAic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwKICAgICAgImNsaWVudE5hbWUiOiAiVGVzdDIiLAogICAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0wOFQxMjowNDoyMi4wMDBaIiwKICAgICAgImNsaWVudElkZW50aWZpZXIiOiA3MiwKICAgICAgImNsaWVudFN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY2xpZW50TnVtYmVyIjogIjIiCiAgICB9LAogICAgewogICAgICAidXBkYXRlZEJ5IjogInNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsCiAgICAgICJjbGllbnROYW1lIjogIlRlc3QzIiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMDhUMTE6NTg6MTguMDAwWiIsCiAgICAgICJjbGllbnRJZGVudGlmaWVyIjogNzMsCiAgICAgICJjbGllbnRTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImNsaWVudE51bWJlciI6ICIzIgogICAgfSwKICAgIHsKICAgICAgInVwZGF0ZWRCeSI6ICJzYWRoeWFzbWl0YS5wcnVzdHlAY29ubmVjdGdsb2JhbG9uZS5jb20iLAogICAgICAiY2xpZW50TmFtZSI6ICJUZXN0NCIsCiAgICAgICJsYXN0VXBkYXRlRGF0ZSI6ICIyMDIxLTA2LTA4VDEyOjEwOjMzLjAwMFoiLAogICAgICAiY2xpZW50SWRlbnRpZmllciI6IDc1LAogICAgICAiY2xpZW50U3RhdHVzIjogIkFjdGl2ZSIsCiAgICAgICJjbGllbnROdW1iZXIiOiAiMDAwNCIKICAgIH0sCgkgewogICAgICAidXBkYXRlZEJ5IjogInNhZGh5YXNtaXRhLnBydXN0eUBjb25uZWN0Z2xvYmFsb25lLmNvbSIsCiAgICAgICJjbGllbnROYW1lIjogIlRlc3Q0IiwKICAgICAgImxhc3RVcGRhdGVEYXRlIjogIjIwMjEtMDYtMDhUMTI6MTA6MzMuMDAwWiIsCiAgICAgICJjbGllbnRJZGVudGlmaWVyIjogNzUsCiAgICAgICJjbGllbnRTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImNsaWVudE51bWJlciI6ICIwMDA0IgogICAgfSwKCSB7CiAgICAgICJ1cGRhdGVkQnkiOiAic2FkaHlhc21pdGEucHJ1c3R5QGNvbm5lY3RnbG9iYWxvbmUuY29tIiwKICAgICAgImNsaWVudE5hbWUiOiAiVGVzdDQiLAogICAgICAibGFzdFVwZGF0ZURhdGUiOiAiMjAyMS0wNi0wOFQxMjoxMDozMy4wMDBaIiwKICAgICAgImNsaWVudElkZW50aWZpZXIiOiA3NSwKICAgICAgImNsaWVudFN0YXR1cyI6ICJBY3RpdmUiLAogICAgICAiY2xpZW50TnVtYmVyIjogIjAwMDQiCiAgICB9CiAgXQp9"};
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


  // @HostListener('click', ['$event.target'])
  //   onClick(element) {
  //       // debugger;
  //       this.isResizeTrue = true;
  //       setTimeout(() => {
  //           this.isResizeTrue = false;
  //       }, 2000)
  //   }

}