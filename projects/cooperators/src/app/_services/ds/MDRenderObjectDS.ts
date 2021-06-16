import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MDBaseDS } from '../common/MDBaseDS';

@Injectable({ providedIn: 'root' })
export class MDrenderObjectDS extends MDBaseDS {

    renderObject(objectType: any,primaryKey:any): Observable<any> {
        let param = { objectType: objectType, primaryKey: primaryKey};
        return this.invokeGET("/mondrestws/services/objectRender/renderObject", param);
    }



}