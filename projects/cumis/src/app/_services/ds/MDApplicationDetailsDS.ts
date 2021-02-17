import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDApplicationDetailsDS extends MDBaseDS {
    getListOfApplicationDetailsWithMenuAndAccessRights(): Observable<any> {
        let param={}
        return this.invokeGET("/mondrestws/services/applicationDetails/getListOfApplicationDetailsWithMenuAndAccessRights", param);
    }
}