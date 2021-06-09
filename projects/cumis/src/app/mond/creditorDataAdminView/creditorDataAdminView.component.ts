import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../_services/ds';
import { Router, ActivatedRoute } from '@angular/router';
import { MDCommonGetterSetter } from '../../_services/common';



@Component({
    selector: 'app-creditorDataAdminView-designer',
    templateUrl: './creditorDataAdminView.component.html',
    styleUrls: ['./creditorDataAdminView.component.css'],
})

export class CreditorDataAdminViewComponent implements OnInit {

    public clientName: string = "";
    public fileStatus: string = "";
    public processSummaryList: [];
    selectedTab: number = 0;
    public splitDataList: {};
    public isShowSplitView: boolean = false;
    public creditorData: any;
    public isResizeTrue: boolean = false;
    constructor(private mdMondServiceDS: MDMondServiceDS,
        private router: Router,
        private mdCommonGetterSetter: MDCommonGetterSetter) { }


    ngOnInit() {
        this.isShowSplitView = false;
        this.splitDataList = "";
        this.isShowSplitView = true;

    }
    onClickOfProcessOverviewSearch() {
        debugger
        let formVariable = {
            partnerName: this.clientName,
            fileProcessingStatus: this.fileStatus
        }
        this.mdMondServiceDS.getFormDataFromMondService("Creditor Self Admin", "FetchCreditorFileProcessingSummary", JSON.stringify(formVariable), null).subscribe(
            data => {
                this.processSummaryList = JSON.parse(atob(data.value)).creditorDataFileProcessingInfo_creditorDataFileProcessingInfo;
            }, error => {
                debugger;
                this.mdMondServiceDS.MDError(error);
                // let data = { "key": "key", "value": "eyJjcmVkaXRvckRhdGFGaWxlUHJvY2Vzc2luZ0luZm9fY3JlZGl0b3JEYXRhRmlsZVByb2Nlc3NpbmdJbmZvIjpbeyJmaWxlTmFtZSI6IkV4dHJhY3QgMjAyMTA1MDEgdG8gMjAyMTA1MzAtU2NlbmFyaW8xLUNhbmNlbGxhdGlvbl9Db29wX1RTXzFfVENfMTUueGxzeCIsImJhbGFuY2luZ0luZm8iOlt7InRyYW5zYWN0aW9uVHlwZSI6Ik5ldyBCdXNpbmVzcyIsInRvdGFsTnVtYmVyT2ZSZWNvcmRzIjoyLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjoyLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjowfSx7InRyYW5zYWN0aW9uVHlwZSI6IkNhbmNlbGxhdGlvbiIsInRvdGFsTnVtYmVyT2ZSZWNvcmRzIjoxLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjoxLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjowfV0sImZpbGVQcm9jZXNzaW5nU3RhdHVzIjoiRmlsZSBQcm9jZXNzZWQgUGFydGlhbGx5IiwicGFydG5lck5hbWUiOiJMR00iLCJmaWxlSWRlbnRpZmllciI6IjAwMDAxMDczIiwiZmlsZVByb2Nlc3NpbmdEYXRlIjoiMjAyMS0wNS0xOVQxNTo0ODozOC4xODJaIiwiZmlsZUZ1bmN0aW9uVHlwZSI6IlBvbGljeSBGZWVkIiwiZmlsZVN1Ym1pdHRlZEJ5IjoiRlRQIiwiZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0xOVQxNTo0ODoxMS4xMzNaIiwicHJvZHVjdFR5cGUiOiJTUCJ9LHsidG90YWxOdW1iZXJPZlJlY29yZHMiOjIsImZpbGVOYW1lIjoiTEFJUy0gRXh0cmFjdCBSIFVwZGF0ZWRfRmlsZVZhbGlkYXRpb25DaGVjay54bHN4IiwiZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIFByb2Nlc3NlZCBDb21wbGV0ZWx5IiwicGFydG5lck5hbWUiOiJMQUlTIiwiZmlsZUlkZW50aWZpZXIiOiIwMDAwMTA2MSIsImZpbGVQcm9jZXNzaW5nRGF0ZSI6IjIwMjEtMDUtMTlUMTI6MzY6MDQuNDAyWiIsImZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsIm51bWJlck9mUmVjb3Jkc1Bvc3RlZCI6MiwiZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0xOVQxMjozMTowMC4wNTFaIiwibnVtYmVyT2ZSZWNvcmRzSW5FcnJvciI6MCwidG90YWxOdW1iZXJPZkR1cGxpY2F0ZVJlY29yZHMiOjAsImJhbGFuY2luZ0luZm8iOltdLCJmaWxlRnVuY3Rpb25UeXBlIjoiUmVpbnN0YXRlbWVudCIsInByb2R1Y3RUeXBlIjoiU1AifSx7InRvdGFsTnVtYmVyT2ZSZWNvcmRzIjoxMywiZmlsZU5hbWUiOiJDb29wZXJhdG9ycyBFeHRyYWN0IDIwMTcwOTEwIChVVEYtOCktVGVtcC50eHQiLCJmaWxlUHJvY2Vzc2luZ1N0YXR1cyI6IkZpbGUgcHJvY2Vzc2VkIHdpdGggZXJyb3JzIiwicGFydG5lck5hbWUiOiJDcmVsb2dpeCIsImZpbGVJZGVudGlmaWVyIjoiMDAwMDA5MjQiLCJmaWxlUHJvY2Vzc2luZ0RhdGUiOiIyMDIxLTA0LTI4VDA1OjExOjA0LjYxNloiLCJmaWxlU3VibWl0dGVkQnkiOiJGVFAiLCJudW1iZXJPZlJlY29yZHNQb3N0ZWQiOjEwLCJmaWxlU3VibWlzc2lvbkRhdGUiOiIyMDIxLTA0LTI4VDA1OjExOjA0LjYxNloiLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjozLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwiYmFsYW5jaW5nSW5mbyI6W10sImZpbGVQcm9jZXNzaW5nRXJyb3JzIjoiXG5DZXJ0aWZpY2F0ZSAzOTk3NTM1NSBkb2VzIG5vdCBleGlzdCBmb3IgY2FuY2VsbGF0aW9uXG5DZXJ0aWZpY2F0ZSAzOTc2MzIyMyBkb2VzIG5vdCBleGlzdCBmb3IgY2FuY2VsbGF0aW9uXG5DZXJ0aWZpY2F0ZSAzOTU5MjEwNSBkb2VzIG5vdCBleGlzdCBmb3IgY2FuY2VsbGF0aW9uIiwiZmlsZUZ1bmN0aW9uVHlwZSI6Ik5ldyBCdXNpbmVzcyIsInByb2R1Y3RUeXBlIjoiU1AifSx7InRvdGFsTnVtYmVyT2ZSZWNvcmRzIjozLCJmaWxlTmFtZSI6IkxHTV9OZXdCdXNpbmVzcy0zUmVjX1Byb3Blck1heENvdmVyYWdlQW1vdW50IExpZmUudHh0IiwiZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIHJlamVjdGVkIiwicGFydG5lck5hbWUiOiJMR00iLCJmaWxlSWRlbnRpZmllciI6IjAwMDAwOTYxIiwiZmlsZVByb2Nlc3NpbmdEYXRlIjoiMjAyMS0wNS0wN1QxMzowMDozMi42NzZaIiwiZmlsZVN1Ym1pdHRlZEJ5IjoiRlRQIiwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjowLCJmaWxlU3VibWlzc2lvbkRhdGUiOiIyMDIxLTA1LTA3VDEzOjAwOjI5LjUzM1oiLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjozLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwiYmFsYW5jaW5nSW5mbyI6W10sImZpbGVGdW5jdGlvblR5cGUiOiJOZXcgQnVzaW5lc3MiLCJwcm9kdWN0VHlwZSI6IlNQIn0seyJ0b3RhbE51bWJlck9mUmVjb3JkcyI6MywiZmlsZU5hbWUiOiJMR01fTmV3QnVzaW5lc3MtM1JlY19Qcm9wZXJNYXhDb3ZlcmFnZUFtb3VudCBMaWZlLnR4dCIsImZpbGVQcm9jZXNzaW5nU3RhdHVzIjoiRmlsZSByZWplY3RlZCIsInBhcnRuZXJOYW1lIjoiTEdNIiwiZmlsZUlkZW50aWZpZXIiOiIwMDAwMDk2MiIsImZpbGVQcm9jZXNzaW5nRGF0ZSI6IjIwMjEtMDUtMDdUMTM6MDA6MzIuNjc2WiIsImZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsIm51bWJlck9mUmVjb3Jkc1Bvc3RlZCI6MCwiZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0wN1QxMzowMDoyOS41MzNaIiwibnVtYmVyT2ZSZWNvcmRzSW5FcnJvciI6MywidG90YWxOdW1iZXJPZkR1cGxpY2F0ZVJlY29yZHMiOjAsImJhbGFuY2luZ0luZm8iOltdLCJmaWxlRnVuY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIiwicHJvZHVjdFR5cGUiOiJTUCJ9LHsidG90YWxOdW1iZXJPZlJlY29yZHMiOjMsImZpbGVOYW1lIjoiTEdNX05ld0J1c2luZXNzLTNSZWNfUHJvcGVyTWF4Q292ZXJhZ2VBbW91bnQgTGlmZS50eHQiLCJmaWxlUHJvY2Vzc2luZ1N0YXR1cyI6IkZpbGUgcmVqZWN0ZWQiLCJwYXJ0bmVyTmFtZSI6IkxHTSIsImZpbGVJZGVudGlmaWVyIjoiMDAwMDA5NjMiLCJmaWxlUHJvY2Vzc2luZ0RhdGUiOiIyMDIxLTA1LTA3VDEzOjAwOjMyLjY3NloiLCJmaWxlU3VibWl0dGVkQnkiOiJGVFAiLCJudW1iZXJPZlJlY29yZHNQb3N0ZWQiOjAsImZpbGVTdWJtaXNzaW9uRGF0ZSI6IjIwMjEtMDUtMDdUMTM6MDA6MjkuNTMzWiIsIm51bWJlck9mUmVjb3Jkc0luRXJyb3IiOjMsInRvdGFsTnVtYmVyT2ZEdXBsaWNhdGVSZWNvcmRzIjowLCJiYWxhbmNpbmdJbmZvIjpbXSwiZmlsZUZ1bmN0aW9uVHlwZSI6Ik5ldyBCdXNpbmVzcyIsInByb2R1Y3RUeXBlIjoiU1AifSx7InRvdGFsTnVtYmVyT2ZSZWNvcmRzIjozLCJmaWxlTmFtZSI6IkxHTV9OZXdCdXNpbmVzcy0zUmVjX1Byb3Blck1heENvdmVyYWdlQW1vdW50IExpZmUudHh0IiwiZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIHJlamVjdGVkIiwicGFydG5lck5hbWUiOiJMR00iLCJmaWxlSWRlbnRpZmllciI6IjAwMDAwOTY0IiwiZmlsZVByb2Nlc3NpbmdEYXRlIjoiMjAyMS0wNS0wN1QxMzowMDozMi42NzZaIiwiZmlsZVN1Ym1pdHRlZEJ5IjoiRlRQIiwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjowLCJmaWxlU3VibWlzc2lvbkRhdGUiOiIyMDIxLTA1LTA3VDEzOjAwOjI5LjUzM1oiLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjozLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwiYmFsYW5jaW5nSW5mbyI6W10sImZpbGVGdW5jdGlvblR5cGUiOiJOZXcgQnVzaW5lc3MiLCJwcm9kdWN0VHlwZSI6IlNQIn0seyJ0b3RhbE51bWJlck9mUmVjb3JkcyI6MywiZmlsZU5hbWUiOiJMR01fTmV3QnVzaW5lc3MtM1JlY19Qcm9wZXJNYXhDb3ZlcmFnZUFtb3VudCBMaWZlLnR4dCIsImZpbGVQcm9jZXNzaW5nU3RhdHVzIjoiRmlsZSByZWplY3RlZCIsInBhcnRuZXJOYW1lIjoiTEdNIiwiZmlsZUlkZW50aWZpZXIiOiIwMDAwMDk2NSIsImZpbGVQcm9jZXNzaW5nRGF0ZSI6IjIwMjEtMDUtMDdUMTM6MDA6MzIuNjc2WiIsImZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsIm51bWJlck9mUmVjb3Jkc1Bvc3RlZCI6MCwiZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0wN1QxMzowMDoyOS41MzNaIiwibnVtYmVyT2ZSZWNvcmRzSW5FcnJvciI6MywidG90YWxOdW1iZXJPZkR1cGxpY2F0ZVJlY29yZHMiOjAsImJhbGFuY2luZ0luZm8iOltdLCJmaWxlRnVuY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIiwicHJvZHVjdFR5cGUiOiJTUCJ9XX0=" }
                // this.processSummaryList = JSON.parse(atob(data.value)).creditorDataFileProcessingInfo_creditorDataFileProcessingInfo;
            }
        )
    }

    onClickOfFileName(event) {
        this.mdCommonGetterSetter.setProcessSummaryRowData(event);
        this.router.navigate(['/home/creditorDataProcessingOverview'], { skipLocationChange: true });

    }

    onClickOfViewSplitFiles(event) {
        debugger;
        this.mdCommonGetterSetter.setProcessSummaryRowData(event);
        this.isShowSplitView = false;
        this.selectedTab = 1;
        let formVariable = { fileIdentifier: event.fileIdentifier }
        this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin', 'FetchCreditorFileProcessingSplitFileSummary', JSON.stringify(formVariable), null).subscribe(
            data => {
                this.splitDataList = JSON.parse(atob(data.value));
                this.isShowSplitView = true;
            }, error => {
                this.mdMondServiceDS.MDError(error);
                // let data = { "key": "key", "value": "eyJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdTdW1tYXJ5X2NyZWRpdG9yU3BsaXRGaWxlUHJvY2Vzc2luZ1N1bW1hcnkiOlt7InBhcmVudEZpbGVJZGVudGlmaWVyIjoiMDAwMDExMTUiLCJmaWxlUHJvY2Vzc2luZ1N0YXR1cyI6IkZpbGUgUHJvY2Vzc2VkIFN1Y2Nlc3NmdWxseSIsImZpbGVJZGVudGlmaWVyIjoiMDAwMDExMTUtTVMwMDAwMTYxLTIwMjEwNDA1ICAxNDowMzozOS1OZXcgQnVzaW5lc3MiLCJmaWxlRnVuY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIn0seyJwYXJlbnRGaWxlSWRlbnRpZmllciI6IjAwMDAxMTE1IiwiZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIFByb2Nlc3NlZCBTdWNjZXNzZnVsbHkiLCJmaWxlSWRlbnRpZmllciI6IjAwMDAxMTE1LU1TMDAwMDE2Mi0yMDIxMDQxNSAgMTI6NTM6MDgtTmV3IEJ1c2luZXNzIiwiZmlsZUZ1bmN0aW9uVHlwZSI6Ik5ldyBCdXNpbmVzcyJ9XX0\u003d" }
                // this.splitDataList = JSON.parse(atob(data.value));
                // this.isShowSplitView = true;
            })

    }

    @HostListener('click', ['$event.target'])
    onClick(element) {
        debugger;
        this.isResizeTrue = true;
        setTimeout(() => {
            this.isResizeTrue = false;
        }, 2000)
    }



}