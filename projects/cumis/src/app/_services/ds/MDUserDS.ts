import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDUserDS extends MDBaseDS {
    getListOfActiveUsers(userGroupCd: Number): Observable<any> {
        let param={userGroupCd:userGroupCd};
        return this.invokeGET("/mondrestws/services/user/getListOfActiveUsers", param);
    }
    getUserProfile(): Observable<any>{
        return this.invokeGET("/mondrestws/services/user/getUserProfile", null);
    }
    getListOfUsersPopulateWithId(userGroupCd: Number): Observable<any> {
        let param={userGroupCd:userGroupCd};
        return this.invokeGET("/mondrestws/services/user/getListOfUsersPopulateWithId", param);
    }


    sendNewOTP(trimEmailAddressValue: any,loginURLEnc:any): Observable<any> {
        let dataToSend = 'emailAddressEnc=' + trimEmailAddressValue + '&loginURLEnc='+ loginURLEnc;
        return this.invokePOST("/mondrestws/services/user/sendNewOTP", dataToSend);
    }

    validateOTP(em: any,validateOtpEncodedValue:any): Observable<any> {
        let dataToSend = 'emailAddressEnc=' + em + '&otpTokenEnc='+ validateOtpEncodedValue;
        return this.invokePOST("/mondrestws/services/user/validateOTP", dataToSend);
    }

    saveUserDetails(email: any,otp:any,encodedconformNewPassword:any): Observable<any> {
        let dataToSend = 'emailAddressEnc=' + email + '&otpTokenEnc='+ otp + "&pwdEnc=" + encodedconformNewPassword;
        return this.invokePOST("/mondrestws/services/user/saveUserDetails", dataToSend);
    }

}