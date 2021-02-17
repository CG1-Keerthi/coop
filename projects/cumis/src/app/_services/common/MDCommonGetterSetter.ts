import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({ providedIn: 'root' })
export class MDCommonGetterSetter {
    classCode: any;
    classDescription: any;
    businessCategory: any;
    businessCategoryCode: any;
    public lob: string;
    isB2CFl: boolean = false
    supportEmail: string = 'ab@gmail.com'
    supportContactNumber: string = '7894561233'
    private csfrToken = new BehaviorSubject('default message');
    currentCSFRToken = this.csfrToken.asObservable();
    private loginUserEmail = new BehaviorSubject('default message');
    loginUserEmailAddress = this.loginUserEmail.asObservable();
    private agencyIdentifier = new BehaviorSubject('default message');
    agencyIdentifierData = this.agencyIdentifier.asObservable();
    private agentIdentifier = new BehaviorSubject('default message');
    agentIdentifierData = this.agentIdentifier.asObservable();
    private insurerAccessInfo = new BehaviorSubject('default message');
    insurerAccessInfoArray = this.insurerAccessInfo.asObservable();
    private agencyName = new BehaviorSubject('default message');
    agencyNameData = this.agencyName.asObservable();
    private userName = new BehaviorSubject('default message');
    userNameData = this.userName.asObservable();
    isReactiveFl: boolean = false;
    private agentRole = new BehaviorSubject('default message');
    agentRoleData = this.agentRole.asObservable();
    private lineOfBusiness = new BehaviorSubject({});
    lineOfBusinessData = this.lineOfBusiness.asObservable();
    public userProfile = '';
    private agencyOnboardingVal = new BehaviorSubject({});
    agencyOnboardingData = this.agencyOnboardingVal.asObservable();
    private previousURLArray = new BehaviorSubject([]);
    previousURLArrayData = this.previousURLArray.asObservable();
    private groupRequestIdentifier = new BehaviorSubject('default message');
    groupRequestIdentifiereData = this.groupRequestIdentifier.asObservable();

    constructor(private router: Router) {
        this.router.events.subscribe(data => {
            if (data['routerEvent'] && data['routerEvent']['url']) {
                if (data['routerEvent']['url'] != "/home" && data['routerEvent']['url'] != "/") {
                    const urlTree = this.router.parseUrl(data['routerEvent']['url']);
                    // console.log("urlTree", urlTree);
                    if(urlTree.root.children['primary']){
                    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
                    // console.log("urlWithoutParams", urlWithoutParams);
                    let urlArray = this.previousURLArray.getValue();
                    urlArray.push(urlWithoutParams)
                    this.previousURLArray.next(urlArray);
                    }
                }
            }
        })
        //             .pipe(filter(event => event instanceof NavigationEnd))
        //             .subscribe((event: NavigationEnd) => {
        //                 console.log('URL:', event);
        //                 console.log('URL:', event);
        //                 console.log('Router', this.router);
        //                 console.log("ActivatedRoute",this.activatedRoutes);
        //                 const urlTree = this.router.parseUrl(this.router.url);
        // const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
        // console.log("urlWithoutParams",urlWithoutParams);
        //                 if(event.url != "/home" && event.url != "/"){
        //                 let urlArray = this.previousURLArray.getValue();
        //                 urlArray.push(event.url)
        //                 this.previousURLArray.next(urlArray);
        //                 }
        //             });
    }

    setClassCode(classCode) {
        this.classCode = classCode;
    }

    getClassCode() {
        return this.classCode
    }

    setClassDescription(classDescription) {
        this.classDescription = classDescription;
    }

    getClassDescription() {
        return this.classDescription
    }

    setBusinessCategory(businessCategory) {
        this.businessCategory = businessCategory;
    }

    getBusinessCategory() {
        return this.businessCategory
    }

    setBusinessCategoryCode(businessCategoryCode) {
        this.businessCategoryCode = businessCategoryCode;
    }

    getBusinessCategoryCode() {
        return this.businessCategoryCode
    }

    setCsfrToken(csfrToken) {
        this.csfrToken.next(csfrToken)
    }

    getCsfrToken() {
        return this.csfrToken
    }

    loadHtmlFileContent(htmlPath) {
        let htmlRequest = new XMLHttpRequest;
        htmlRequest.open('GET', htmlPath, false);
        htmlRequest.send();
        return htmlRequest.responseText;
    }

    setLoginEmailAddress(email) {
        this.loginUserEmail.next(email)
    }

    getLoginEmailAddress() {
        return this.loginUserEmail
    }

    setagencyIdentifier(agency) {
        this.agencyIdentifier.next(agency)
    }

    getagencyIdentifier() {
        return this.agencyIdentifier
    }
    setagentIdentifier(agent) {
        this.agentIdentifier.next(agent)
    }

    getagentIdentifier() {
        return this.agentIdentifier;
    }
    setInsurerAccessInfo(accessInfo) {
        this.insurerAccessInfo.next(accessInfo)
    }

    getInsurerAccessInfo() {
        return this.insurerAccessInfo;
    }


    setagencyName(agencyname) {
        this.agencyName.next(agencyname)
    }

    getagencyName() {
        return this.agencyName;
    }

    setUserName(userName) {
        // console.log("Set userName in getterSetter "+ userName);        
        this.userName.next(userName)
    }

    getUserName() {
        // console.log("getuserName in getterSetter "+ this.userName);
        return this.userName;
    }

    setAgentRole(agentRole) {
        // console.log("Set agentRole in getterSetter "+ agentRole);        
        this.agentRole.next(agentRole)
    }


    getAgentRole() {
        // console.log("getAgent in getterSetter "+ this.agentRole);
        return this.agentRole;
    }

    setLineOfBusiness(lob) {
        // console.log("Set LineOfBusiness in getterSetter ", lob);        
        this.lineOfBusiness.next(lob)
    }

    getLineOfBusiness() {
        // console.log("LineOfBusiness in getterSetter ", this.lineOfBusiness);
        return this.lineOfBusiness;
    }

    setagencyOnboardingVal(agencyOnboardingVal) {
        this.agencyOnboardingVal.next(agencyOnboardingVal)
        // this.agencyOnboardingVal = agencyOnboardingVal;
    }
    getagencyOnboardingVal() {
        return this.agencyOnboardingVal;
    }

    setPreviousURL() {
        this.previousURLArray.next([])
    }

    getPreviousURL() {
        // return this.previousURLArray;
        let urlArray = this.previousURLArray.getValue();
        let urlToSend = ""
        urlArray = urlArray.filter((v, i, a) => a.indexOf(v) === i);
        if (urlArray.length == 1) {
            urlToSend = '/home/userHome';
        } else {
            urlToSend = urlArray[urlArray.length - 2];
            urlArray.splice(urlArray.length - 1, 1);
            this.previousURLArray.next(urlArray)
        }
        return urlToSend
    }

    setGroupRequestIdentifier(identifier) {
        this.groupRequestIdentifier.next(identifier);
    }

    getGroupRequestIdentifier() {
        return this.groupRequestIdentifier;
    }


}