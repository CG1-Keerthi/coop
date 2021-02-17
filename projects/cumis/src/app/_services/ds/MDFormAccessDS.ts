import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })

export class MDFormAccessDS extends MDBaseDS {

    getFormAccessAllowedBasedOnFormName(formName: String): Observable<any> {
        let param = { formName: formName };
        return this.invokeGET("/mondrestws/services/formAccess/getFormAccessAllowedBasedOnFormName", param);
    }

    getFormAccessAllowed(formName: String, actionName: String): Observable<any> {
        let param = { formName: formName, actionName: actionName };
        return this.invokeGET("/mondrestws/services/formAccess/getFormAccessAllowed", param);
    }

}