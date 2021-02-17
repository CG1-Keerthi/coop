import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MDDateUtils {

    getISOFormattedDate(date) {
        // console.log("Converting Date to ISO Format", date);
        if (!date) {
          console.log("Not valid date", date);
          return date
        }
        if (date.toString().includes('T00:')) {
          // console.log("Date is already defined", date); 
          return date;
        }
        // let d = new Date(date);
        // "2020-09-25T18:30:00.000Z"
        return this.convertISODateTo(date) + "T00:00:00.000Z"
      }

      getTimeZoneOffSetDate(date): any{
        debugger;
        if (!date) {
          console.log("Not valid date", date);
          return "";
        }
        if(new Date(date).getTimezoneOffset()/60 > 0){
        return new Date(new Date(date).setHours(new Date(date).getHours() + (new Date(date).getTimezoneOffset()/60)))
        } else {
          return new Date(date);
        }
      }

      convertISODateTo(serverDate) {
        if (serverDate) {
            let date = new Date(serverDate);           
            let month: any = date.getMonth() + 1;
            let dt: any = date.getDate();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return date.getFullYear() + "-" + month + "-" + dt;
        }
    }
}