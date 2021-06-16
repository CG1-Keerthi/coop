import { Injectable } from '@angular/core';
import $ from 'jquery';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MDLoginDS } from '../ds/MDLoginDS';
import { MDCommonGetterSetter } from '../common/MDCommonGetterSetter';

@Injectable({ providedIn: 'root' })
export class MDCountdownTimer {

    public timeoutSession: number = 0;
    public validateLastSessionNumber: number = 0;
    public isTimerReset: boolean = false;
    public intervalId;

    constructor(private router: Router, private mdLoginDS: MDLoginDS, private mdCommonGetterAndSetter: MDCommonGetterSetter, ) { }

    setSessionTimeout(timeout) {
        this.timeoutSession = timeout;
    }

    getTimeout() {
        return this.timeoutSession;
    }

    setValidationSession(timeout) {
        this.validateLastSessionNumber = timeout;
        // console.log("Extended last session");
    }

    getValidationSession() {
        return this.validateLastSessionNumber;
    }

    // startSessionInterval() {
    //     console.log(this.intervalId);
    //     this.intervalId = setInterval(() => {
    //         console.log("Interval time!");
    //     }, 2000);
    // }

    // clearSessionInterval() {
    //     console.log(this.intervalId);
    //     if (this.intervalId) {
    //         clearInterval(this.intervalId);
    //         console.log("Cleared session interval!");
    //     } else {
    //         console.log("No interval going on.");
    //     }
    //     this.intervalId = null;
    // }

    getSessionExpiryNotification() {

        // console.log("THIS IS THE TIMEOUT SESSION: ", this.getTimeout());
        // console.log("THIS IS THE LAST SESSION: ", this.getValidationSession());

        let sessionTimeoutInMins = this.getTimeout() / 60;

        let currentDateAndTime = new Date().getTime();
        let diffOfCurrentAndLastSessionValidatedTime = currentDateAndTime - this.getValidationSession();

        // console.log("DIFFERENCE OF CURRENT AND LAST SESSION VALIDATED TIME", diffOfCurrentAndLastSessionValidatedTime);

        // let minutes = Math.floor((diffOfCurrentAndLastSessionValidatedTime % (1000 * 60 * 60)) / (1000 * 60));
        let minutes = Math.ceil(diffOfCurrentAndLastSessionValidatedTime / (1000 * 60));
        // console.log("minutes ", minutes);

        let isSessionInfoVisible = $("#sessionTime_loading").is(":visible");

        let remainingSessionTimeInMins = sessionTimeoutInMins - minutes;
        // console.log("remainingSessionTimeInMins ", remainingSessionTimeInMins);

        if (!this.isTimerReset) {
            if (remainingSessionTimeInMins > 0 && remainingSessionTimeInMins <= 2 && isSessionInfoVisible === false) {
                $("#sessionTimeout_Btn").click();
                var remainingSessionTimeInSecs = remainingSessionTimeInMins * 60;
                $("#sessionTimeOutMessage").html("Your session will expire in <b>" + remainingSessionTimeInSecs + "</b> seconds due to inactivity. Please click on the below link to re-activate your session");
                this.timer();
            }
        }
        this.isTimerReset = false;
    };

    timer() {
        let counter = 120;
        // console.log("%c TIMER STARTED.","background: orange; color: white; font-size: 14px;");
        let intervalToken = setInterval(() => {
            counter = counter - 1;
            //console.log("counter ", counter);
            $("#sessionTimeOutMessage").html("Your session will expire in <b>" + counter + "</b> seconds due to inactivity. Please click on the below link to re-activate your session");
            if (this.mdCommonGetterAndSetter.isReactiveFl == true) {
                clearInterval(intervalToken);
                this.mdCommonGetterAndSetter.isReactiveFl = false;
            } else if (counter === 0) {
                $(".close").click();
                clearInterval(intervalToken);
                this.logOut();
            }
        }, 1000);
    }

    logOut() {
        // console.log("%c LOGOUT API CALLED FROM TIMER.","background: orange; color: white; font-size: 14px;");
        this.mdLoginDS.logout().pipe(first()).subscribe(
            data => {
                this.router.navigate([''], { skipLocationChange: true });
            });
    }
}