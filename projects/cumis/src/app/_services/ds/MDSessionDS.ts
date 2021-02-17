import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDSessionDS extends MDBaseDS {
    isSessionValid(): Observable<any> {
        let param = {  };
        // console.log("IS SESSION VALID IS BEING CALLED.");
        return this.invokeGET("/mondrestws/services/session/isSessionValid", param);
    }
}
