import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../_services/ds';
import { MDCommonGetterSetter } from '../../../_services/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-splitFiles-designer',
    templateUrl: './splitFiles.component.html',
    styleUrls: ['./spiltFiles.component.css']
})

export class SplitFilesComponent implements OnInit {
    @Input() splitData

    public processSummaryRowData: any;
    public fileIdentifier: string = "";
    public certificateNumber: string = "";
    public splitFilesList: [];

    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter,
        private router:Router) { }

    ngOnInit() {
        debugger;
        this.splitFilesList = this.splitData.creditorSplitFileProcessingSummary_creditorSplitFileProcessingSummary;
    }
    onClickOfSplitFilesSearch() {
        debugger
        let formVariable = {
            partnerName: this.fileIdentifier,
            fileProcessingStatus: this.certificateNumber
        }
        this.mdMondServiceDS.getFormDataDebugLevel("Creditor Self Admin", "BasedOnService", "FetchCreditorFileProcessingSummary", "1.00", JSON.stringify(formVariable), new Date().getTime()).subscribe(
            data => {
                this.splitFilesList = JSON.parse(atob(data.value)).creditorDataFileProcessingInfo_creditorDataFileProcessingInfo;
            }, error => {
                debugger;
                this.mdMondServiceDS.MDError(error);
                let data = { "key": "key", "value": "eyJjcmVkaXRvckRhdGFGaWxlUHJvY2Vzc2luZ0luZm9fY3JlZGl0b3JEYXRhRmlsZVByb2Nlc3NpbmdJbmZvIjpbeyJmaWxlTmFtZSI6IkV4dHJhY3QgMjAyMTA1MDEgdG8gMjAyMTA1MzAtU2NlbmFyaW8xLUNhbmNlbGxhdGlvbl9Db29wX1RTXzFfVENfMTUueGxzeCIsImJhbGFuY2luZ0luZm8iOlt7InRyYW5zYWN0aW9uVHlwZSI6Ik5ldyBCdXNpbmVzcyIsInRvdGFsTnVtYmVyT2ZSZWNvcmRzIjoxLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjowLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjoxfSx7InRyYW5zYWN0aW9uVHlwZSI6IkNhbmNlbGxhdGlvbiIsInRvdGFsTnVtYmVyT2ZSZWNvcmRzIjoxLCJudW1iZXJPZlJlY29yZHNJbkVycm9yIjowLCJ0b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MCwibnVtYmVyT2ZSZWNvcmRzUG9zdGVkIjoxfV0sImZpbGVQcm9jZXNzaW5nU3RhdHVzIjoiRmlsZSBQcm9jZXNzZWQgQ29tcGxldGVseSIsInBhcnRuZXJOYW1lIjoiTEdNIiwiZmlsZUlkZW50aWZpZXIiOiIwMDAwMTA3OCIsImZpbGVQcm9jZXNzaW5nRGF0ZSI6IjIwMjEtMDUtMjBUMDk6MTc6MjkuMDQwWiIsImZpbGVGdW5jdGlvblR5cGUiOiJQb2xpY3kgRmVlZCIsImZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsImZpbGVTdWJtaXNzaW9uRGF0ZSI6IjIwMjEtMDUtMjBUMDk6MTc6MDUuNzQ1WiIsInByb2R1Y3RUeXBlIjoiU1AifSx7ImZpbGVOYW1lIjoiRXh0cmFjdCAyMDIxMDUwMSB0byAyMDIxMDUzMC1TY2VuYXJpbzEtQ2FuY2VsbGF0aW9uX0Nvb3BfVFNfMV9UQ18xNS54bHN4IiwiYmFsYW5jaW5nSW5mbyI6W3sidHJhbnNhY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIiwidG90YWxOdW1iZXJPZlJlY29yZHMiOjEsIm51bWJlck9mUmVjb3Jkc0luRXJyb3IiOjAsInRvdGFsTnVtYmVyT2ZEdXBsaWNhdGVSZWNvcmRzIjoxLCJudW1iZXJPZlJlY29yZHNQb3N0ZWQiOjB9LHsidHJhbnNhY3Rpb25UeXBlIjoiQ2FuY2VsbGF0aW9uIiwidG90YWxOdW1iZXJPZlJlY29yZHMiOjEsIm51bWJlck9mUmVjb3Jkc0luRXJyb3IiOjAsInRvdGFsTnVtYmVyT2ZEdXBsaWNhdGVSZWNvcmRzIjowLCJudW1iZXJPZlJlY29yZHNQb3N0ZWQiOjF9XSwiZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIFByb2Nlc3NlZCBQYXJ0aWFsbHkiLCJwYXJ0bmVyTmFtZSI6IkxHTSIsImZpbGVJZGVudGlmaWVyIjoiMDAwMDEwNzciLCJmaWxlUHJvY2Vzc2luZ0RhdGUiOiIyMDIxLTA1LTIwVDA4OjU0OjUxLjEwM1oiLCJmaWxlRnVuY3Rpb25UeXBlIjoiUG9saWN5IEZlZWQiLCJmaWxlU3VibWl0dGVkQnkiOiJGVFAiLCJmaWxlU3VibWlzc2lvbkRhdGUiOiIyMDIxLTA1LTIwVDA4OjU0OjI5LjUxMFoiLCJwcm9kdWN0VHlwZSI6IlNQIn1dfQ==" }
                this.splitFilesList = JSON.parse(atob(data.value)).creditorDataFileProcessingInfo_creditorDataFileProcessingInfo;
            });
    }

    onClickOfFileIdentifier(event) {
        debugger;
        this.mdCommonGetterSetter.setSplitFileRowData(event);
            this.router.navigate(['/home/creditorDataProcessingOverview'], { skipLocationChange: true });  
    }

}