import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MDCommonGetterSetter } from '../../_services/common';
import { MDMondServiceDS } from '../../_services/ds/MDMondServiceDS';

@Component({
    selector: 'app-rateStructureConfiguration-designer',
    templateUrl: './rateStructureConfiguration.component.html',
    styleUrls: ['./rateStructureConfiguration.component.css'],

})

export class RateStructureConfigurationComponent implements OnInit {

    public csfrToken: any;
    public rateName: string = "";
    public rateType: string = "";
    public rateList: [{}];
    public isSpinnerShow: boolean = false;
    public selectedTab: number = 0;
    public formVariables: any;
    public rateDetailsData: any = {};
    constructor(private http: HttpClient,
        private mdCommonGetterAndSetter: MDCommonGetterSetter,
        private mdMondServiceDS: MDMondServiceDS) { }


    ngOnInit() {
        this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
            if (data) {
                this.csfrToken = data;
            }
        });
    }

    onClickOfRatesearch() {
        this.formVariables = {
            rateName: this.rateName,
            rateType: this.rateType
        };
        this.isSpinnerShow = true;
        this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanRateStructureList', JSON.stringify(this.formVariables), null).subscribe(
            data => {
                this.rateList = JSON.parse(atob(data.value)).planRatingStructureHeaderList_PlanRatingStructureHeader;
                this.isSpinnerShow = false;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // this.isSpinnerShow = true;
                // let data = { "key": "key", "value": "eyJwbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyTGlzdF9QbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyIjpbeyJyYXRlVHlwZSI6IkhpZ2giLCJyYXRlTmFtZSI6IkNhcmVmcmVlLVNpbmdsZVJhdGVzLUhpZ2ggQ29tcCIsImpvaW50TGlmZU11bHRpcGxpZXIiOjAuOTI1LCJ0b2xlcmFuY2VMZXZlbCI6MC4wMiwiUGxhblJhdGluZ1N0cnVjdHVyZURldGFpbHMiOltdLCJyYXRlU3RydWN0dXJlSGVhZGVySWQiOjQ4fSx7InJhdGVUeXBlIjoiSGlnaCIsInJhdGVOYW1lIjoiRXNzZW50aWFsUGx1cy1TaW5nbGVSYXRlcy1IaWduIENvbXAiLCJqb2ludExpZmVNdWx0aXBsaWVyIjowLjkyNSwidG9sZXJhbmNlTGV2ZWwiOjAuMDIsIlBsYW5SYXRpbmdTdHJ1Y3R1cmVEZXRhaWxzIjpbXSwicmF0ZVN0cnVjdHVyZUhlYWRlcklkIjo0N31dfQ\u003d\u003d" };
                // this.rateList = JSON.parse(atob(data.value)).planRatingStructureHeaderList_PlanRatingStructureHeader;
                // this.isSpinnerShow = false;
            });
    }

    onClickOfRatereset() {
        this.rateName = "";
        this.rateType = "";
        this.rateList = [{}];
    }

    onClickOfAddRate() {
        debugger;
        this.rateDetailsData = {};
        this.selectedTab = 1;
    }

    onRateListRowSelect(event) {
        debugger
        this.selectedTab = 1;
        this.mdMondServiceDS.invokeMondServiceGET("Creditor Self Admin", "FetchPlanRateStructureDetails", "1.00", btoa(JSON.stringify({ "rateStructureHeaderId": event.data.rateStructureHeaderId })), this.csfrToken, true, true, true, true).subscribe(
            data => {
                // this.rateDetailsData = JSON.parse(atob(data))
                let restructureJSON = {
                    PlanRatingStructureHeader: JSON.parse(JSON.parse(atob(data)).planRateStructureJSON)
                }
                this.rateDetailsData = restructureJSON;
            },
            error => {
                this.mdMondServiceDS.MDError(error);
                // let data = "eyJwbGFuUmF0ZVN0cnVjdHVyZUpTT04iOiJ7XCJyYXRlU3RydWN0dXJlSGVhZGVySWRcIjogNDksIFwicmF0ZU5hbWVcIjogXCJzaW5nbGVSYXRlXCIsIFwicmF0ZVR5cGVcIjogXCJIaWdoXCIsIFwiam9pbnRMaWZlTXVsdGlwbGllclwiOiAwLjQ1LCBcInRvbGVyYW5jZUxldmVsXCI6IDAuMSwgXCJQbGFuUmF0aW5nU3RydWN0dXJlRGV0YWlsc1wiOiBbe1wicmF0ZVN0cnVjdHVyZURldGFpbHNJZFwiOiAzMTEsIFwicmF0ZVN0cnVjdHVyZUhlYWRlcklkXCI6IDQ5LCBcImxvYW5BbW91bnRTdGFydFZhbHVlXCI6IDEyLjAsIFwibG9hbkFtb3VudEVuZFZhbHVlXCI6IDUwLjAsIFwiY292ZXJhZ2VDb2RlSW5QbGFuUmF0aW5nU3RydWN0dXJlXCI6IFwiYmVuaWZpdHNcIiwgXCJ0ZXJtU3RhcnRWYWx1ZVwiOiAxMiwgXCJ0ZXJtRW5kVmFsdWVcIjogMjEsIFwiYWdlU3RhcnRWYWx1ZVwiOiAyMSwgXCJhZ2VFbmRWYWx1ZVwiOiA0NSwgXCJlbGltaW5hdGlvblBlcmlvZEluUGxhblJhdGluZ1N0cnVjdHVyZVwiOiBcIjM1XCIsIFwicHJlbWl1bUFtb3VudEluUGxhblJhdGluZ1N0cnVjdHVyZVwiOiA2LjAsIFwibXVsdGlMaWZlXCI6IFwiWWVzXCIsIFwibXVsdGlMaWZlVGVybVwiOiBcIlNhbWVcIn0sIHtcInJhdGVTdHJ1Y3R1cmVEZXRhaWxzSWRcIjogMzEyLCBcInJhdGVTdHJ1Y3R1cmVIZWFkZXJJZFwiOiA0OSwgXCJsb2FuQW1vdW50U3RhcnRWYWx1ZVwiOiAxMS4wLCBcImxvYW5BbW91bnRFbmRWYWx1ZVwiOiA2MC4wLCBcImNvdmVyYWdlQ29kZUluUGxhblJhdGluZ1N0cnVjdHVyZVwiOiBcInZcIiwgXCJ0ZXJtU3RhcnRWYWx1ZVwiOiAxMywgXCJ0ZXJtRW5kVmFsdWVcIjogMjUsIFwiYWdlU3RhcnRWYWx1ZVwiOiAyMSwgXCJhZ2VFbmRWYWx1ZVwiOiA1MCwgXCJlbGltaW5hdGlvblBlcmlvZEluUGxhblJhdGluZ1N0cnVjdHVyZVwiOiBcIjQwXCIsIFwicHJlbWl1bUFtb3VudEluUGxhblJhdGluZ1N0cnVjdHVyZVwiOiA4LjAsIFwibXVsdGlMaWZlXCI6IFwiWWVzXCIsIFwibXVsdGlMaWZlVGVybVwiOiBcIkRpZmZlcmVudFwifV19In0\u003d";
                // let restructureJSON = {
                //     PlanRatingStructureHeader: JSON.parse(JSON.parse(atob(data)).planRateStructureJSON)
                // }
                // this.rateDetailsData = restructureJSON;

            });
    }

}