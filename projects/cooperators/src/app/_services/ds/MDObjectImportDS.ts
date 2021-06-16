import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDObjectImportDS extends MDBaseDS {



    importObjectV2(encodedJsonText: any): Observable<any> {
        let dataToSend = 'jsonText=' + encodedJsonText ;
        return this.invokePOST("/mondrestws/services/objectImport/importObjectV2", dataToSend);
    }



}