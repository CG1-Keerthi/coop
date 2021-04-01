import { Component, OnInit, OnDestroy, ViewChild, Injectable, HostListener, ElementRef } from '@angular/core';
import { Base64 } from 'js-base64';
import { filter, first, pairwise } from 'rxjs/operators';
import { isEmpty, get, assign } from 'lodash';
import { MDLoginDS, MDApplicationDetailsDS, MDSessionDS } from '../_services/ds';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MDCommonGetterSetter } from '../_services/common';
import { MDMondServiceDS } from '../_services/ds';
import { ToastrService } from 'ngx-toastr';
import { MDCountdownTimer } from '../_services/utils';
import $ from 'jquery';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

@Injectable()
export class HomeComponent implements OnInit, OnDestroy {


  public binDataHdr;
  // currentUserSubscription: Subscription
  private authData;
  authCompleteObject;
  homeForm: FormGroup;
  isB2CFl = false;
  public menuNameAndTooltipList = new Array();

  autoReactivatingInterval: any;
  sessionCheckInterval: any;
  showBackButton: boolean = false;


  @ViewChild('cancelBtn') cancelBtn: ElementRef;
  constructor(private formBuilder: FormBuilder, private mdLoginDS: MDLoginDS,
    private mdApplicationDetailDS: MDApplicationDetailsDS, private router: Router,
    private mdCommonGetterAndSetter: MDCommonGetterSetter, private mDMondService: MDMondServiceDS,
    private toastService: ToastrService, private countDownTimer: MDCountdownTimer, 
    private mdSessionDS: MDSessionDS
    //  private appRoutingServices:AppRoutingServices
  ) {
    // this.router.events
    // .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    // .subscribe((events: RoutesRecognized[]) => {
    //   console.log('previous url', events[0].urlAfterRedirects);
    //   console.log('current url', events[1].urlAfterRedirects);
    //   this.previousUrl = events[0].urlAfterRedirects
    // });
  }

  @HostListener('document:click', ['$event']) public documentClick(event: Event): void {
    var d = new Date().getTime();
    this.countDownTimer.setValidationSession(d);
    this.countDownTimer.isTimerReset = true;
  }

  @HostListener('document:keypress', ['$event']) public documentKeyPress(event: Event): void {
    var d = new Date().getTime();
    this.countDownTimer.setValidationSession(d);
    this.countDownTimer.isTimerReset = true;
  }

  ngOnInit() {
    debugger;

    this.isB2CFl = this.mdCommonGetterAndSetter.isB2CFl;
    if (!this.isB2CFl) {
      this.getAuthorizationInfo();
    }
    this.homeForm = this.formBuilder.group({
    });
    this.mdCommonGetterAndSetter.setPreviousURL();
    this.mdCommonGetterAndSetter.previousURLArrayData.subscribe(
      data => {
        data.filter((v, i, a) => a.indexOf(v) === i)
        if (data.filter((v, i, a) => a.indexOf(v) === i).length > 1) {
          this.showBackButton = true
        } else {
          this.showBackButton = false
        }
      })
  }

  get homeFormFields() { return this.homeForm.controls; }

  getAuthorizationInfo() {
    var authParam = '';
    this.mdLoginDS.auth(authParam).pipe(first()).subscribe(
      data => {
        // console.log("data.companyIdentifier " + data.companyIdentifier);

        this.setAuthorizationInfo(data);
        console.log("csfrToken ", data.csfrToken);
        this.mdCommonGetterAndSetter.setCsfrToken(data.csfrToken);
        // this.getLoginUserProfile();

        // console.log("Session timeout: ", data.sessionTimeOut);
        var d = new Date().getTime();
        // VALIDATE LAST SESSION TIMING
        this.countDownTimer.setValidationSession(d);
        // SESSION TIMEOUT RECEIVED
        this.countDownTimer.setSessionTimeout(data.sessionTimeOut);

        // Getting session Expiry Notifications

        this.autoReactivatingInterval = setInterval(() => {
          if (!this.countDownTimer.isTimerReset) {
            // console.log("%c AUTOREACTIVATING SESSION.","background: orange; color: white; font-size: 14px;");
            this.mdSessionDS.isSessionValid().pipe(first()).subscribe(
              data => {
                // console.log(data);
              },
              error => {
                this.mdSessionDS.MDError(error)
              });
          }
        }, 300000);

        this.sessionCheckInterval = setInterval(() => {
          // console.log("%c SESSION CHECK.","background: orange; color: white; font-size: 14px;");
          this.countDownTimer.getSessionExpiryNotification();
        }, 60000);

        //this.tabsComponent.openTab("Dashboard", this.dashboardTemplate, {}, true);
      },
      error => {
        console.log(error);
        var d = new Date().getTime();
        // console.log("Session timeout: ", 180);
        // VALIDATE LAST SESSION TIMING
        this.countDownTimer.setValidationSession(d);
        // SESSION TIMEOUT RECEIVED
        this.countDownTimer.setSessionTimeout(180);

        // var completeApplicationListObj = [{ "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "applicationDetailsIdLong": 1, "companyId": 6958, "applicationName": "Commercial Insurance", "menuList": [{ "menuId": "5b2c9ee064de27df6eda3527", "menuIdLong": 1, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Agency Maintenance", "menuLink": "form_175065", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain insurance agents", "parentMenuId": "" }, { "menuId": "5b34b37164dea9bbae3f9d71", "menuIdLong": 3, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Insurer Maintenance", "menuLink": "form_170546", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain insurance companies", "parentMenuId": "" }, { "menuId": "5b34d0ad64de8e2cc9b526f5", "menuIdLong": 4, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Quote Overview", "menuLink": "form_170551", "menuProcessLink": "-1", "toolTip": "View Quote request and responses", "parentMenuId": "" }, { "menuId": "5b3b6ca964def1e94179d3b9", "menuIdLong": 6, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Update Agent Profile", "menuLink": "form_175289", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain producers of agencies", "parentMenuId": "" }, { "menuId": "5b3f38de64deac71cafda7a0", "menuIdLong": 7, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Agency Branch Maintenance", "menuLink": "form_171091", "menuProcessLink": "-1", "toolTip": "Agent Maintenance form", "parentMenuId": "" }, { "menuId": "5b6be6a72cdc128e829be9ab", "menuIdLong": 8, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Dashboard", "menuLink": "form_173000", "menuProcessLink": "-1", "toolTip": "Recent Activities", "parentMenuId": "" }, { "menuId": "5cac42d32cdc342bebed90b1", "menuIdLong": 9, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Create Quote", "menuLink": "-1", "menuProcessLink": "-1", "toolTip": "Initiate new quote request", "parentMenuId": "" }, { "menuId": "5cac42d32cdc342bebed90b2", "menuIdLong": 10, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Quote Overview Support", "menuLink": "-1", "menuProcessLink": "-1", "toolTip": "View support data", "parentMenuId": "" }], "homePagePresent": false }]
        // for (let applicationObj of completeApplicationListObj) {
        //   if (applicationObj.applicationName == "Commercial Insurance") {
        //     for (let menuListArr of applicationObj.menuList) {
        //       var menuNameAndTooltipObj = { menuName: "", tooltip: "", applicationPath: "" };
        //       menuNameAndTooltipObj.menuName = menuListArr.menuName;
        //       menuNameAndTooltipObj.tooltip = menuListArr.toolTip;
        //       if (menuNameAndTooltipObj.menuName == "Create Quote") {
        //         menuNameAndTooltipObj.applicationPath = "createQuoteClassification";
        //         this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
        //       }
        //       else if (menuNameAndTooltipObj.menuName == "Quote Overview") {
        //         menuNameAndTooltipObj.applicationPath = "quoteOverview";
        //         this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
        //       }
        //       else if (menuNameAndTooltipObj.menuName == "Update Agent Profile") {
        //         menuNameAndTooltipObj.applicationPath = "agentConfiguration";
        //         this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
        //       }
        //       else if (menuNameAndTooltipObj.menuName == "Dashboard") {
        //         menuNameAndTooltipObj.applicationPath = "dashboard";
        //         this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
        //       }
        //       else if (menuNameAndTooltipObj.menuName == "Quote Overview Support") {
        //         menuNameAndTooltipObj.applicationPath = "quoteOverviewSupport";
        //         this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
        //       }
        //       menuNameAndTooltipObj = { menuName: "", tooltip: "", applicationPath: "" };
        //     }
        //   }
        // }
      });

  }

  getAppMenuListFl(authCompleteObject) {
    let dataModelerViewOrFl: boolean = authCompleteObject.classDiagramViewAllowed || authCompleteObject.bpmERDiagramViewAllowed;
    let applicationDesignerOrFl: boolean = authCompleteObject.orgChartViewAllowed || authCompleteObject.dataFormDesignerViewAllowed || authCompleteObject.processTypeViewAllowed;
    let reportDeignerOrFl: boolean = authCompleteObject.bpmKPIDefinitionViewAllowed || authCompleteObject.reportDesignerViewAllowed;

    let dataModelerViewAndFl: boolean = authCompleteObject.classDiagramViewAllowed && authCompleteObject.bpmERDiagramViewAllowed;
    let applicationDesignerAndFl: boolean = authCompleteObject.orgChartViewAllowed && authCompleteObject.dataFormDesignerViewAllowed && authCompleteObject.processTypeViewAllowed;
    let reportDeignerAndFl: boolean = authCompleteObject.bpmKPIDefinitionViewAllowed && authCompleteObject.reportDesignerViewAllowed;

    return {
      "dataModelerViewOrFl": dataModelerViewOrFl,
      "applicationDesignerOrFl": applicationDesignerOrFl,
      "reportDeignerOrFl": reportDeignerOrFl,
      "dataModelerViewAndFl": dataModelerViewAndFl,
      "applicationDesignerAndFl": applicationDesignerAndFl,
      "reportDeignerAndFl": reportDeignerAndFl
    }
  }

  getDisplayColListFl(appMenuViewFl) {
    let colFourDataModelPresent: boolean = appMenuViewFl.dataModelerViewAndFl === false && appMenuViewFl.applicationDesignerOrFl === true && appMenuViewFl.reportDeignerOrFl === true;
    let colFourApplicationPresent: boolean = appMenuViewFl.applicationDesignerAndFl === false && appMenuViewFl.dataModelerViewOrFl === true && appMenuViewFl.reportDeignerOrFl === true;
    let colFourReportDesignerPresent: boolean = appMenuViewFl.reportDeignerAndFl === false && appMenuViewFl.dataModelerViewOrFl === true && appMenuViewFl.applicationDesignerOrFl === true;

    let colSixDataModelPresent: boolean = appMenuViewFl.dataModelerViewAndFl === false && appMenuViewFl.applicationDesignerAndFl === false && appMenuViewFl.reportDeignerOrFl === true;
    let colSixApplicationPresent: boolean = appMenuViewFl.applicationDesignerAndFl === false && appMenuViewFl.reportDeignerAndFl === false && appMenuViewFl.dataModelerViewOrFl === true;
    let colSixReportPresent: boolean = appMenuViewFl.reportDeignerAndFl === false && appMenuViewFl.dataModelerViewAndFl === false && appMenuViewFl.applicationDesignerOrFl === true;

    return {
      "colFourDataModelPresent": colFourDataModelPresent,
      "colFourApplicationPresent": colFourApplicationPresent,
      "colFourReportDesignerPresent": colFourReportDesignerPresent,
      "colSixDataModelPresent": colSixDataModelPresent,
      "colSixApplicationPresent": colSixApplicationPresent,
      "colSixReportPresent": colSixReportPresent,
    }
  }

  getClassBasedOnAccessRight(authCompleteObject) {
    let returnedFlags = this.getAppMenuListFl(authCompleteObject);
    let displayColFlags = this.getDisplayColListFl(returnedFlags);
    return {
      'col-md-3 col-lg-3': returnedFlags.dataModelerViewOrFl && returnedFlags.applicationDesignerOrFl && returnedFlags.reportDeignerOrFl,
      'col-md-4 col-lg-4': displayColFlags.colFourDataModelPresent || displayColFlags.colFourApplicationPresent || displayColFlags.colFourReportDesignerPresent,
      'col-md-6 col-lg-6': displayColFlags.colSixDataModelPresent || displayColFlags.colSixApplicationPresent || displayColFlags.colSixReportPresent,
      'col-md-12 col-lg-12': returnedFlags.dataModelerViewAndFl === false && returnedFlags.applicationDesignerAndFl === false && returnedFlags.reportDeignerAndFl === false
    }
  }

  getClassForTheDesignParentMenu(authCompleteObject) {
    let returnedFlags = this.getAppMenuListFl(authCompleteObject);
    let displayColFlags = this.getDisplayColListFl(returnedFlags);
    return {
      'md-multi-column-4': returnedFlags.dataModelerViewOrFl && returnedFlags.applicationDesignerOrFl && returnedFlags.reportDeignerOrFl,
      'md-multi-column-3': displayColFlags.colFourDataModelPresent || displayColFlags.colFourApplicationPresent || displayColFlags.colFourReportDesignerPresent,
      'md-multi-column-2': displayColFlags.colSixDataModelPresent || displayColFlags.colSixApplicationPresent || displayColFlags.colSixReportPresent,
      'md-multi-column-1': returnedFlags.dataModelerViewAndFl === false && returnedFlags.applicationDesignerAndFl === false && returnedFlags.reportDeignerAndFl === false
    }
  }

  setAuthorizationInfo(authObject) {
    this.authCompleteObject = authObject;
    this.mdApplicationDetailDS.getListOfApplicationDetailsWithMenuAndAccessRights().pipe(first()).subscribe(
      data => {
        // console.dir(data);
        // var completeApplicationListObj = data;
        var completeApplicationListObj = [{ "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "applicationDetailsIdLong": 1, "companyId": 6958, "applicationName": "Commercial Insurance", "menuList": [{ "menuId": "5b2c9ee064de27df6eda3527", "menuIdLong": 1, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Agency Maintenance", "menuLink": "form_175065", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain insurance agents", "parentMenuId": "" }, { "menuId": "5b34b37164dea9bbae3f9d71", "menuIdLong": 3, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Insurer Maintenance", "menuLink": "form_170546", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain insurance companies", "parentMenuId": "" }, { "menuId": "5b34d0ad64de8e2cc9b526f5", "menuIdLong": 4, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Quote Overview", "menuLink": "form_170551", "menuProcessLink": "-1", "toolTip": "View Quote request and responses", "parentMenuId": "" }, { "menuId": "5b3b6ca964def1e94179d3b9", "menuIdLong": 6, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Update Agent Profile", "menuLink": "form_175289", "menuProcessLink": "-1", "toolTip": "Define \u0026 maintain producers of agencies", "parentMenuId": "" }, { "menuId": "5b3f38de64deac71cafda7a0", "menuIdLong": 7, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Agency Branch Maintenance", "menuLink": "form_171091", "menuProcessLink": "-1", "toolTip": "Agent Maintenance form", "parentMenuId": "" }, { "menuId": "5b6be6a72cdc128e829be9ab", "menuIdLong": 8, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Dashboard", "menuLink": "form_173000", "menuProcessLink": "-1", "toolTip": "Recent Activities", "parentMenuId": "" }, { "menuId": "5cac42d32cdc342bebed90b1", "menuIdLong": 9, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Create Quote", "menuLink": "-1", "menuProcessLink": "-1", "toolTip": "Initiate new quote request", "parentMenuId": "" }, { "menuId": "5cac42d32cdc342bebed90b2", "menuIdLong": 10, "applicationDetailsId": "5b2c9e8e64de27df6eda3526", "companyId": 6958, "menuName": "Quote Overview Support", "menuLink": "-1", "menuProcessLink": "-1", "toolTip": "View support data", "parentMenuId": "" }], "homePagePresent": false }]
        for (let applicationObj of completeApplicationListObj) {
          if (applicationObj.applicationName == "Commercial Insurance") {
            for (let menuListArr of applicationObj.menuList) {
              var menuNameAndTooltipObj = { menuName: "", tooltip: "", applicationPath: "" };
              menuNameAndTooltipObj.menuName = menuListArr.menuName;
              menuNameAndTooltipObj.tooltip = menuListArr.toolTip;
              if (menuNameAndTooltipObj.menuName == "Create Quote") {
                menuNameAndTooltipObj.applicationPath = "createQuoteClassification";
                this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
              }
              else if (menuNameAndTooltipObj.menuName == "Quote Overview") {
                menuNameAndTooltipObj.applicationPath = "quoteOverview";
                this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
              }
              else if (menuNameAndTooltipObj.menuName == "Update Agent Profile") {
                menuNameAndTooltipObj.applicationPath = "agentConfiguration";
                this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
              }
              else if (menuNameAndTooltipObj.menuName == "Dashboard") {
                menuNameAndTooltipObj.applicationPath = "dashboard";
                this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
              }
              else if (menuNameAndTooltipObj.menuName == "Quote Overview Support") {
                menuNameAndTooltipObj.applicationPath = "quoteOverviewSupport";
                this.menuNameAndTooltipList.push(menuNameAndTooltipObj);
              }
              menuNameAndTooltipObj = { menuName: "", tooltip: "", applicationPath: "" };
            }
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  addTab(tabName, templateName, defaultData, isCloseable = true, classInstanceNme = "BinData") {
    let templateToBeLoaded = this.getTemplateToBeLoaded(templateName);
    let binDataId = "";
    let newTabName = tabName;
    if (defaultData != undefined) {
      binDataId = defaultData.binDataId;
      newTabName = defaultData.description;
    }
    //this.tabsComponent.openTab(newTabName, templateToBeLoaded, defaultData, isCloseable, binDataId + "_" + templateToBeLoaded);
    //this.messageServiceDS.changeMessage(defaultData);
    //this.tabDetails = defaultData;
    if (!isEmpty(defaultData)) {
      if (classInstanceNme == "BinData") {
        this.binDataHdr = this.getInstanceOfBinDataHeader(defaultData);
      }
    }
  }

  getTemplateToBeLoaded(templateName) {

  }

  getTabDetails() {
    //return this.tabsComponent.getTabDetails();
  }

  logOut() {
    // debugger;
    $("#logoutHomePage").click();
    setTimeout(() => {
      this.cancelBtn.nativeElement.focus();
    }, 500);
    return false;
  }

  onClickOfLogoutBtn() {
    // debugger;
    this.mdLoginDS.logout().pipe(first()).subscribe(
      data => {
        this.router.navigate([''], { skipLocationChange: true });
        this.mDMondService.showSuccessMessage("Logged Out successfully")
      });
  }

  onClickOfCancelBtn() {
    return false;
  }

  getInstanceOfBinDataHeader(binData) {

  }

  getLoginUserProfile() {
    let formVariables = {};
    if (this.mdCommonGetterAndSetter.isB2CFl) {
      formVariables['originationChannel'] = "B2C"
    }
    this.mdCommonGetterAndSetter.supportContactNumber = "9783955022"
    this.mdCommonGetterAndSetter.supportEmail = "support@tarmika.com"
    this.mDMondService.getFormDataFromMondService("Quote Services", "CheckLoginUserProfile", JSON.stringify(formVariables), "").subscribe(
      data => {
        let responseData = JSON.parse(Base64.decode(data.value));
        this.mdCommonGetterAndSetter.userProfile = responseData;
        if (responseData.agencySupportPhoneNumber) {
          this.mdCommonGetterAndSetter.supportContactNumber = responseData.agencySupportPhoneNumber;
        }
        if (responseData.agencySupportEmail) {
          this.mdCommonGetterAndSetter.supportEmail = responseData.agencySupportEmail;
        }
        this.mdCommonGetterAndSetter.setagencyIdentifier(responseData.agent_agencyIdentifier);
        this.mdCommonGetterAndSetter.setagentIdentifier(responseData.agent_identifier);
        this.mdCommonGetterAndSetter.setInsurerAccessInfo(responseData.agent_insurerAccessInfo);
        this.mdCommonGetterAndSetter.setagencyName(responseData.agency_organization_name);
        this.mdCommonGetterAndSetter.setAgentRole(responseData.agent_role);
        // console.log("First Name " + responseData.agent_person_firstName);
        // console.log("Last Name " + responseData.agent_person_lastName);
        // console.log("Full Name " + responseData.agent_person_firstName + " " + responseData.agent_person_lastName);
        // console.log("Agent Role " + responseData.agent_role);
        this.mdCommonGetterAndSetter.setUserName(responseData.agent_person_firstName + " " + responseData.agent_person_lastName);
        if (!this.isB2CFl) {
          this.router.navigate(['/home/userHome'], { skipLocationChange: true });
        }
      },
      error => {

      });
  }

  reactivateSession() {
    $(".close").click();
    // console.log("%c SESSION IS BEING REACTIVATED FROM FUNCTION.","background: orange; color: white; font-size: 14px;");
    this.mdCommonGetterAndSetter.isReactiveFl = true;
    this.mdSessionDS.isSessionValid().pipe(first()).subscribe(
      data => {
        // console.log(data);
      },
      error => {
        this.mdSessionDS.MDError(error)
      });
  }

  ngOnDestroy() {
    clearInterval(this.autoReactivatingInterval)
    clearInterval(this.sessionCheckInterval)
  }

  onClickOfBack() {
    debugger;
    this.router.navigate([this.mdCommonGetterAndSetter.getPreviousURL()], { skipLocationChange: true });
    // this.router.navigate([ this.previousUrl], { skipLocationChange: true });
  }

}
