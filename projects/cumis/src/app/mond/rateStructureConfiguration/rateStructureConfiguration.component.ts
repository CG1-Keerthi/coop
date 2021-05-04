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

    // public csfrToken: any;
    public rateName: string;
    public rateType: string = "";
    public rateList: [{}];
    public isSpinnerShow: boolean = false;
    public selectedTab: number = 0;
    constructor(private http: HttpClient,
        private mdCommonGetterAndSetter: MDCommonGetterSetter,
        private mdMondServiceDS: MDMondServiceDS
    ) { }


    ngOnInit() {
        // debugger;
        // this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
        //     if (data) {
        //         this.csfrToken = data;
        //     }
        // });       
    }

    onClickOfRatesearch() {
        debugger;
        let formVariables = JSON.stringify({ "rateName": this.rateName, "rateType": this.rateType })
        this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchPlanRateStructureList', formVariables, null).subscribe(
            data => {

            }, error => {
                this.mdMondServiceDS.MDError(error);
                this.isSpinnerShow = true;
                let data = { "key": "key", "value": "eyJwbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyTGlzdF9QbGFuUmF0aW5nU3RydWN0dXJlSGVhZGVyIjpbeyJyYXRlVHlwZSI6IkhpZ2giLCJyYXRlTmFtZSI6IkNhcmVmcmVlLVNpbmdsZVJhdGVzLUhpZ2ggQ29tcCIsImpvaW50TGlmZU11bHRpcGxpZXIiOjAuOTI1LCJ0b2xlcmFuY2VMZXZlbCI6MC4wMiwiUGxhblJhdGluZ1N0cnVjdHVyZURldGFpbHMiOltdLCJyYXRlU3RydWN0dXJlSGVhZGVySWQiOjQ4fSx7InJhdGVUeXBlIjoiSGlnaCIsInJhdGVOYW1lIjoiRXNzZW50aWFsUGx1cy1TaW5nbGVSYXRlcy1IaWduIENvbXAiLCJqb2ludExpZmVNdWx0aXBsaWVyIjowLjkyNSwidG9sZXJhbmNlTGV2ZWwiOjAuMDIsIlBsYW5SYXRpbmdTdHJ1Y3R1cmVEZXRhaWxzIjpbXSwicmF0ZVN0cnVjdHVyZUhlYWRlcklkIjo0N31dfQ\u003d\u003d" };
                this.rateList = JSON.parse(atob(data.value)).planRatingStructureHeaderList_PlanRatingStructureHeader;
                this.isSpinnerShow = false;
            });
    }

    onClickOfRatereset(){
        this.rateName = "";
        this.rateType = "";
        this.rateList = [{}];
    }

    onClickOfAddRate(){
        debugger;
        this.selectedTab = 1;
    }

    onRateListRowSelect(event) {
        debugger
        this.selectedTab = 1;
    }

}