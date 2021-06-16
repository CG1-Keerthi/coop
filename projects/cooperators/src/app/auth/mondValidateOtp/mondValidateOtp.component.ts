import { Component, Inject, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MDUserDS, MDMondServiceDS } from '../../_services/ds';
import { AlertService } from '../../_services/common/alert.service';
// import alertify from 'alertifyjs';
import { ToastrService } from 'ngx-toastr';
import { Base64 } from 'js-base64';



@Component({
  selector: 'app-mond-validateotp-designer',
  templateUrl: './mondValidateOtp.html'

})

export class MondValidateOtpComponent implements OnInit {

  @ViewChild('validateOtpNumber') validateOtpNumber: ElementRef;
  @ViewChild('validateEnterMsg') validateEnterMsg: ElementRef;


  otpValue: any;
  sub: any;
  em: any;
  validateOtpValue: any;
  validateOtpTrimValue: any;
  validateOtpEncodedValue: any;
  validateOtpdata: any;
  loginURLEnc: any;
  sendNewOtpdata: any;

  constructor(private router: Router, private route: ActivatedRoute, private MDUserDS: MDUserDS, private mdMondService: MDMondServiceDS,
    private alertService: AlertService, private toastrService:ToastrService) { }

  ngOnInit() {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.em = Base64.decode(params['em']);
      });
  }
  validateOtpSubmit() {
    this.em;
    this.validateOtpValue = this.validateOtpNumber.nativeElement.value;

    if (this.validateOtpValue == undefined || this.validateOtpValue == "" || this.validateOtpValue.length <= 0) {
      this.validateOtpNumber.nativeElement.style.borderColor = "#E34234";
      this.validateEnterMsg.nativeElement.style.display = 'block';
      return;
    }

    this.validateOtpTrimValue = this.validateOtpValue.replace(/ +/g, "");
    this.validateOtpValue = this.validateOtpTrimValue;

    if (this.validateOtpTrimValue.length <= 0) {
      this.validateOtpNumber.nativeElement.style.borderColor = "#E34234";
      this.validateEnterMsg.nativeElement.style.display = 'block';
      return;
    }

    this.validateOtpEncodedValue = Base64.encode(this.validateOtpTrimValue)

    this.MDUserDS.validateOTP(Base64.encode(this.em), this.validateOtpEncodedValue).pipe(first()).subscribe(
      data => {
        this.validateOtpdata = data;
        this.router.navigate(['/mondCreatePassword'], { queryParams: { em: this.em, o: this.validateOtpEncodedValue },skipLocationChange:true });
      },
      error => {

        this.mdMondService.MDError(error);
        this.validateEnterMsg.nativeElement.innerHTML = "! Invalid code. please check your code and try again.";

        // this.router.navigate(['/mondCreatePassword'], { queryParams: { em: this.em,  o: this.validateOtpEncodedValue } });
      });

  }

  resendEmailSubmit(validateotp) {
    debugger;
    this.loginURLEnc = Base64.encode(window.location.origin + window.location.pathname);
   this.MDUserDS.sendNewOTP( Base64.encode(this.em), this.loginURLEnc).pipe(first()).subscribe(
      data => {
        this.sendNewOtpdata = data;
        if (validateotp != "validateotp") {
          this.router.navigate(['/mondValidateOtp'],{skipLocationChange:true});
        }
        this.toastrService.success("OTP resent to your email. Please check your mail and enter the OTP", "Success", {
          timeOut:3000
        });
      },
      error => {
        debugger;
        this.mdMondService.MDError(error);
        // this.alertService.error("sg");
        // alertify.success('Success notification message.'); 

      });
  }


}





