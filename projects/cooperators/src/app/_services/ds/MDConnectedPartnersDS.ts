import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';
import { map } from 'rxjs/internal/operators/map';
import { Base64 } from 'js-base64';

@Injectable({ providedIn: 'root' })
export class MDConnectedPartnersDS extends MDBaseDS {



    getListOfPartnerCompaniesTypeAhead(partnerCompanyLike: string): Observable<any> {
        let param = { partnerCompanyLike: partnerCompanyLike };
        return this.invokeGET("/mondrestws/services/connectedPartners/getListOfPartnerCompaniesTypeAhead", param);
    }




}