import { Component, Inject, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MDUserDS, MDMondServiceDS } from '../../_services/ds';
import { Base64 } from 'js-base64';
declare var $: any;


@Component({
  selector: 'app-mond-createpassword-designer',
  templateUrl: './mondCreatePassword.html'

})

export class MondCreatePasswordComponent implements OnInit {

  @ViewChild('createNewPassword') createNewPassword: ElementRef;
  @ViewChild('conformNewPassword') conformNewPassword: ElementRef;
  @ViewChild('passwordenterMsg') passwordenterMsg: ElementRef;
  @ViewChild('passwordFaildMsg') passwordFaildMsg: ElementRef;
  @ViewChild('createPasswordFailedMsg') createPasswordFailedMsg: ElementRef;
  @ViewChild('createPassworderrorMsg') createPassworderrorMsg: ElementRef

  email: any;
  otp: any;
  sub: any;
  newPassword: any;
  conformPassword: any;
  newPasswordTrimValue: any;
  conformNewPasswordTrimValue: any;
  encodedNewPassword: any;
  encodedconformNewPassword: any;
  saveUserDetailsdata: any;
  Passwordagain: any;
  passwordChanged: any;

  constructor(private route: ActivatedRoute, private MDUserDS: MDUserDS, private mdMondService: MDMondServiceDS,
    private router: Router) { }

  ngOnInit() {
    this.passwordChanged = Base64.encode("passwordChanged")
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.email = params['em'];
        this.otp = params['o'];
      });
  }

  onkeyUpOfNewPassword() {
    debugger;
    this.newPassword = this.createNewPassword.nativeElement.value;
    this.Passwordagain = this.conformNewPassword.nativeElement.value;

    this.newPasswordTrimValue = this.newPassword.replace(/ +/g, "");
    this.conformNewPasswordTrimValue = this.Passwordagain.replace(/ +/g, "");

    this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
    this.passwordenterMsg.nativeElement.style.display = 'none';

    if (this.newPasswordTrimValue.length < 10) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordenterMsg.nativeElement.innerHTML = "!Passwords must be at least 10 characters";
      this.passwordenterMsg.nativeElement.style.display = "inline";
      return;
    } else {
      this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.passwordenterMsg.nativeElement.innerHTML = "";
    }

    if (this.newPasswordTrimValue != this.conformNewPasswordTrimValue) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.conformNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordFaildMsg.nativeElement.style.display = 'block';
      return;
    } else {
      this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.conformNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.passwordFaildMsg.nativeElement.style.display = 'none';
    }
  }

  onkeyUpOfPasswordAgain() {
    debugger;
    this.newPassword = this.createNewPassword.nativeElement.value;
    this.Passwordagain = this.conformNewPassword.nativeElement.value;

    this.newPasswordTrimValue = this.newPassword.replace(/ +/g, "");
    this.conformNewPasswordTrimValue = this.Passwordagain.replace(/ +/g, "");

    if (this.newPasswordTrimValue != this.conformNewPasswordTrimValue) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.conformNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordFaildMsg.nativeElement.style.display = 'block';
      return;
    } else {
      this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.conformNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.passwordFaildMsg.nativeElement.style.display = 'none';
    }
  }

  createPasswordSubmit() {
    this.email;
    this.otp;
    this.newPassword = this.createNewPassword.nativeElement.value;
    this.Passwordagain = this.conformNewPassword.nativeElement.value;

    if ((this.newPassword == undefined && this.conformNewPassword == undefined) || (this.newPassword == "" && this.Passwordagain == "")) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordenterMsg.nativeElement.style.display = 'block';
      return;
    }

    this.newPasswordTrimValue = this.newPassword.replace(/ +/g, "");
    this.conformNewPasswordTrimValue = this.Passwordagain.replace(/ +/g, "");

    if (this.newPasswordTrimValue.length <= 0 && this.conformNewPasswordTrimValue.length <= 0) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordenterMsg.nativeElement.style.display = 'block';
      return;

    }

    if (this.newPasswordTrimValue.length < 10) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordenterMsg.nativeElement.innerHTML = "!Passwords must be at least 10 characters";
      this.passwordenterMsg.nativeElement.style.display = "inline";
      return;
    } else {
      this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.passwordenterMsg.nativeElement.innerHTML = "";
      this.passwordenterMsg.nativeElement.style.display = "inline";
    }


    if (this.newPasswordTrimValue != this.conformNewPasswordTrimValue) {
      this.createNewPassword.nativeElement.style.borderColor = "#E34234";
      this.conformNewPassword.nativeElement.style.borderColor = "#E34234";
      this.passwordFaildMsg.nativeElement.style.display = 'block';
      return;
    }else{
      this.createNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.conformNewPassword.nativeElement.style.borderColor = "lightgrey";
      this.passwordFaildMsg.nativeElement.style.display = 'none';
    }

    this.encodedNewPassword = Base64.encode(this.newPasswordTrimValue);
    this.encodedconformNewPassword = Base64.encode(this.conformNewPasswordTrimValue)


    this.MDUserDS.saveUserDetails(Base64.encode(this.email), this.otp, this.encodedconformNewPassword).pipe(first()).subscribe(
      data => {

        this.saveUserDetailsdata = data;
        this.router.navigate([''], { queryParams: { p: this.passwordChanged }, skipLocationChange: true });
      },
      error => {

        this.mdMondService.MDError(error);
        // this.router.navigate(['/'], { queryParams: { p: this.passwordChanged } });
        this.createPasswordFailedMsg.nativeElement.style.display = 'block';
        this.createPassworderrorMsg.nativeElement.innerText = error.error.userMessage;
        $(".ym_footer").hide();
        $(".ym_footerv1").show();
      });


  }


}





