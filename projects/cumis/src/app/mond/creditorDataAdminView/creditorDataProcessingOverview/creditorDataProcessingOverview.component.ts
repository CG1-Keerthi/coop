import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../_services/ds';
import { MDCommonGetterSetter } from '../../../_services/common';



@Component({
    selector: 'app-creditorDataProcessingOverview-designer',
    templateUrl: './creditorDataProcessingOverview.component.html',
    styleUrls: ['./creditorDataProcessingOverview.component.css']
})

export class CreditorDataProcessingOverviewComponent implements OnInit {
    // @Input() splitData

    public processSummaryRowData: any;
    public splitFileRowDataList: any;
    public processingOverviewData: any;
    public creLogixData: any;
    public laisData: any;
    public lgmData: any;
    public isShowLGMTWO: boolean = false;
    public isShowCreLogix: boolean = false;
    public isShowLAIS: boolean = false;
    public isShowLGM: boolean = false;
    public isShowCrelogixField: boolean = false;
    public isShowLAISField: boolean = false;
    public isFieldreadonly: boolean;

    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter) { }

    ngOnInit() {
        // debugger;
        this.isFieldreadonly = true;      
        this.mdCommonGetterSetter.getProcessSummaryRowData().subscribe(
            data =>{
                this.processSummaryRowData = data;
            });

            this.mdCommonGetterSetter.getSplitFileRowData().subscribe(
                data =>{
                    this.splitFileRowDataList = data;
                });
                if(this.processSummaryRowData.fileName == undefined){
                    this.processSummaryRowData = this.splitFileRowDataList;
                }
        let processRelatedForm;
        if(this.processSummaryRowData.fileName.includes('Extract') == true && this.processSummaryRowData.partnerName == "LGM"){
            if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Cancellation")
            {
                processRelatedForm = "Creditor Cancellation Data Verification Form - LGM2";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Reinstatement")
            {
                processRelatedForm = "Creditor Reinstatement Verification form -LGM2";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "New Business" || this.processSummaryRowData.fileFunctionType == "Amendment" || this.processSummaryRowData.fileFunctionType == "PolicyFeed")
            {
                processRelatedForm = "Creditor Data Verification Form - LGM2";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Expired")
            {
                processRelatedForm = "Creditor Expiration Verification form -LGM2";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "UnExpired")
            {
                processRelatedForm = "Creditor Unexpired Verification form -LGM2";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Policy Feed")
            {
                processRelatedForm = "Creditor Policy Feed form -LGM2";
            }
            } else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Cancellation")
            {
                processRelatedForm = "Creditor Cancellation Data Verification Form - LGM"; 
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "Reinstatement")
            {
                processRelatedForm = "Creditor Reinstatement Verification form -LGM";
            }
            else if (this.processSummaryRowData.partnerName == "LGM" && this.processSummaryRowData.fileFunctionType == "New Business")
            {
                processRelatedForm = "Creditor Data Verification Form - LGM";
            }
            else if (this.processSummaryRowData.partnerName == "Crelogix" && this.processSummaryRowData.fileFunctionType == "New Business") {
                processRelatedForm = "Creditor Data Verification Form - Crelogix";
            }
            else if (this.processSummaryRowData.partnerName == "LAIS" && this.processSummaryRowData.fileFunctionType == "New Business" || this.processSummaryRowData.fileFunctionType == "Amendment") {
                processRelatedForm = "Creditor Data Verification Form - LAIS";
            }
            else if (this.processSummaryRowData.partnerName == "LAIS" && this.processSummaryRowData.fileFunctionType == "Cancellation" || this.processSummaryRowData.fileFunctionType == "Partial Cancellation" || this.processSummaryRowData.fileFunctionType == "Manual Cancellation") {
                processRelatedForm = "Creditor Cancellation Data Verification Form - LAIS";
            }
            else if (this.processSummaryRowData.partnerName == "LAIS" && this.processSummaryRowData.fileFunctionType == "Reinstatement") {
                processRelatedForm = "Creditor Reinstatement Verification form -LAIS";
            } else {
                this.mdMondServiceDS.showErrorMessage("Unable to get the form group, Please contact mond support team.");
                return;
            }

            if((this.processSummaryRowData.partnerName == "Crelogix") || (this.processSummaryRowData.fileName.includes('.txt') == true && this.processSummaryRowData.partnerName == "LGM") ){
                this.isShowLAISField = false;
            this.isShowCrelogixField = true;
            }else{
                this.isShowCrelogixField = false;
                this.isShowLAISField = true;
            }
            this.mdMondServiceDS.getBinDataModelBasedOnFKTypeDescriptionVersion('FormDefinitionJSon',processRelatedForm,'1.00').subscribe(
                data =>{
                    this.getList();
                },error =>{
                    this.mdMondServiceDS.MDError(error);
                    this.getList();
                })
        

    }
    
    getList(){     
        let formVariable;
        if(this.splitFileRowDataList.fileIdentifier != undefined){
            formVariable = {fileIdentifier:this.splitFileRowDataList.fileIdentifier}
            this.splitFileRowDataList.fileIdentifier = undefined;
        }else{
            formVariable =  {fileIdentifier:this.processSummaryRowData.fileIdentifier}
        }
        
    this.mdMondServiceDS.getFormDataFromMondService('Creditor Self Admin','FetchCreditorFileProcessingDetails',JSON.stringify(formVariable),null).subscribe(
        data =>{
            if(this.processSummaryRowData.fileName.includes('.xlsx') == true && this.processSummaryRowData.partnerName == "LGM"){
                this.processingOverviewData = JSON.parse(atob(data.value));
                this.isShowLAIS = false;
                this.isShowCreLogix = false;
                this.isShowLGM = false;
                this.isShowLGMTWO = true;
            }else if(this.processSummaryRowData.partnerName == "Crelogix"){
                this.processingOverviewData = JSON.parse(atob(data.value));
                this.isShowLAIS = false;
                this.isShowLGMTWO = false;
                this.isShowLGM = false;
                this.isShowCreLogix = true;
            }else if(this.processSummaryRowData.partnerName == "LAIS"){
               this.processingOverviewData = JSON.parse(atob(data.value));
                this.isShowLGMTWO = false;
                this.isShowCreLogix = false;
                this.isShowLGM = false;
                this.isShowLAIS = true;
            } else if(this.processSummaryRowData.fileName.includes('.txt') == true && this.processSummaryRowData.partnerName == "LGM"){
               this.processingOverviewData = JSON.parse(atob(data.value));
                this.isShowLGMTWO = false;
                this.isShowCreLogix = false;
                this.isShowLAIS = false;
                this.isShowLGM = true;
            }
        },error=>{
            // debugger
            this.mdMondServiceDS.MDError(error);
            // let data = {"key":"key","value":"eyJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUNyZWxvZ2l4X3BvbGljeURhdGEiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0YXRlbWVudEZpbGVMR00yX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2hlYWRlcl90b3RhbE51bWJlck9mQ2VydGlmaWNhdGVzIjoiMSIsImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEdNX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JTcGxpdEZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ1N0YXR1cyI6IkZpbGUgUHJvY2Vzc2luZyBFcnJvciIsImNyZWRpdG9yRmlsZV9wb2xpY3lSZWluc3RldGVtZW50RmlsZUxHTV9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfcGVyaW9kU3RhcnREYXRlIjoiMjAyMDA3MDEiLCJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX3BhcmVudEZpbGVJZGVudGlmaWVyIjoiMDAwMDExNDkiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19iYWxhbmNpbmdJbmZvIjpbeyJ0cmFuc2FjdGlvblR5cGUiOiJOZXcgQnVzaW5lc3MiLCJ0b3RhbE51bWJlck9mUmVjb3JkcyI6MSwibnVtYmVyT2ZSZWNvcmRzSW5FcnJvciI6MSwidG90YWxOdW1iZXJPZkR1cGxpY2F0ZVJlY29yZHMiOjAsIm51bWJlck9mUmVjb3Jkc1Bvc3RlZCI6MH1dLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0RhdGUiOiIyMDIxLTA1LTI3VDA2OjI0OjU2LjU0NFoiLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxBSVNfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfaGVhZGVyX3JlY29yZEVycm9ycyI6IkVycm9yOlxuTW9udGhseSBCZW5lZml0IDE1MDAuMCBpcyBub3QgYXBwbGljYWJsZSBmb3IgY292ZXJhZ2UgY29kZSBMSSBmb3IgbWljaGVsIG1pbGxldHRlXG5Nb250aGx5IEJlbmVmaXQgYW1vdW50IDE1MDAuMDAgZm9yIEFEUCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDAuMDAiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19wYXJ0bmVyTmFtZSI6IkxHTSIsImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfcHJvY2Vzc2VkV2l0aEVycm9ycyI6dHJ1ZSwiY3JlZGl0b3JTcGxpdEZpbGVQcm9jZXNzaW5nSW5mb19kb2N1bWVudElkIjoiNjY2OTExIiwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZU5hbWUiOiJFeHRyYWN0IDIwMjAwNzAxIHRvIDIwMjAwNzMxX05vTW9udGhseUJlbmVmaXRBbW91bnRSdWxlLnhsc3giLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlSWRlbnRpZmllciI6IjAwMDAxMTQ5IiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2NlcnRpZmljYXRlIjpbeyJjcmVkaXRvck5hbWUiOiJCYW5rIG9mIE5vdmEgU2NvdGlhIiwicHJlbWl1bVNwbGl0IjoiMS4wIiwicG9saWN5TnVtYmVyIjoiODExMDIzIiwic2FsZXNUYXgiOiI4OTAuNTUiLCJhcHBsaWNhbnRDaXR5IjoiU2FpbnQtT3VycyIsImFwcGxpY2FudERhdGVPZkJpcnRoIjoiMTk1MDA4MDgiLCJncm91cFBvbGljeUhvbGRlckNvdW50cnkiOiJDQSIsImFwcGxpY2FudENvdmVyYWdlRXhwaXJ5RGF0ZSI6IjIwMjIxMTI5IiwiZ3JvdXBQb2xpY3lIb2xkZXJQb3N0YWxDb2RlIjoiSjJDIDJDNCIsInRvdGFsUHJlbWl1bUFtb3VudCI6IjEwNzg1LjU0IiwiY3JlZGl0b3JDaXR5IjoiQ2FsZ2FyeSIsImxvYW5QYXltZW50V2l0aG91dEluc3VyYW5jZSI6IjM4OS4yOCIsImluc3VyZWRNb250aGx5QmVuZWZpdCI6IjE1MDAuMCIsImdyb3VwUG9saWN5SG9sZGVyQWRkcmVzcyI6Ijg3NSBib3VsLiBTYWludC1Kb3NlcGggIiwiYXBwbGljYW50Q292ZXJhZ2VQcmVtaXVtQW1vdW50IjoiOTg5NS4wIiwiYXBwbGljYW50TGFzdE5hbWUiOiJtaWxsZXR0ZSIsImNyZWRpdG9yUG9zdGFsQ29kZSI6IlQyUCAyTDgiLCJsb2FuQW1vdW50V2l0aEluc3VyYW5jZSI6IjE0MTk1Ny40MSIsImNvdmVyYWdlRWZmZWN0aXZlRGF0ZSI6IjIwMTgxMTI5IiwiZGVhbFR5cGUiOiJGIiwiYXBwbGljYW50Rmlyc3ROYW1lIjoibWljaGVsIiwiYXBwbGljYW50TWFpbGluZ0FkZHJlc3MiOiIyMTgwIFJhbmcgZGUgbGEgQmFzc2UiLCJsb2FuUGF5bWVudEZyZXF1ZW5jeSI6IjUyIiwibG9hbkFtb3VudEluc3VyZWQiOiIxMTcyMjcuNDUiLCJjcmVkaXRvckFkZHJlc3MiOiJQbyBCb3ggMTgzMyBTdGF0aW9uIE0gIiwiYXBwbGljYW50SW5zdXJhbmNlVGVybSI6IjQ4IiwiZ3JvdXBQb2xpY3lIb2xkZXJQcm92aW5jZSI6IlFDIiwidGF4RXhlbXB0RmxhZyI6Ik4iLCJ0cmFuc2FjdGlvbkFjdGl2aXR5RGF0ZSI6IjIwMTgxMTI5ICAxMDozMzo0OSIsImFwcGxpY2FudFByb3ZpbmNlIjoiUUMiLCJhcHBsaWNhbnRQb3N0YWxDb2RlIjoiSjBHIDFQMCIsImFwcGxpY2FudFRlbGVwaG9uZU51bWJlciI6IjQ1MDc4NTMwMzgiLCJsb2FuQW1vdW50V2l0aG91dEluc3VyYW5jZSI6IjEyNDcyOS45NiIsImFwcGxpY2FudENvdW50cnkiOiJDQSIsImdyb3VwUG9saWN5SG9sZGVyRGVhbGVyUmVtaXRzVGF4IjoiTm8iLCJjcmVkaXRvckNvdW50cnkiOiJDQSIsInNpbmdsZU9ySm9pbnRGbGFnIjoiUyIsInJlc2lkdWFsUGF5bWVudEFtb3VudCI6IjAuMCIsImdyb3VwUG9saWN5SG9sZGVyVGVsZXBob25lIjoiODE5NDc0MzM4OCIsImludGVyZXN0UmF0ZSI6IjMuNyIsImFwcGxpY2FudENvdmVyYWdlU3RhdHVzIjoiQWN0aXZlIiwiZ3JvdXBQb2xpY3lIb2xkZXJDaXR5IjoiRHJ1bW1vbmR2aWxsZSIsInBsYW5Db2RlIjoiMDU1OTQiLCJ0cmFuc2FjdGlvblR5cGUiOiJOIiwiY292ZXJhZ2VUeXBlIjoiMDEiLCJncm91cFBvbGljeUhvbGRlciI6IkdhcmFnZSBNb250cGxhaXNpciBMdGVlIiwibG9hblRlcm0iOiI4NCIsImFwcGxpY2FudEdlbmRlciI6Ik0iLCJjcmVkaXRvclByb3ZpbmNlIjoiQUIifV0sImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfcGVyaW9kRW5kRGF0ZSI6IjIwMjAwNzMxIiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2hlYWRlcl90b3RhbE51bWJlck9mUmVjb3JkcyI6IjMiLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTV9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lFeHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVJZGVudGlmaWVyIjoiMDAwMDExNDktODExMDIzLTIwMTgxMTI5ICAxMDozMzo0OS1OZXcgQnVzaW5lc3MiLCJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVGdW5jdGlvblR5cGUiOiJOZXcgQnVzaW5lc3MiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlRnVuY3Rpb25UeXBlIjoiUG9saWN5IEZlZWQiLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0YXRlbWVudEZpbGVMQUlTX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0yN1QwNjoyNDo1MC41ODhaIiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2hlYWRlcl9maWxlQ3JlYXRpb25EYXRlIjoiMjAyMDA2MjAiLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfaGVhZGVyX3RyYW5zYWN0aW9uTW9udGgiOiJKdWx5IiwiY3JlZGl0b3JTcGxpdEZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0RhdGUiOiIyMDIxLTA1LTI3VDA2OjI0OjU2LjU0NFoiLCJjcmVkaXRvckZpbGVfcG9saWN5VW5leHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5Q2FuY2VsbGF0aW9uRmlsZUxBSVNfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfaGVhZGVyX2NyZWRpdG9yR3JvdXBJbnN1cmFuY2VQb2xpY3lOdW1iZXIiOiI4NTI3NTc3OSIsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsImNyZWRpdG9yRmlsZV9wYXJlbnRGaWxlSWRlbnRpZmllciI6IjAwMDAxMTQ5IiwiY3JlZGl0b3JTcGxpdEZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0Vycm9ycyI6IkVycm9yOlxuTW9udGhseSBCZW5lZml0IDE1MDAuMCBpcyBub3QgYXBwbGljYWJsZSBmb3IgY292ZXJhZ2UgY29kZSBMSSBmb3IgbWljaGVsIG1pbGxldHRlXG5Nb250aGx5IEJlbmVmaXQgYW1vdW50IDE1MDAuMDAgZm9yIEFEUCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDAuMDAiLCJjcmVkaXRvckZpbGVfZmlsZUlkZW50aWZpZXIiOiIwMDAwMTE0OS04MTEwMjMtMjAxODExMjkgIDEwOjMzOjQ5LU5ldyBCdXNpbmVzcyIsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX3Byb2R1Y3RUeXBlIjoiU1AiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ1N0YXR1cyI6IkZpbGUgUHJvY2Vzc2VkIFBhcnRpYWxseSJ9"}
           
        })
    }

}