import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDCodeListHeaderDS extends MDBaseDS {
    getListOfCodeLists(codeListName: string): Observable<any> {
        return this.invokeGET("/mondrestws/services/codeList/getListOfCodeValuesOrderById", {
            codeListHeader: codeListName
        });
    }


    // getListOfCodeLists(): Observable<any> {
    //     return this.invokeGET("/mondrestws/services/codeListHeader/getListOfCodeLists", null);
    // }

    // getCodeList(codeListName: string) {
    //     const url = "/mondrestws/services/codeList/getListOfCodeValuesOrderById";
        
    //     const options = { 
    //         data: {
    //             codeListHeader: codeListName
    //         },
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     return this.http.get(url, options).pipe(map(data => {
    //         return data;
    //     }));
    // }
}