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
            // let data = {"key":"key","value":"eyJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUNyZWxvZ2l4X3BvbGljeURhdGEiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0YXRlbWVudEZpbGVMR00yX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlX3BvbGljeUNhbmNlbGxhdGlvbkZpbGVMR00yX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlX3BvbGljeUNhbmNlbGxhdGlvbkZpbGVMR01fY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlRnVuY3Rpb25UeXBlIjoiUG9saWN5IEZlZWQiLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0ZXRlbWVudEZpbGVMR01fY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0YXRlbWVudEZpbGVMQUlTX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVN1Ym1pc3Npb25EYXRlIjoiMjAyMS0wNS0yMVQxMzoxNTo1MS45NDVaIiwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fYmFsYW5jaW5nSW5mbyI6W3sidHJhbnNhY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIiwidG90YWxOdW1iZXJPZlJlY29yZHMiOjEsIm51bWJlck9mUmVjb3Jkc0luRXJyb3IiOjAsInRvdGFsTnVtYmVyT2ZEdXBsaWNhdGVSZWNvcmRzIjowLCJudW1iZXJPZlJlY29yZHNQb3N0ZWQiOjF9XSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdEYXRlIjoiMjAyMS0wNS0yMVQxMzoyMTozNy40NzFaIiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMQUlTX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fcGFydG5lck5hbWUiOiJMR00iLCJjcmVkaXRvckZpbGVfcG9saWN5VW5leHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5Q2FuY2VsbGF0aW9uRmlsZUxBSVNfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlU3VibWl0dGVkQnkiOiJGVFAiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlTmFtZSI6IkV4dHJhY3QgMjAyMTA0MDEgdG8gMjAyMTA0MzAgLSBSYXRlU3RydWN0dXJlIC0gRXJyb3JUZXN0Y2FzZTEueGxzeCIsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVJZGVudGlmaWVyIjoiMDAwMDExMjEiLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTV9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX3Byb2R1Y3RUeXBlIjoiU1AiLCJjcmVkaXRvckZpbGVfcG9saWN5RXhwaXJlZEZpbGVMR00yX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIFByb2Nlc3NlZCBDb21wbGV0ZWx5In0\u003d"}
            // let data = {"key":"key","value":"ewogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19udW1iZXJPZlJlY29yZHNJbkVycm9yIjogNywKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdFcnJvcnMiOiAiXG5Ob3QgYSB2YWxpZCBkYXRlIHZhbHVlLi4gSW52YWxpZCB2YWx1ZSAnMy0zMC0yMDE1JyBmb3IgJ0Vucm9sbG1lbnREYXRlJyBmb3IgcmVjb3JkICcyJy5cbk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTMwLTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzInLlxuTm90IGEgdmFsaWQgZGF0ZSB2YWx1ZS4uIEludmFsaWQgdmFsdWUgJzMtMjctMjAxNScgZm9yICdFbnJvbGxtZW50RGF0ZScgZm9yIHJlY29yZCAnMycuXG5Ob3QgYSB2YWxpZCBkYXRlIHZhbHVlLi4gSW52YWxpZCB2YWx1ZSAnMy0yNy0yMDE1JyBmb3IgJ0Vucm9sbG1lbnREYXRlJyBmb3IgcmVjb3JkICczJy5cbk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTI3LTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzQnLlxuTm90IGEgdmFsaWQgZGF0ZSB2YWx1ZS4uIEludmFsaWQgdmFsdWUgJzMtMjctMjAxNScgZm9yICdFbnJvbGxtZW50RGF0ZScgZm9yIHJlY29yZCAnNCcuXG5Ob3QgYSB2YWxpZCBkYXRlIHZhbHVlLi4gSW52YWxpZCB2YWx1ZSAnMy0yNy0yMDE1JyBmb3IgJ0Vucm9sbG1lbnREYXRlJyBmb3IgcmVjb3JkICc1Jy5cbk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTI3LTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzUnLlxuTm90IGEgdmFsaWQgZGF0ZSB2YWx1ZS4uIEludmFsaWQgdmFsdWUgJzMtMjYtMjAxNScgZm9yICdFbnJvbGxtZW50RGF0ZScgZm9yIHJlY29yZCAnNicuXG5Ob3QgYSB2YWxpZCBkYXRlIHZhbHVlLi4gSW52YWxpZCB2YWx1ZSAnMy0yNi0yMDE1JyBmb3IgJ0Vucm9sbG1lbnREYXRlJyBmb3IgcmVjb3JkICc2Jy5cbk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTI0LTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzcnLlxuTm90IGEgdmFsaWQgZGF0ZSB2YWx1ZS4uIEludmFsaWQgdmFsdWUgJzMtMjQtMjAxNScgZm9yICdFbnJvbGxtZW50RGF0ZScgZm9yIHJlY29yZCAnNycuXG5Ob3QgYSB2YWxpZCBkYXRlIHZhbHVlLi4gSW52YWxpZCB2YWx1ZSAnMy0xNi0yMDE1JyBmb3IgJ0Vucm9sbG1lbnREYXRlJyBmb3IgcmVjb3JkICc4Jy5cbk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTE2LTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzgnLiIsCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlQ3JlbG9naXhfcG9saWN5RGF0YSI6IFsKICAgIHsKICAgICAgImxpZmVQcmVtaXVtQW1vdW50Q29BcHBsaWNhbnQiOiAiMCIsCiAgICAgICJkaXNhYmlsaXR5VHlwZSI6ICJEaXNhYmlsaXR5IC0gTm9uLVJldHJvQWN0aXZlIiwKICAgICAgImxvYW5BbW50IjogIjMzMDAiLAogICAgICAibGlmZVJlc2lkdWFsUHJlbWl1bUFtb3VudCI6ICIwIiwKICAgICAgImNvQXBwbGljYW50UHJvdmluY2UiOiAiT04iLAogICAgICAiZW5yb2xsbWVudERhdGUiOiAiMy0zMC0yMDE1IiwKICAgICAgImNvQXBwbGljYW50Rmlyc3ROYW1lIjogIkZyZWQiLAogICAgICAibWVyY2hhbnROYW1lMiI6ICJERVJFSyBTUk9LT1dTS0kgREVOVElTVFJZIFBST0ZFU1NJT05BTCBDT1JQLiIsCiAgICAgICJhcHBsaWNhbnRDaXR5IjogIkhhbWlsdG9uIiwKICAgICAgImFwcGxpY2FudERhdGVPZkJpcnRoIjogIjEyLzI1LzE5NDMiLAogICAgICAibWVyY2hhbnROYW1lIjogIkhJR0hMQU5EIERFTlRBTCBDRU5UUkUiLAogICAgICAiY3JpdGljYWxJbGxuZXNzQW1vdW50IjogIjAiLAogICAgICAibWVyY2hhbnRBZGRyZXNzMSI6ICIxMzkgVVBQRVIgQ0VOVEVOTklBTCBQS1dZIiwKICAgICAgInBvbGljeUVhcmx5VGVybWluYXRpb25BbW91bnQiOiAiMCIsCiAgICAgICJsb3NzT2ZFbXBsb3ltZW50IjogIjIwNS4wNSIsCiAgICAgICJtZXJjaGFudFBvc3RhbENvZGUiOiAiTDhKIDJUNyIsCiAgICAgICJhcHBsaWNhbnRMTmFtZSI6ICJNYXJ0aW4iLAogICAgICAiYXByIjogIjE0Ljk5IiwKICAgICAgImNvQXBwbGljYW50Q2l0eSI6ICJIYW1pbHRvbiIsCiAgICAgICJtZXJjaGFudENpdHkiOiAiU1RPTkVZIENSRUVLIiwKICAgICAgImFwcGxpY2FudEZpcnN0TmFtZSI6ICJSYXltb25kIiwKICAgICAgImFtb3VudEZpbmFuY2UiOiAiNDAxMy4xMSIsCiAgICAgICJhcHBsaWNhbnRQcm92aW5jZSI6ICJPTiIsCiAgICAgICJhcHBsaWNhbnRQb3N0YWxDb2RlIjogIkw4ViAxWjYiLAogICAgICAiaW5zdXJlZFBlcnNvbiI6ICJBcHBsaWNhbnQiLAogICAgICAiY29BcHBsaWNhbnRQb3N0YWxDb2RlIjogIkw4ViAxWjYiLAogICAgICAibGlmZVJlc2lkdWFsUHJlbWl1bUFtb3VudENvQXBwbGljYW50IjogIjAiLAogICAgICAiYXBwbGljYXRpb25JZCI6ICIyNjYyOTY0MCIsCiAgICAgICJhcHBsaWNhbnRIb21lUGhvbmUiOiAiMjg5MjQ0MDAwOCIsCiAgICAgICJjb0FwcGxpY2FudExOYW1lIjogIk1hcnRpbiIsCiAgICAgICJkaXNhYmlsaXR5QW1vdW50IjogIjI4OC4wMyIsCiAgICAgICJjb0FwcGxpY2FudERhdGVPZkJpcnRoIjogIjEwLzMwLzE5ODQiLAogICAgICAicmVjb3JkRXJyb3JzIjogIk5vdCBhIHZhbGlkIGRhdGUgdmFsdWUuLiBJbnZhbGlkIHZhbHVlICczLTMwLTIwMTUnIGZvciAnRW5yb2xsbWVudERhdGUnIGZvciByZWNvcmQgJzInLlxuTm90IGEgdmFsaWQgZGF0ZSB2YWx1ZS4uIEludmFsaWQgdmFsdWUgJzMtMzAtMjAxNScgZm9yICdFbnJvbGxtZW50RGF0ZScgZm9yIHJlY29yZCAnMicuIiwKICAgICAgInRheE9uSW5zdXJhbmNlIjogIjUyLjgyIiwKICAgICAgImxpZmVBbW91bnQiOiAiMTY3LjIxIiwKICAgICAgImNvQXBwbGljYW50QWRkcmVzcyI6ICIxMTMgSGFsYW0gYXZlIiwKICAgICAgInRlcm0iOiAiNjAiLAogICAgICAibW9udGhseUxvYW5QYXltZW50IjogIjk1LjQ1IiwKICAgICAgImNyaXRpY2FsSWxsbmVzc1Jlc2lkdWFsQW1vdW50Q29BcHBsaWNhbnQiOiAiMCIsCiAgICAgICJsb2FuUHJvdGVjdGlvblRlcm0iOiAiNjAiLAogICAgICAicHJvY2Vzc2VkV2l0aEVycm9ycyI6ICJOIiwKICAgICAgImNsaWVudElkIjogIkQ3MDM4MCIsCiAgICAgICJhcHBsaWNhbnRBZGRyZXNzIjogIjExMyBIYWxhbSBhdmUiLAogICAgICAibWVyY2hhbnRQcm92aW5jZSI6ICJPTiIsCiAgICAgICJsaWZlUHJlbWl1bUFtb3VudCI6ICIwIiwKICAgICAgImFwcGxpY2FudEVtYWlsIjogInJheXJheW1hcnRpbjE5NDNAeWFob28uY2EiLAogICAgICAiY29BcHBsaWNhbnRFbWFpbCI6ICJmZGF3ZzE1QGhvdG1haWwuY29tIiwKICAgICAgImNvQXBwbGljYW50SG9tZVBob25lIjogIjI4OTI0NDAwMDgiLAogICAgICAiZXh0RGlzYWJpbGl0eUFtb3VudCI6ICIwIiwKICAgICAgImNyaXRpY2FsSWxsbmVzc1Jlc2lkdWFsQW1vdW50IjogIjAiCiAgICB9CiAgXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeVJlaW5zdGF0ZW1lbnRGaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6IFtdLAogICJjcmVkaXRvckZpbGVfcG9saWN5Q2FuY2VsbGF0aW9uRmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUNhbmNlbGxhdGlvbkZpbGVMR01fY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeVJlaW5zdGV0ZW1lbnRGaWxlTEdNX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX251bWJlck9mUmVjb3Jkc1Bvc3RlZCI6IDEsCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2JhbGFuY2luZ0luZm8iOiBbXSwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fdG90YWxOdW1iZXJPZkR1cGxpY2F0ZVJlY29yZHMiOiAwLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0RhdGUiOiAiMjAyMS0wNS0xOVQxMzo1ODozMy40MTdaIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMQUlTX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX3BhcnRuZXJOYW1lIjogIkNyZWxvZ2l4IiwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZU5hbWUiOiAiQ29vcGVyYXRvcnMgRXh0cmFjdCAyMDE1MDMzMCAoVVRGLTgpIC0gRXJyb3JUZW1wLnR4dCIsCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVJZGVudGlmaWVyIjogIjAwMDAxMDcwIiwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR00yX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZV9wb2xpY3lFeHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZUZ1bmN0aW9uVHlwZSI6ICJOZXcgQnVzaW5lc3MiLAogICJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0YXRlbWVudEZpbGVMQUlTX2NlcnRpZmljYXRlIjogWwogIHsKICAidHJhbnNhY3Rpb25UeXBlIjogInRyYW5zYWN0aW9uVHlwZSIsCiAgInBvbGljeU51bWJlciI6IjEyIiwKICAicGxhbkNvZGUiOiIxMTEiCiAgfQogIF0sCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXNzaW9uRGF0ZSI6ICIyMDIxLTA1LTE5VDEzOjU4OjMzLjQxN1oiLAogICJjcmVkaXRvckZpbGVfcG9saWN5VW5leHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOiBbXSwKICAiY3JlZGl0b3JGaWxlX3BvbGljeUNhbmNlbGxhdGlvbkZpbGVMQUlTX2NlcnRpZmljYXRlIjogW10sCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXR0ZWRCeSI6ICJGVFAiLAogICJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb190b3RhbE51bWJlck9mUmVjb3JkcyI6IDgsCiAgImNyZWRpdG9yRmlsZV9maWxlSWRlbnRpZmllciI6ICIwMDAwMTA3MCIsCiAgImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX3Byb2R1Y3RUeXBlIjogIlNQIiwKICAiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiAiRmlsZSBwcm9jZXNzZWQgd2l0aCBlcnJvcnMiLAogICJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxBSVNfaGVhZGVyX3RyYW5zYWN0aW9uTW9udGgiOiJtYXkiCiAgCn0="}
            let data = {"key":"key","value":"eyJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19udW1iZXJPZlJlY29yZHNJbkVycm9yIjowLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlUHJvY2Vzc2luZ0Vycm9ycyI6IkR1cGxpY2F0ZSAtIENlcnRpZmljYXRlIG5vLiA5MDAyNTk3IGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkIG9uIDIwMjEtMDUtMDQgMDY6NTY6NTUuMER1cGxpY2F0ZSAtIENlcnRpZmljYXRlIG5vLiA5MDAyNjk3IGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkIG9uIDIwMjEtMDUtMDQgMDY6NTY6NTUuMER1cGxpY2F0ZSAtIENlcnRpZmljYXRlIG5vLiA5MDAyNzk3IGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkIG9uIDIwMjEtMDUtMDQgMDY6NTY6NTUuMCIsImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlQ3JlbG9naXhfcG9saWN5RGF0YSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lSZWluc3RhdGVtZW50RmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTV9oZWFkZXJfcmVjb3JkQ291bnQiOiIwMDAwMDAxOCIsImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEdNX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR01faGVhZGVyX2N1bWlzUHJvZHVjdFR5cGVDb2RlIjoiU1AiLCJjcmVkaXRvckZpbGVfcG9saWN5UmVpbnN0ZXRlbWVudEZpbGVMR01fY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19udW1iZXJPZlJlY29yZHNQb3N0ZWQiOjAsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2JhbGFuY2luZ0luZm8iOltdLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb190b3RhbE51bWJlck9mRHVwbGljYXRlUmVjb3JkcyI6MywiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdEYXRlIjoiMjAyMS0wNS0wNVQwODoyMDoyMS4zMzNaIiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMQUlTX2NlcnRpZmljYXRlIjpbXSwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fcGFydG5lck5hbWUiOiJMR00iLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlTmFtZSI6IkxHTV9OZXdCdXNpbmVzcy0zUmVjX1Byb3Blci1NYXhQZXJtaXNzaWJsZUVmZmVjdGl2ZURhdGUtRnV0dXJlLnR4dCIsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVJZGVudGlmaWVyIjoiMDAwMDA5MzYiLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTTJfY2VydGlmaWNhdGUiOlt7ImxvYW5UZXJtIjoiMDg0IiwibG9hbkFjY291bnROdW1iZXIiOiIwMDAwMDAwMDAwMDAiLCJyZXNpZHVhbFBheW1lbnRBbW91bnQiOiIwMDAwMDEwMC4wMCIsInBsYW5Db2RlIjoiSGlnaCBSYXRlIFRhYmxlIiwibG9hblBheW1lbnRGcmVxdWVuY3kiOiIxMiJ9LHsibG9hblRlcm0iOiIwNjAiLCJsb2FuQWNjb3VudE51bWJlciI6IjAwMDAwMDAwMDAwMCIsInJlc2lkdWFsUGF5bWVudEFtb3VudCI6IjAwMDAwMjAwLjAwIiwicGxhbkNvZGUiOiJIaWdoIFJhdGUgVGFibGUiLCJsb2FuUGF5bWVudEZyZXF1ZW5jeSI6IjEyIn0seyJsb2FuVGVybSI6IjA4NCIsImxvYW5BY2NvdW50TnVtYmVyIjoiOTk1OTUwMCIsInJlc2lkdWFsUGF5bWVudEFtb3VudCI6IjAwMDAwMzAwLjAwIiwicGxhbkNvZGUiOiJIaWdoIFJhdGUgVGFibGUiLCJsb2FuUGF5bWVudEZyZXF1ZW5jeSI6IjEyIn1dLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTV9oZWFkZXJfcG9saWN5Q291bnQiOiIwMDAwMDAwMyIsImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNX2NlcnRpZmljYXRlIjpbeyJhbW9ydGl6YXRpb25Jbk1vbnRocyI6IjAwMCIsImxvYW5UeXBlIjoiMDEiLCJyZWNvcmRFcnJvcnMiOiJEdXBsaWNhdGUgLSBDZXJ0aWZpY2F0ZSBuby4gOTAwMjU5NyBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZCBvbiAyMDIxLTA1LTA0IDA2OjU2OjU1LjAiLCJwb2xpY3lOdW1iZXIiOiI5MDAyNTk3IiwiaXNGaW5hbmNlZCI6IlkiLCJwcmVtaXVtUGF5bWVudEZyZXF1ZW5jeSI6Ijk5IiwicGF5bWVudEZyZXF1ZW5jeSI6IjEyIiwibG9hblR5cGVDYXRlZ29yeSI6IjAxIiwiY2FsY3VsYXRlUHJvcG9ydGlvbmFsUHJlbWl1bSI6Ik4iLCJjb250cmFjdElkZW50aWZpZXIiOiJIaWdoIFJhdGUgVGFibGUiLCJyZXNpZHVhbFBheW1lbnRBbW91bnQiOiIwMDAwMDEwMC4wMCIsIm91dHN0YW5kaW5nQmFsYW5jZSI6IjAwMDAwMDAwMDAwIiwiaW50ZXJlc3RSYXRlIjoiMDAuMDAwIiwicGVyaW9kaWNQYXltZW50IjoiMDAwMDAzNTEuMTMiLCJ1bmlxdWVLZXkiOiIyNjgyNDgyIiwidHJhbnNpdEJyYW5jaE51bWJlciI6IjAwMDAwIiwidGVybUluTW9udGhzIjoiMDg0IiwibG9hbkFtb3VudCI6IjAwMDI5NDQ0LjY5IiwiY29tcG91bmRGcmVxdWVuY3kiOiIxMiIsImFwcGxpY2FudCI6W3siY292ZXJhZ2UiOlt7ImNvdmVyYWdlb3JCZW5lZml0QW1vdW50IjoiMDAwMDAzNTEuMTMiLCJjb3ZlcmFnZVR5cGUiOiIwMiIsInByZW1pdW0iOiIwMDAwMTgwMi43MyIsImlzU21va2VyIjoiUyIsImFwcGxpY2FudFR5cGUiOiIwMSIsInVuaXF1ZUtleSI6IjI2ODI0ODIiLCJjb3ZlcmFnZUVmZmVjdGl2ZURhdGUiOiIyMDIwMDMzMCIsInByZW1pdW1UYXgiOiIwMDAwMDE2Mi4yNSIsImNvdmVyYWdlVGVybWluYXRpb25EYXRlIjoiOTk5OTEyMzEifV0sImxhc3ROYW1lIjoiRGVzYmllbnMiLCJjb3VudHJ5IjoiQ0EiLCJjb21tdW5pY2F0aW9uTGFuZ3VhZ2UiOiJFIiwiZ2VuZGVyIjoiTSIsImNpdHkiOiJTYWludC1BbHBob25zZSIsInVuaXF1ZUtleSI6IjI2ODI0ODIiLCJjb3JyZXNwb25kZW5jZUxhbmd1YWdlIjoiRSIsInBvc3RhbENvZGUiOiJnMGMydjAiLCJob21lUGhvbmUiOiI0MTgzODgxMzAzIiwiYmlydGhEYXRlIjoiMTk3MTA1MjkiLCJmaXJzdE5hbWUiOiJDaHd3d3RpYW4iLCJpc1Ntb2tlciI6IlMiLCJhcHBsaWNhbnRUeXBlIjoiMDEiLCJzdHJlZXQiOiIyMTUgQ2ggZGVzIFJ1aXNzZWF1eCBPdWVzdCIsInByb3ZpbmNlU3RhdGVDb2RlIjoiUUMifV0sImNVQnJhbmNoSWRlbnRpZmllciI6Ijg1MTc3MjQ2IiwibG9hbkFjY291bnROdW1iZXIiOiIwMDAwMDAwMDAwMDAiLCJ0cmFuc2l0SW5zdGl0dXRpb25OdW1iZXIiOiIwMDAiLCJkcmF3RGF5IjoiMDAiLCJlZmZlY3RpdmVEYXRlIjoiMjAyMTA2MzAifV0sImNyZWRpdG9yRmlsZV9wb2xpY3lFeHBpcmVkRmlsZUxHTTJfY2VydGlmaWNhdGUiOltdLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19maWxlRnVuY3Rpb25UeXBlIjoiTmV3IEJ1c2luZXNzIiwiY3JlZGl0b3JGaWxlX3BvbGljeVJlaW5zdGF0ZW1lbnRGaWxlTEFJU19jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXNzaW9uRGF0ZSI6IjIwMjEtMDUtMDVUMDg6MjA6MTUuNDAzWiIsImNyZWRpdG9yRmlsZV9wb2xpY3lGaWxlTEdNMl9oZWFkZXJfZmlsZUNyZWF0aW9uRGF0ZSI6IjIwMjAwNDI2IiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR01faGVhZGVyX2NyZWRpdFVuaW9uSWRlbnRpZmllciI6Ijg1Mjc1Nzc5IiwiY3JlZGl0b3JGaWxlX3BvbGljeUZpbGVMR01faGVhZGVyX2ZpbGVDcmVhdGlvbkRhdGUiOiIyMDIwMDQyNiIsImNyZWRpdG9yRmlsZV9wb2xpY3lVbmV4cGlyZWRGaWxlTEdNMl9jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZV9wb2xpY3lDYW5jZWxsYXRpb25GaWxlTEFJU19jZXJ0aWZpY2F0ZSI6W10sImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX2ZpbGVTdWJtaXR0ZWRCeSI6IkZUUCIsImNyZWRpdG9yRmlsZVByb2Nlc3NpbmdJbmZvX3RvdGFsTnVtYmVyT2ZSZWNvcmRzIjozLCJjcmVkaXRvckZpbGVfcG9saWN5RmlsZUxHTV9oZWFkZXJfY3JlZGl0VW5pb25OYW1lIjoiTEdNIiwiY3JlZGl0b3JGaWxlX2ZpbGVJZGVudGlmaWVyIjoiMDAwMDA5MzYiLCJjcmVkaXRvckZpbGVQcm9jZXNzaW5nSW5mb19wcm9kdWN0VHlwZSI6IlNQIiwiY3JlZGl0b3JGaWxlUHJvY2Vzc2luZ0luZm9fZmlsZVByb2Nlc3NpbmdTdGF0dXMiOiJGaWxlIHByb2Nlc3NlZCB3aXRoIGVycm9ycyJ9"}
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
           

        }
    )
    }

}