import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDLoginAuth extends MDBaseDS {
    login(data: string): Observable<any> {
        return this.http.post('/mondrestws/services/authenticateEnc/login', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .pipe(map(data => {

                return data;
            }));
    }
    auth(param: string): Observable<any> {
        return this.invokePOST("/mondrestws/services/authenticate/auth", param);
    }

}