import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
    //private readonly configUrlPath: string = '/mondrestws/services/authenticate/intializeApp?appName=smartforms';
   // private configData: Configuration;

    constructor(
        private http: HttpClient) { }

    loadConfigurationData(): Promise<any> {
        return this.http.get(`/mondrestws/services/intialize/intializeApp?appName=agentportal`)
        .toPromise().then(data => {
            // console.log("Success Data " + data);
        }, err => {
            console.log("Error");
        });
      }

    // get config(): Configuration {
    //     return this.configData;
    // }
}