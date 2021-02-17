import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';
import { map } from 'rxjs/internal/operators/map';
import { Base64 } from 'js-base64';

@Injectable({ providedIn: 'root' })
export class MDMondServiceDS extends MDBaseDS {

    public agencyInfoArray: BehaviorSubject<any> = new BehaviorSubject('default message');

    setAgencyInfoArray(agencyInfoArray) {
        // console.log('%c Agency Info Array has been set to:', "background: slateblue; color: white;", agencyInfoArray);
        this.agencyInfoArray.next(agencyInfoArray);
    }


    getFormDataFromMondService(projectName: String, serviceName: String, formVariables: String, csfrToken: String): Observable<any> {
        let param = { projectName: projectName, serviceName: serviceName, version: "1.00", formVariables: formVariables, addSessionInfoFlag: true, csfrToken: csfrToken};
        return this.invokeGET("/mondrestws/services/executeService/invokeMondProcessDesignerServiceGET", param);
    }

    getLatestNewsFromMondService(param): Observable<any> {
        return this.invokeGET("/mondrestws/services/otherUtil/getHelpText", param);
    }

    getBusinessClassCodes(URL: string, hitsPerPage: any, auth: string): Observable<any> {
        let param = { hitsPerPage: hitsPerPage };
        return this.invokeGETClassCodes(URL, param, auth);
    }

    getBusinessClassDetails(URL: string, owners: any, auth: string): Observable<any> {
        let param = { owners: owners };
        return this.invokeGETClassCodes(URL, param, auth);
    }


}