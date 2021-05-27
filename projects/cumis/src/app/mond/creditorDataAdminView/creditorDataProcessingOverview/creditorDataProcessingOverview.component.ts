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

    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter) { }

    ngOnInit() {
        debugger;
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
        // this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
        //   if (data) {
        //     this.csfrToken = data;
        //   }
        // });

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
            debugger
            this.mdMondServiceDS.MDError(error);
            let data = {"key":"key","value":"ewogICJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUNyZWxvZ2l4X3BvbGljeURhdGEiOiBbXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeVJlaW5zdGF0ZW1lbnRGaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfaGVhZGVyX3RvdGFsTnVtYmVyT2ZDZXJ0aWZpY2F0ZXMiOiAiMSIsCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvckZpbGVfcG9saWN5Q2FuY2VsbGF0aW9uRmlsZUxHTV9jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVQcm9jZXNzaW5nU3RhdHVzIjogIkZpbGUgUHJvY2Vzc2luZyBFcnJvciIsCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lSZWluc3RldGVtZW50RmlsZUxHTV9jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfaGVhZGVyX3BlcmlvZFN0YXJ0RGF0ZSI6ICIyMDIwMDcwMSIsCiAgImNyZWRpdG9yU3BsaXRGaWxlUHJvY2Vzc2luZ0luZm9fcGFyZW50RmlsZUlkZW50aWZpZXIiOiAiMDAwMDExNDkiLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19iYWxhbmNpbmdJbmZvIjogWwogICAgewogICAgICAidHJhbnNhY3Rpb25UeXBlIjogIk5ldyBCdXNpbmVzcyIsCiAgICAgICJ0b3RhbE51bWJlck9mUmVjb3JkcyI6IDEsCiAgICAgICJudW1iZXJPZlJlY29yZHNJbkVycm9yIjogMSwKICAgICAgInRvdGFsTnVtYmVyT2ZEdXBsaWNhdGVSZWNvcmRzIjogMCwKICAgICAgIm51bWJlck9mUmVjb3Jkc1Bvc3RlZCI6IDAKICAgIH0KICBdLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0RhdGUiOiAiMjAyMS0wNS0yN1QwNjoyNDo1Ni41NDRaIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMQUlTX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfcmVjb3JkRXJyb3JzIjogIkVycm9yOlxuTW9udGhseSBCZW5lZml0IDE1MDAuMCBpcyBub3QgYXBwbGljYWJsZSBmb3IgY292ZXJhZ2UgY29kZSBMSSBmb3IgbWljaGVsIG1pbGxldHRlXG5Nb250aGx5IEJlbmVmaXQgYW1vdW50IDE1MDAuMDAgZm9yIEFEUCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDAuMDAiLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19wYXJ0bmVyTmFtZSI6ICJMR00iLAogICJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2RvY3VtZW50SWQiOiAiNjY2OTExIiwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZU5hbWUiOiAiRXh0cmFjdCAyMDIwMDcwMSB0byAyMDIwMDczMV9Ob01vbnRobHlCZW5lZml0QW1vdW50UnVsZS54bHN4IiwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZUlkZW50aWZpZXIiOiAiMDAwMDExNDkiLAogICJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbCiAgICB7CiAgICAgICJjcmVkaXRvck5hbWUiOiAiQmFuayBvZiBOb3ZhIFNjb3RpYSIsCiAgICAgICJwcmVtaXVtU3BsaXQiOiAiMS4wIiwKICAgICAgInBvbGljeU51bWJlciI6ICI4MTEwMjMiLAogICAgICAic2FsZXNUYXgiOiAiODkwLjU1IiwKICAgICAgImFwcGxpY2FudENpdHkiOiAiU2FpbnQtT3VycyIsCiAgICAgICJhcHBsaWNhbnREYXRlT2ZCaXJ0aCI6ICIxOTUwMDgwOCIsCiAgICAgICJncm91cFBvbGljeUhvbGRlckNvdW50cnkiOiAiQ0EiLAogICAgICAiYXBwbGljYW50Q292ZXJhZ2VFeHBpcnlEYXRlIjogIjIwMjIxMTI5IiwKICAgICAgImdyb3VwUG9saWN5SG9sZGVyUG9zdGFsQ29kZSI6ICJKMkMgMkM0IiwKICAgICAgInRvdGFsUHJlbWl1bUFtb3VudCI6ICIxMDc4NS41NCIsCiAgICAgICJjcmVkaXRvckNpdHkiOiAiQ2FsZ2FyeSIsCiAgICAgICJsb2FuUGF5bWVudFdpdGhvdXRJbnN1cmFuY2UiOiAiMzg5LjI4IiwKICAgICAgImluc3VyZWRNb250aGx5QmVuZWZpdCI6ICIxNTAwLjAiLAogICAgICAiZ3JvdXBQb2xpY3lIb2xkZXJBZGRyZXNzIjogIjg3NSBib3VsLiBTYWludC1Kb3NlcGggIiwKICAgICAgImFwcGxpY2FudENvdmVyYWdlUHJlbWl1bUFtb3VudCI6ICI5ODk1LjAiLAogICAgICAiYXBwbGljYW50TGFzdE5hbWUiOiAibWlsbGV0dGUiLAogICAgICAiY3JlZGl0b3JQb3N0YWxDb2RlIjogIlQyUCAyTDgiLAogICAgICAibG9hbkFtb3VudFdpdGhJbnN1cmFuY2UiOiAiMTQxOTU3LjQxIiwKICAgICAgImNvdmVyYWdlRWZmZWN0aXZlRGF0ZSI6ICIyMDE4MTEyOSIsCiAgICAgICJkZWFsVHlwZSI6ICJGIiwKICAgICAgImFwcGxpY2FudEZpcnN0TmFtZSI6ICJtaWNoZWwiLAogICAgICAiYXBwbGljYW50TWFpbGluZ0FkZHJlc3MiOiAiMjE4MCBSYW5nIGRlIGxhIEJhc3NlIiwKICAgICAgImxvYW5QYXltZW50RnJlcXVlbmN5IjogIjUyIiwKICAgICAgImxvYW5BbW91bnRJbnN1cmVkIjogIjExNzIyNy40NSIsCiAgICAgICJjcmVkaXRvckFkZHJlc3MiOiAiUG8gQm94IDE4MzMgU3RhdGlvbiBNICIsCiAgICAgICJhcHBsaWNhbnRJbnN1cmFuY2VUZXJtIjogIjQ4IiwKICAgICAgImdyb3VwUG9saWN5SG9sZGVyUHJvdmluY2UiOiAiUUMiLAogICAgICAidGF4RXhlbXB0RmxhZyI6ICJOIiwKICAgICAgInRyYW5zYWN0aW9uQWN0aXZpdHlEYXRlIjogIjIwMTgxMTI5ICAxMDozMzo0OSIsCiAgICAgICJhcHBsaWNhbnRQcm92aW5jZSI6ICJRQyIsCiAgICAgICJhcHBsaWNhbnRQb3N0YWxDb2RlIjogIkowRyAxUDAiLAogICAgICAiYXBwbGljYW50VGVsZXBob25lTnVtYmVyIjogIjQ1MDc4NTMwMzgiLAogICAgICAibG9hbkFtb3VudFdpdGhvdXRJbnN1cmFuY2UiOiAiMTI0NzI5Ljk2IiwKICAgICAgImFwcGxpY2FudENvdW50cnkiOiAiQ0EiLAogICAgICAiZ3JvdXBQb2xpY3lIb2xkZXJEZWFsZXJSZW1pdHNUYXgiOiAiTm8iLAogICAgICAiY3JlZGl0b3JDb3VudHJ5IjogIkNBIiwKICAgICAgInNpbmdsZU9ySm9pbnRGbGFnIjogIlMiLAogICAgICAicmVzaWR1YWxQYXltZW50QW1vdW50IjogIjAuMCIsCiAgICAgICJncm91cFBvbGljeUhvbGRlclRlbGVwaG9uZSI6ICI4MTk0NzQzMzg4IiwKICAgICAgImludGVyZXN0UmF0ZSI6ICIzLjciLAogICAgICAiYXBwbGljYW50Q292ZXJhZ2VTdGF0dXMiOiAiQWN0aXZlIiwKICAgICAgImdyb3VwUG9saWN5SG9sZGVyQ2l0eSI6ICJEcnVtbW9uZHZpbGxlIiwKICAgICAgInBsYW5Db2RlIjogIjA1NTk0IiwKICAgICAgInRyYW5zYWN0aW9uVHlwZSI6ICJOIiwKICAgICAgImNvdmVyYWdlVHlwZSI6ICIwMSIsCiAgICAgICJncm91cFBvbGljeUhvbGRlciI6ICJHYXJhZ2UgTW9udHBsYWlzaXIgTHRlZSIsCiAgICAgICJsb2FuVGVybSI6ICI4NCIsCiAgICAgICJhcHBsaWNhbnRHZW5kZXIiOiAiTSIsCiAgICAgICJjcmVkaXRvclByb3ZpbmNlIjogIkFCIgogICAgfQogIF0sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfcGVyaW9kRW5kRGF0ZSI6ICIyMDIwMDczMSIsCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfdG90YWxOdW1iZXJPZlJlY29yZHMiOiAiMyIsCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lFeHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JTcGxpdEZpbGVQcm9jZXNzaW5nSW5mb19maWxlSWRlbnRpZmllciI6ICIwMDAwMTE0OS04MTEwMjMtMjAxODExMjkgIDEwOjMzOjQ5LU5ldyBCdXNpbmVzcyIsCiAgImNyZWRpdG9yU3BsaXRGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZUZ1bmN0aW9uVHlwZSI6ICJOZXcgQnVzaW5lc3MiLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlRnVuY3Rpb25UeXBlIjogIlBvbGljeSBGZWVkIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeVJlaW5zdGF0ZW1lbnRGaWxlTEFJU19jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlU3VibWlzc2lvbkRhdGUiOiAiMjAyMS0wNS0yN1QwNjoyNDo1MC41ODhaIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2hlYWRlcl9maWxlQ3JlYXRpb25EYXRlIjogIjIwMjAwNjIwIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2hlYWRlcl90cmFuc2FjdGlvbk1vbnRoIjogIkp1bHkiLAogICJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVQcm9jZXNzaW5nRGF0ZSI6ICIyMDIxLTA1LTI3VDA2OjI0OjU2LjU0NFoiLAogICJjcmVkaXRvckZpbGVfcG9saWN5VW5leHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUNhbmNlbGxhdGlvbkZpbGVMQUlTX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfY3JlZGl0b3JHcm91cEluc3VyYW5jZVBvbGljeU51bWJlciI6ICI4NTI3NTc3OSIsCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXR0ZWRCeSI6ICJGVFAiLAogICJjcmVkaXRvckZpbGVfcGFyZW50RmlsZUlkZW50aWZpZXIiOiAiMDAwMDExNDkiLAogICJjcmVkaXRvclNwbGl0RmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVQcm9jZXNzaW5nRXJyb3JzIjogIkVycm9yOlxuTW9udGhseSBCZW5lZml0IDE1MDAuMCBpcyBub3QgYXBwbGljYWJsZSBmb3IgY292ZXJhZ2UgY29kZSBMSSBmb3IgbWljaGVsIG1pbGxldHRlXG5Nb250aGx5IEJlbmVmaXQgYW1vdW50IDE1MDAuMDAgZm9yIEFEUCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIDAuMDAiLAogICJjcmVkaXRvckZpbGVfZmlsZUlkZW50aWZpZXIiOiAiMDAwMDExNDktODExMDIzLTIwMTgxMTI5ICAxMDozMzo0OS1OZXcgQnVzaW5lc3MiLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19wcm9kdWN0VHlwZSI6ICJTUCIsCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVQcm9jZXNzaW5nU3RhdHVzIjogIkZpbGUgUHJvY2Vzc2VkIFBhcnRpYWxseSIKfQ=="}
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
        })
    }

}