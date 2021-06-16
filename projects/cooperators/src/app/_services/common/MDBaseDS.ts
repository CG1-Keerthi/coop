import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';
import { AlertService } from '../common/alert.service';
import { ToastrService } from 'ngx-toastr';
import $ from 'jquery';
import { MDLoginDS } from '../ds/MDLoginDS';
import { Router } from '@angular/router';
import { MDCountdownTimer } from '../utils';

@Injectable({ providedIn: 'root' })
export class MDBaseDS {

  constructor(public http: HttpClient, public alertService: AlertService, private toastrService: ToastrService, private router: Router, private counterTimerService: MDCountdownTimer) { }
  invokeGET(url: string, params: any) {
    const options = params ? { params: params, headers: { 'Content-Type': 'application/json' } } : {};
    return this.http.get(url, options).pipe(map(data => {
      var d = new Date().getTime();
      this.counterTimerService.setValidationSession(d);
      this.counterTimerService.isTimerReset = true;
      return data;
    }));
  }
  invokePOST(url: string, params: any) {
    debugger;
    const options = params ? { params: params } : {};

    //this.http = new ɵHttpInterceptingHandler(, new Injector());
    return this.http.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } }).pipe(map(data => {
      var d = new Date().getTime();
      this.counterTimerService.setValidationSession(d);
      this.counterTimerService.isTimerReset = true;
      return data;
    }));
  }

  invokeGETClassCodes(url: string, params: any, auth: any) {
    const options = params ? { params: params, headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + auth } } : {};
    return this.http.get(url, options).pipe(map(data => {
      var d = new Date().getTime();
      this.counterTimerService.setValidationSession(d);
      this.counterTimerService.isTimerReset = true;
      return data;
    }));
  }

  MDError(param: any, customMessage = "") {
    let error = new HttpErrorResponse(param);
    if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // //  this.toastrService.error("Internal server error", "Error", {
    // //     disableTimeOut:true
    // //   });
    this.showMessage(error.status, error.error, customMessage);
    // )
  };

  showSuccessMessage(successMessage) {
    this.toastrService.success(successMessage)
  }

  showErrorMessage(errorMessage) {
    this.toastrService.error(errorMessage, "Error", {
      timeOut: 5000,
    });
  }

  showInfoMessage(infoMessage) {
    this.toastrService.info(infoMessage)
  }

  showMessage(status, response, customMessage) {
    // console.log("RESPONSE ", response);
    switch (status) {
      case 401:
        this.toastrService.success("In order to ensure security, you have been logged out by the system. Please relogin to the MOND application.");
        setTimeout(() => { this.logOut().subscribe((data) => this.router.navigate([''], { skipLocationChange: true })) }, 5000);
        break;
      case 400:
        var msg = "The action could not be performed. Please contact MOND Support";
         this.toastrService.error(msg);
        break;
      case 404:
        var msg = "The action could not be performed. Please contact MOND Support";
         this.toastrService.error(msg);
        break;
      case 500:
        var msg = "";
        if (response.userMessage) {
          msg = response.userMessage;
        } else if (response.errorMessage) {
          msg = response.errorMessage;
        } else if (response.statusText) {
          msg = response.statusText;
        } else {
          msg = "Internal Server Error";
        }
         this.toastrService.error(msg);
        break;
      case 501:
         this.toastrService.error("The server either does not recognize the request method, or it lacks the ability to fulfil the request");
        break;
      case 502:
         this.toastrService.error("BADGATEWAY,The server was acting as a gateway or proxy and received an invalid response from the upstream server.");
        break;
      case 503:
         this.toastrService.error("The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.");
        break;
      case 504:
         this.toastrService.error("The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.");
        break;
      case 505:
         this.toastrService.error("The server does not support the HTTP protocol version used in the request.");
        break;
      case 511:
         this.toastrService.error("Needs to authenticate to gain network access");
        break;
      default:
         this.toastrService.error("Internal Server Error");
        break
    }
  };

  logOut() {
    this.router.navigate([''], { skipLocationChange: true });
    this.toastrService.clear();
    return this.http.post(`/mondrestws/services/authenticate/logout`, "", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .pipe(map(data => {
        this.router.navigate([''], { skipLocationChange: true });
        this.toastrService.clear();
      }));
  }
}