import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MDLoginDS {

    constructor(private http: HttpClient) { }

    login(data: any): Observable<any> {
        return this.http.post(`/mondrestws/services/authenticate/mondLoginValidator`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .pipe(map(data => {

                return data;
            }));
    }
    
    auth(param: string): Observable<any> {
        return this.invokePOST("/mondrestws/services/authenticate/auth", param);
    }

    invokePOST(url: string, params: any) {
        debugger;
        const options = params ? { params: params } : {};

        //this.http = new ɵHttpInterceptingHandler(, new Injector());
        return this.http.post(url, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } }).pipe(map(data => {
            var d = new Date().getTime();
            return data;
        }));
    }

    logout(): Observable<any> {
        return this.http.post(`/mondrestws/services/authenticate/logout`, "", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .pipe(map(data => {
                return data;
            }));
    }
}