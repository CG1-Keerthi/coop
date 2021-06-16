import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';
import { map } from 'rxjs/internal/operators/map';

@Injectable({ providedIn: 'root' })

export class MDExecuteServiceDS extends MDBaseDS {
    invokePFDServiceWithDownload(params): Observable<any> {
        const requestOptions: Object = { params: params, responseType: "blob" };
        return this.http.get("/mondrestws/services/executeService/executePFDServiceWithDownload", requestOptions).pipe(map(data => {
            return data;
        }));
    }
}