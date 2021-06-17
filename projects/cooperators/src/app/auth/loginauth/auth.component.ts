import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MDLoginDS, MDLoginAuth, MDApplicationDetailsDS, MDMondServiceDS, MDSessionDS } from '../../_services/ds';
import { AlertService, MDCommonGetterSetter } from '../../_services/common';
import { HomeComponent } from '../../home/home.component';
import { ToastrService } from 'ngx-toastr';
import { MDCountdownTimer } from '../../_services/utils';
import { Base64 } from 'js-base64';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent extends HomeComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    message: any;
    userName: any;
    subparm: any;
    passwordchanged: any;
    decodePasswordChangedvalue: any;
    public decodedUsername: string;
    public encodedUsername: string;
    public companyIdentifier: string;
    public businessCategoryCode: string;
    public businessCategory: any;
    public getBusinessData: any;
    public suffixKey: string;
    public secretKey: string;
    public successfulLogin: string;

    private subject = new Subject<any>();
    public authType: any;
    constructor(
        private loginFormBuilder: FormBuilder,
        private route: ActivatedRoute,
        private loginRouter: Router,
        private loginMdDS: MDLoginDS,
        private mdLoginAuth: MDLoginAuth,
        private mdCommonGetterSetter: MDCommonGetterSetter,
        private loginMdApplicationDetailDS: MDApplicationDetailsDS,
        private mdMondService: MDMondServiceDS,
        private toasterService: ToastrService,
        private countdownTimer: MDCountdownTimer,
        private sessionDS: MDSessionDS

    ) {
        super(loginFormBuilder, loginMdDS, loginMdApplicationDetailDS, loginRouter, mdCommonGetterSetter, mdMondService, toasterService, countdownTimer, sessionDS
        )
    }

    // Decrypt Logic
    private decrypt = salt => {
        let textToChars = text => text.split('').map(c => c.charCodeAt(0))
        let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('')
    }

    ngOnInit() {
        console.log('Welcome to the Cumin Login Page');
        this.subparm = this.route
            .queryParams
            .subscribe(params => {
                this.passwordchanged = params['p'];
                if (this.passwordchanged) {
                    this.decodePasswordChangedvalue = Base64.decode(this.passwordchanged);
                }
            });
        if (this.decodePasswordChangedvalue == "passwordChanged") {
            // alertify.success('Success notification message.');
            this.toasterService.success('New password saved successfully', "Success", {
                timeOut: 3000
            })
        }
        this.loginForm = this.loginFormBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // Accessing the page url to acquire query params
        let url = new URL(window.location.href);
        // If White-labelling takes place, then following logic
        if (url.searchParams.get('un') && url.searchParams.get('ky') && url.searchParams.get('companyIdentifier')) {
            let newDate = new Date();
            // Set key prefix
            let keyPrefix = newDate.getUTCFullYear().toString() + newDate.getUTCMonth().toString();
            this.route.queryParams.subscribe(params => {
                let data = JSON.parse(Base64.decode(params.un));

                this.encodedUsername = data.token;
                this.mdCommonGetterSetter.lob = data.lob;
                this.suffixKey = Base64.decode(params.ky);
                this.secretKey = keyPrefix + this.suffixKey;
                this.companyIdentifier = params.companyIdentifier;
                this.authType = data.authType;


                // Decrypting using secret key and eun
                this.decodedUsername = this.decrypt(this.secretKey)(this.encodedUsername);

                // Appending data before logging in user
                let dataToSend = 'eun=' + encodeURIComponent(this.decodedUsername) + '&companyIdentifier=' + this.companyIdentifier;
                // Logging in user
                this.mdLoginAuth.login(dataToSend).pipe(first()).subscribe(
                    data => {
                        debugger;
                        // console.log('Login Data: ', data);
                        this.successfulLogin = data.value;
                        // console.log('Login Data Value', this.successfulLogin);
                        // If login is this.successful, authenticate
                        this.loginMdDS.auth('').pipe(first()).subscribe(
                            data => {
                                this.setAuthorizationInfo(data);
                                if (this.companyIdentifier != data.companyIdentifier) {
                                    this.toasterService.error("Please change the company to Cooperators", "Error", {
                                        disableTimeOut: true
                                    });
                                    // this.loginRouter.navigate(['/home/userHome']);
                                    this.loading = false;
                                    this.loginRouter.navigate([''], { skipLocationChange: true });
                                }
                                //this.getUserProfileDetails();
                            },
                            error => {
                                console.log('loginMdDS Auth Error: ', error);
                            }
                        )
                    },
                    error => {
                        console.log('mdLoginAuth Error: ', error);
                        // this.loginRouter.navigate(['/home/createQuoteBOP']);
                        this.loading = false;
                    });

            });
        }
    }
    // convenience getter for easy access to form fields
    get accessFormFields() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        debugger;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        var date = new Date();
        date.getTimezoneOffset();
        var bOffset = date.getTimezoneOffset();
        this.mdCommonGetterSetter.setLoginEmailAddress(this.accessFormFields.username.value);
        var dataToSend = 'userName=' + this.accessFormFields.username.value + '&password=' + Base64.encode(this.accessFormFields.password.value) + '&bOffset=' + bOffset + '&tfaAuthCode=' + "" + '&module=mondis' + '&enc=true';
        this.loginMdDS.login(dataToSend).pipe(first()).subscribe(
            data => {
                this.loginMdDS.auth('').pipe(first()).subscribe(
                    data => {
                        if (data.companyIdentifier != "24000") {
                            this.toasterService.error("Please change the company to Cooperators", "Error", {
                                disableTimeOut: true
                            });
                            this.loginRouter.navigate([''], { skipLocationChange: true });
                            return;
                        }

                        this.loginRouter.navigate(['/home'], { skipLocationChange: true });
                    },
                    error => {
                        console.log('loginMdDS Auth Error: ', error);                        
                    }
                )
            },
            error => {
                debugger;
                this.toasterService.error("Authentication Failed", "Error", {
                    disableTimeOut: true
                });
                this.loading = false;
            });
    }

    getUserProfileDetails() {
        let formVariables = {};
        if (this.mdCommonGetterSetter.isB2CFl) {
            formVariables['originationChannel'] = "B2C"
        }
        this.mdCommonGetterSetter.supportContactNumber = "9783955022"
        this.mdCommonGetterSetter.supportEmail = "support@tarmika.com"
        this.mdMondService.getFormDataFromMondService("Quote Services", "CheckLoginUserProfile", JSON.stringify(formVariables), "").subscribe(
            data => {
                console.log("Sucess Data In getUserProfileDetails");
                let responseData = JSON.parse(Base64.decode(data.value));
                // console.log("responseData CheckLoginUserProfile" + JSON.stringify(responseData));
                if (responseData.agencySupportPhoneNumber) {
                    this.mdCommonGetterSetter.supportContactNumber = responseData.agencySupportPhoneNumber;
                }
                if (responseData.agencySupportEmail) {
                    this.mdCommonGetterSetter.supportEmail = responseData.agencySupportEmail;
                };
                this.mdCommonGetterSetter.setagencyIdentifier(responseData.agent_agencyIdentifier);
                this.mdCommonGetterSetter.setagentIdentifier(responseData.agent_identifier);
                this.mdCommonGetterSetter.setInsurerAccessInfo(responseData.agent_insurerAccessInfo);
                // console.log("First Name " + responseData.agent_person_firstName);
                // console.log("Last Name " + responseData.agent_person_lastName);
                // console.log("Full Name " + responseData.agent_person_firstName + " " + responseData.agent_person_lastName);
                this.mdCommonGetterSetter.setUserName(responseData.agent_person_firstName + " " + responseData.agent_person_lastName);
                const LOBPath = '/home/createQuote' + this.mdCommonGetterSetter.lob;
                // Navigating to create BOP page
                this.loginRouter.navigate([LOBPath], { skipLocationChange: true });
            },
            error => {
                //   debugger;
                //   let data = "eyJhZ2VuY3lfaW5zdXJlckFjY2Vzc0luZm8iOlt7InBhc3N3b3JkIjoiV0NBblRkaXlaam1JK0FKNHdTaWxWcU13UVp4dWdnaWwvV2RUdFI2OFIwS2s0SXNmQlI2OWtIZVZuK3A2S0tNNXZOZXNKY1NhZk5YZ1xuTElISWg3WHgrNWkzOVVKZTVYN251WCtTVyt3OHp2eDNPTjFERE9LVXlSdVVqRzRVWDdrbVM2MlltZWpmdU43ZWNRRktaRnkrK0E9PSIsImluc3VyZXJTaG9ydE5hbWUiOiJBcmJlbGxhIiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDE1IiwiaW5zdXJlckFzc2lnbmVkSWRlbnRpZmllciI6IjQ1MjEwMzY1NCIsImluc3VyZXJOYW1lIjoiQXJiZWxsYSBJbnN1cmFuY2UiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IldDQW5UZGl5WmptSStBSjR3U2lsVnFNd1FaeHVnZ2lsL1dkVHRSNjhSMEtrNElzZkJSNjlrSGVWbitwNktLTTV2TmVzSmNTYWZOWGdcbkxJSEloN1h4KzVpMzlVSmU1WDdudVgrU1crdzh6dngzT04xRERPS1V5UnVVakc0VVg3a21TNjJZbWVqZnVON2VjUUZLWkZ5KytBPT0iLCJpZGVudGlmaWVyU3RyaW5nIjoiMjA4NjEgLSBUQU5OQSBJTlNVUkFOQ0UiLCJpbnN1cmVyU2hvcnROYW1lIjoiTkQiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMTYiLCJpbnN1cmVyQXNzaWduZWRJZGVudGlmaWVyIjoiMjA4NjEiLCJpbnN1cmVyTmFtZSI6Ik5vcmZvbGsgJmFtcDsgRGVkaGFtIEluc3VyYW5jZSIsImluc3VyZXJBY2Nlc3NFbmFibGVkRmxhZyI6InRydWUifSx7InBhc3N3b3JkIjoiV0NBblRkaXlaam1JK0FKNHdTaWxWcU13UVp4dWdnaWwvV2RUdFI2OFIwS2s0SXNmQlI2OWtIZVZuK3A2S0tNNXZOZXNKY1NhZk5YZ1xuTElISWg3WHgrNWkzOVVKZTVYN251WCtTVyt3OHp2eDNPTjFERE9LVXlSdVVqRzRVWDdrbVM2MlltZWpmdU43ZWNRRktaRnkrK0E9PSIsImlkZW50aWZpZXJTdHJpbmciOiIzMjA2OTk5IC0gVEFOTkEgSU5TVVJBTkNFIElOQyAtIEJVUkxJTkdUT04sIE1BIiwiaW5zdXJlclNob3J0TmFtZSI6Ikhhbm92ZXIiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMTciLCJpbnN1cmVyQXNzaWduZWRJZGVudGlmaWVyIjoiMzIwNjk5OSIsImluc3VyZXJOYW1lIjoiSGFub3ZlciBJbnN1cmFuY2UiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IkF0N2tEVEdpd1I1WHJOa1NVaVJaM1cyZDAvQlo3L1Zld1U0SzFDWW1ZR1U9IiwiaWRlbnRpZmllclN0cmluZyI6IjQ2ODk5MDUiLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6IkxpYmVydHlNdXR1YWwiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMjMiLCJpbnN1cmVyQXNzaWduZWRJZGVudGlmaWVyIjoiNDY4OTkwNSIsInVzZXJOYW1lIjoiVGFubmFJbnN1cmFuY2UxIiwiaW5zdXJlck5hbWUiOiJMaWJlcnR5IE11dHVhbCBJbnN1cmFuY2UiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IjZYSFBrdWRHdzV0NE01TUdld1ZkR21sWmlYUngyTTE3cWZFVjFIUVp5Ymc9IiwiaW5zdXJlckFjY2Vzc1Byb2ZpbGVTdGF0dXMiOiJjb21wbGV0ZSIsImluc3VyZXJTaG9ydE5hbWUiOiJDTkEiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMjUiLCJ1c2VyTmFtZSI6IlRBUk1JS0EiLCJpbnN1cmVyTmFtZSI6IkNOQSBGaW5hbmNpYWwgQ29ycG9yYXRpb24iLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6InVLRXN3Nzg3K2ZEZGtIZ24xaTROSUE9PSIsImluc3VyZXJBY2Nlc3NQcm9maWxlU3RhdHVzIjoiY29tcGxldGUiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMjYiLCJpbnN1cmVyQXNzaWduZWRJZGVudGlmaWVyIjoiVGFubmEtMSIsInVzZXJOYW1lIjoiVGFubmExIiwiaW5zdXJlck5hbWUiOiJUaGUgQW5kb3ZlciBDb21wYW5pZXMiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IllzdXJXM0lkRTdWaG0vY095MmhqZGowVVo2NHVnMktYUG9MM3JWaUE0aVZ1Q1ZkQzdSYUI5SnN6WC80UEgrazkiLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6IkNodWJiIiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDI3IiwidXNlck5hbWUiOiI4ODFlYWVjOS02MTRjLTQ1YzMtYjljYi1jYWRmMmU1NTRiNzkiLCJpbnN1cmVyTmFtZSI6IkNodWJiIExpbWl0ZWQiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn1dLCJhZ2VudEZsYWciOiJ0cnVlIiwiYWdlbnRfcGVyc29uX2ZpcnN0TmFtZSI6IkFiaGlsYXNoIiwiYWdlbnRfcGVyc29uX2FkZHJlc3NfYWRkcmVzc1RleHQiOiJvbiIsIm5leHRBY3Rpb24iOiJub2FjdGlvbiIsImFnZW50X2luc3VyZXJBY2Nlc3NJbmZvIjpbeyJwYXNzd29yZCI6IjlieElBYlJxdnF5SHg1N0Zia3dRVGc9PSIsImluc3VyZXJBY2Nlc3NQcm9maWxlU3RhdHVzIjoiY29tcGxldGUiLCJpbnN1cmVyU2hvcnROYW1lIjoiQWN1aXR5IiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDMwIiwiaW5zdXJlck5hbWUiOiJBY3VpdHkgSW5zdXJhbmNlIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9LHsicGFzc3dvcmQiOiI5YnhJQWJScXZxeUh4NTdGYmt3UVRnPT0iLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6IkFyYmVsbGEiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMTUiLCJpbnN1cmVyTmFtZSI6IkFyYmVsbGEgSW5zdXJhbmNlIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9LHsicGFzc3dvcmQiOiI5YnhJQWJScXZxeUh4NTdGYmt3UVRnPT0iLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6IkNodWJiIiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDI3IiwiaW5zdXJlck5hbWUiOiJDaHViYiBMaW1pdGVkIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9LHsicGFzc3dvcmQiOiI5YnhJQWJScXZxeUh4NTdGYmt3UVRnPT0iLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6IkNOQSIsImluc3VyZXJJZGVudGlmaWVyIjoiMDAwMDAyNSIsImluc3VyZXJOYW1lIjoiQ05BIEZpbmFuY2lhbCBDb3Jwb3JhdGlvbiIsImluc3VyZXJBY2Nlc3NFbmFibGVkRmxhZyI6InRydWUifSx7InBhc3N3b3JkIjoiOWJ4SUFiUnF2cXlIeDU3RmJrd1FUZz09IiwiaW5zdXJlckFjY2Vzc1Byb2ZpbGVTdGF0dXMiOiJjb21wbGV0ZSIsImluc3VyZXJTaG9ydE5hbWUiOiJMaWJlcnR5TXV0dWFsIiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDIzIiwiaW5zdXJlck5hbWUiOiJMaWJlcnR5IE11dHVhbCBJbnN1cmFuY2UiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IjlieElBYlJxdnF5SHg1N0Zia3dRVGc9PSIsImluc3VyZXJBY2Nlc3NQcm9maWxlU3RhdHVzIjoiY29tcGxldGUiLCJpbnN1cmVyU2hvcnROYW1lIjoiQW5kb3ZlciIsImluc3VyZXJJZGVudGlmaWVyIjoiMDAwMDAyOCIsImluc3VyZXJOYW1lIjoiVGhlIEFuZG92ZXIgQ29tcGFuaWVzIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9LHsicGFzc3dvcmQiOiI5YnhJQWJScXZxeUh4NTdGYmt3UVRnPT0iLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6Ikhhbm92ZXIiLCJpbnN1cmVySWRlbnRpZmllciI6IjAwMDAwMTciLCJpbnN1cmVyTmFtZSI6Ikhhbm92ZXIgSW5zdXJhbmNlIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9LHsicGFzc3dvcmQiOiI5YnhJQWJScXZxeUh4NTdGYmt3UVRnPT0iLCJpbnN1cmVyQWNjZXNzUHJvZmlsZVN0YXR1cyI6ImNvbXBsZXRlIiwiaW5zdXJlclNob3J0TmFtZSI6Ik5EIiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDE2IiwiaW5zdXJlck5hbWUiOiJOb3Jmb2xrICZhbXA7IERlZGhhbSBJbnN1cmFuY2UiLCJpbnN1cmVyQWNjZXNzRW5hYmxlZEZsYWciOiJ0cnVlIn0seyJwYXNzd29yZCI6IjlieElBYlJxdnF5SHg1N0Zia3dRVGc9PSIsImluc3VyZXJBY2Nlc3NQcm9maWxlU3RhdHVzIjoiY29tcGxldGUiLCJpbnN1cmVyU2hvcnROYW1lIjoiUXVpbmN5IiwiaW5zdXJlcklkZW50aWZpZXIiOiIwMDAwMDMxIiwiaW5zdXJlck5hbWUiOiJRdWluY3kgTXV0dWFsIEdyb3VwIiwiaW5zdXJlckFjY2Vzc0VuYWJsZWRGbGFnIjoidHJ1ZSJ9XSwiYWdlbmN5X29yZ2FuaXphdGlvbl93ZWJzaXRlVVJMIjoid3d3LnRhbm5haW5zdXJhbmNlLmNvbSIsImFnZW5jeV9hZ2VuY3lUeXBlIjoiT3JnYW5pemF0aW9uIiwiYWdlbmN5X2lkZW50aWZpZXIiOiIwMDAwMDAyIiwiYWdlbmN5X29yZ2FuaXphdGlvbl9uYW1lIjoiVGFubmEgSW5zdXJhbmNlIEluYy4iLCJhZ2VuY3lfb3JnYW5pemF0aW9uX2xvZ29VUkwiOiJodHRwczovL3Rhcm1pa2FpbWFnZXMuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vYWdlbmN5L3Rhbm5hX2luc3VyYW5jZS5wbmciLCJhZ2VudF9wZXJzb25fcGhvbmVOdW1iZXIiOiIxMjIzNDM0MjMyIiwiYWdlbmN5X29yZ2FuaXphdGlvbl90eXBlT2ZFbnRpdHkiOiJMTEMiLCJhZ2VudF9wZXJzb25fdGl0bGUiOiJNciIsImFnZW50X3Byb2ZpbGVTdGF0dXMiOiJjb21wbGV0ZSIsImFnZW50X2FnZW5jeUlkZW50aWZpZXIiOiIwMDAwMDAyIiwiYWdlbnRfaWRlbnRpZmllciI6IjAwMDAwNTEiLCJhZ2VudF9wZXJzb25fbGFzdE5hbWUiOiJOIiwiYWdlbnRfcHJvZmlsZUNoZWNrUmVxdWlyZWRGbGFnIjoidHJ1ZSIsImFnZW5jeV9vcmdhbml6YXRpb25fbWFpbGluZ0FkZHJlc3NfYWRkcmVzc19hZGRyZXNzVGV4dCI6IjMwMCBUcmFkZWNlbnRlciBEcml2ZSwgV29idXJuLCBNQSwgVVNBIiwiYWdlbnRfbW9uZFVzZXJJRCI6ImFiaGlsYXNoLm5AbW9uZGNsb3VkLmNvbSIsImFnZW50X3JvbGUiOiJhZ2VuY2llc2FkbWluaXN0cmF0b3IiLCJhZ2VuY3lfb3JnYW5pemF0aW9uX3Bob25lTnVtYmVyIjoiNzgxMzY1MTM2MiIsImFnZW5jeV9vcmdhbml6YXRpb25fbG9jYXRpb25BZGRyZXNzX2FkZHJlc3NUZXh0IjoiMzAwIFRyYWRlY2VudGVyIERyaXZlLCBXb2J1cm4sIE1BLCBVU0EiLCJhZ2VudF9wZXJzb25fZW1haWxBZGRyZXNzIjoiYWJoaWxhc2gubkBtb25kY2xvdWQuY29tIn0"
                //   let responseData = JSON.parse(Base64.decode(data));
                //   console.log("responseData CheckLoginUserProfile"+ JSON.stringify(responseData));
                //   this.mdCommonGetterSetter.setagencyIdentifier(responseData.agent_agencyIdentifier);
                //   this.mdCommonGetterSetter.setagentIdentifier(responseData.agent_identifier);
                //   this.mdCommonGetterSetter.setInsurerAccessInfo(responseData.agent_insurerAccessInfo);
                //   console.log("First Name "+ responseData.agent_person_firstName);
                //   console.log("Last Name "+responseData.agent_person_lastName);
                //   console.log("Full Name "+ responseData.agent_person_firstName + " "+ responseData.agent_person_lastName);
                //   this.mdCommonGetterSetter.setUserName(responseData.agent_person_firstName + " "+ responseData.agent_person_lastName);
            });
    }

    onClickOfForgotPassword() {
        this.userName = btoa(this.accessFormFields.username.value);
        this.loginRouter.navigate(['/forgotPassword'], { queryParams: { un: this.userName }, skipLocationChange: true });
    }

}