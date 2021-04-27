import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';
import { map } from 'rxjs/internal/operators/map';
import { Base64 } from 'js-base64';
import { any } from 'codelyzer/util/function';

@Injectable({ providedIn: 'root' })
export class MDMondServiceDS extends MDBaseDS {

    public agencyInfoArray: BehaviorSubject<any> = new BehaviorSubject('default message');

    setAgencyInfoArray(agencyInfoArray) {
        // console.log('%c Agency Info Array has been set to:', "background: slateblue; color: white;", agencyInfoArray);
        this.agencyInfoArray.next(agencyInfoArray);
    }


    getFormDataFromMondService(projectName: String, serviceName: String, formVariables: String, csfrToken: String): Observable<any> {
        let param = { projectName: projectName, serviceName: serviceName, version: "1.00", formVariables: formVariables, addSessionInfoFlag: true, csfrToken: csfrToken };
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

    invokeMondService(projectName: any, serviceName: any, version: any,formData: any,csfrToken: any,addSessionInfoFlag: any,encodedDataFl: any,returnEncodedDataFl: any): Observable<any> {
        let dataToSend = 'projectName=' + projectName + '&serviceName=' + serviceName + '&version=' + version + '&formData=' + formData + 
        '&csfrToken=' + csfrToken + '&addSessionInfoFlag=' + addSessionInfoFlag + '&encodedDataFl=' + encodedDataFl + '&returnEncodedDataFl=' + returnEncodedDataFl;
        return this.invokePOST("/mondrestws/services/executeService/invokeMondService", dataToSend);
    }

    SaveClientAddressData(projectName: any, serviceName: any, version: any, clientAddressInfo_clientNumber: any, clientAddressInfo_clientIdentifier: any,
        clientAddressInfo_addressType: any, clientAddressInfo_currentRecordFlag: any, clientAddressInfo_clientAddressIdentifier: any, mondFormDateFormat: any,
        clientAddressInfo_addressEffectiveDate: any, clientAddressInfo_addressTerminationDate: any, clientAddressInfo_addressLine1: any, clientAddressInfo_addressLine2: any,
        clientAddressInfo_city: any, clientAddressInfo_province: any, clientAddressInfo_postalCode: any, clientAddressInfo_country: any,
        clientAddressInfo_lastUpdateDate: any, inputProcessField1: any, inputServiceField1: any, outputProcessField1: any, outputServiceField1: any, outputProcessField2: any,
        outputServiceField2: any, csfrToken: any): Observable<any> {

        let dataToSend = 'projectName=' + projectName + '&serviceName=' + serviceName + '&version=' +version + '&clientAddressInfo_clientNumber=' + clientAddressInfo_clientNumber + '&clientAddressInfo_clientIdentifier=' +clientAddressInfo_clientIdentifier
        +'&clientAddressInfo_addressType=' + clientAddressInfo_addressType + '&clientAddressInfo_currentRecordFlag=' + clientAddressInfo_currentRecordFlag + '&clientAddressInfo_clientAddressIdentifier=' + clientAddressInfo_clientAddressIdentifier
        +'&mondFormDateFormat=' + mondFormDateFormat + '&clientAddressInfo_addressEffectiveDate=' + clientAddressInfo_addressEffectiveDate + '&clientAddressInfo_addressTerminationDate=' +clientAddressInfo_addressTerminationDate 
        + '&clientAddressInfo_addressLine1=' +clientAddressInfo_addressLine1
        +'&clientAddressInfo_addressLine2=' + clientAddressInfo_addressLine2 + '&clientAddressInfo_city=' + clientAddressInfo_city + '&clientAddressInfo_province=' + clientAddressInfo_province + '&clientAddressInfo_postalCode=' +clientAddressInfo_postalCode
        +'&clientAddressInfo_country=' +clientAddressInfo_country +'&clientAddressInfo_lastUpdateDate=' +clientAddressInfo_lastUpdateDate + '&inputProcessField1='+inputProcessField1
        +'&inputServiceField1='+inputServiceField1 + '&outputProcessField1='+outputProcessField1 + '&outputServiceField1=' +outputServiceField1 + '&outputProcessField2='+outputProcessField2+'&outputServiceField2='+outputServiceField2 +'&csfrToken='+csfrToken


        return this.invokePOST("/mondrestws/services/executeService/invokeMondProcessDesignerService", dataToSend);
    }


    invokeMondServiceGET(projectName: any, serviceName: any, version: any,formData: any,csfrToken: any,addSessionInfoFlag: any,encodedDataFl: any,returnEncodedDataFl: any,includeOutputVarNameFl: any): Observable<any> {
        let param = { projectName: projectName, serviceName: serviceName, version: version, formData: formData, csfrToken: csfrToken, addSessionInfoFlag: addSessionInfoFlag,
            encodedDataFl:encodedDataFl,returnEncodedDataFl:returnEncodedDataFl,includeOutputVarNameFl:includeOutputVarNameFl };
        return this.invokeGET("/mondrestws/services/executeService/invokeMondServiceGET", param);
    }


}