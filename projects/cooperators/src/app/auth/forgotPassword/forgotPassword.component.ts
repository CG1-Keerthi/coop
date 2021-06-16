import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MDUserDS, MDMondServiceDS } from '../../_services/ds'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base64 } from 'js-base64';


@Component({
  selector: 'app-forgotpassword-designer',
  templateUrl: './forgotPassword.html'

})

export class ForgotPasswordComponent implements OnInit {

  @ViewChild('emailAdress') el: ElementRef;
  @ViewChild('emailEnterMsg') emailMessage: ElementRef;
  @ViewChild('emailFailedMsg') emailFailedMsg: ElementRef;

  registerForm: FormGroup;
  submitted = false;

  loginURLEnc: any;
  emailAddressValue: any;
  trimEmailAddressValue: any;
  sub: any;
  username: any;
  decodedUserName: any;
  sendNewOtpdata: any;


  constructor(private router: Router, private MDUserDS: MDUserDS, private mdMondService: MDMondServiceDS, private formBuilder: FormBuilder,
    private route: ActivatedRoute) { 
      // this.route.queryParams.subscribe(params => {
      //   if (params.un) {
      //     this.el.nativeElement.value = Base64.decode(params.q.trim());  
      //   }       
      // });
    }

  ngOnInit() {
debugger; 
      this.registerForm = this.formBuilder.group({            
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.username = params['un'];
        this.decodedUserName = Base64.decode(this.username);
   this.registerForm.get("email").setValue( this.decodedUserName)
      });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }   
}

  emailSubmit() {
    
    this.loginURLEnc = Base64.encode(window.location.origin + window.location.pathname);

    this.emailAddressValue = this.el.nativeElement.value;

    if (this.emailAddressValue == undefined || this.emailAddressValue == "" || this.emailAddressValue.length <= 0) {
      this.el.nativeElement.style.borderColor = "#E34234";
      this.emailMessage.nativeElement.style.display = 'block';
      return;
    }


    this.trimEmailAddressValue = Base64.encode(this.emailAddressValue.replace(/ +/g, ""));
    this.emailAddressValue = this.trimEmailAddressValue;

    if (this.trimEmailAddressValue.length <= 0) {
      this.el.nativeElement.style.borderColor = "#E34234";
      this.emailMessage.nativeElement.style.display = 'block';
      return;
    }
    // let emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

    

    // if (!emailFilter.test(this.trimEmailAddressValue)) {
    //   debugger;
    //   this.emailMessage.nativeElement.innerHTML = "!Please enter valid email";
    //   this.emailMessage.nativeElement.style.display = "inline";
    // }


    this.MDUserDS.sendNewOTP(this.trimEmailAddressValue, this.loginURLEnc).pipe(first()).subscribe(
      data => {
        this.sendNewOtpdata = data;
        this.router.navigate(['/mondValidateOtp'], { queryParams: { em: this.trimEmailAddressValue },skipLocationChange:true });
      },
      error => {

        this.mdMondService.MDError(error);
        this.emailFailedMsg.nativeElement.style.display = 'block';
       
        // this.router.navigate(['/mondValidateOtp'], { queryParams: { em: this.trimEmailAddressValue}});

      });


  }


}





