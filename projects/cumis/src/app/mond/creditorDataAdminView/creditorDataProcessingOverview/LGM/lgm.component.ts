import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../../_services/ds';
import { MDCommonGetterSetter } from '../../../../_services/common';
import { HttpClient } from '@angular/common/http';




@Component({
    selector: 'app-lgm-designer',
    templateUrl: './lgm.component.html',
    styleUrls: ['./lgm.component.css']
})

export class LGMComponent implements OnInit {
    @Input() lgmData;

    public lgmDataList: any;
    public lgmCertificateList: any;
    public lgmCertificateRowData: any;
    public lgmApplicantRowData: any;
    public lgmCoverageData: any;
    public csfrToken: any;
    public downloadData: any;
    public fileUrl: any;
    public processSummaryRowData: any;

    // old code
    laisDataList: any;
    certificateRowData: any

    constructor(private mdMondServiceDS: MDMondServiceDS,
        private http: HttpClient,
        private mdCommonGetterSetter: MDCommonGetterSetter) { }

    ngOnInit() {
        debugger;
        this.lgmDataList = this.lgmData;
        if(this.lgmDataList.creditorFile_policyFileLGM_certificate.length > 0){
            this.lgmCertificateList =  this.lgmDataList.creditorFile_policyFileLGM_certificate;
        }else if(this.lgmDataList.creditorFile_policyReinstetementFileLGM_certificate > 0){
            this.lgmCertificateList =  this.lgmDataList.creditorFile_policyReinstetementFileLGM_certificate;
        }else if(this.lgmDataList.creditorFile_policyCancellationFileLGM_certificate > 0){
            this.lgmCertificateList = this.lgmDataList.creditorFile_policyCancellationFileLGM_certificate;
        } 
        this.mdCommonGetterSetter.getCsfrToken().subscribe(data => {
            if (data) {
                this.csfrToken = data;
            }
        });
        this.mdCommonGetterSetter.getProcessSummaryRowData().subscribe(
            data => {
                this.processSummaryRowData = data;
            });     
    }

    onClickOfLgmCertificateDataRow(event) {
        debugger
        this.lgmCertificateRowData = event.data;
    }

    onClickOfApplicantDataRow(event){
        debugger
        this.lgmApplicantRowData = event.data;
    }

    onClickOfCoverageDataRow(event){
        debugger;
        this.lgmCoverageData = event.data;
    }

    onClickOfLGMDownloaderrorReport(){
        debugger;
        this.invokePFDServiceWithDownload(this.processSummaryRowData.fileIdentifier, this.processSummaryRowData.partnerName,this.processSummaryRowData.fileFunctionType,this.csfrToken);
    }

    invokePFDServiceWithDownload(fileIdentifier: any,clientName:any,fileFunctionType:any,csfrToken: any) {
        let dataToSend = 'projectName=' + 'Reports' + '&serviceName=' + 'CreateErrorReport' + '&version=' + '1.00' +
            '&clientName=' + clientName + '&fileIdentifier=' + fileIdentifier + '&fileFunctionType='+ fileFunctionType + '&context=' +
            'Download' + '&downloadAsFile=' + true + '&returnByteArrayVariableName=' + '$fileContent' + '&returnByteArrayFileName=' + '$fileName'
            + '&csfrToken=' + csfrToken;
        this.http.post("/mondrestws/services/executeService/invokePFDServiceWithDownload", dataToSend, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, responseType: 'blob', observe: 'response' }).subscribe(
            data => {
                console.log("data", data);
                var contentDisposition = data.headers.get('content-disposition');
                console.log("contentDisposition", contentDisposition);
                var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                console.log("filename", filename);
                console.log("Success data onClickOfFileDownload" + JSON.stringify(data));
                console.log("Success data onClickOfFileDownload2" + data);
                this.downloadData = data.body;
                console.log(" data.body", data.body)
                console.dir("data.body", data.body);
                console.log("data.body, JSONParse", JSON.parse(JSON.stringify(data.body)));
                const blob = new Blob([this.downloadData], { type: 'application/xls' });
                console.log("downloadData" + JSON.stringify(this.downloadData));
                this.fileUrl = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.href = this.fileUrl; //data is object received as response
                link.download = JSON.parse(filename);
                console.log("link.download", link.download);
                console.log("link", link)
                link.click();
                console.log("after click on link,link.download", link.download);
            }, error => {
                debugger;
                console.log("error", error);
                this.mdMondServiceDS.MDError(error);
                // var contentDisposition = "Jattachment; filename=TransactionReconcile_FG-08-Sep-2020.xlsx"
                // var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                // var filename="Noname.xls";              
            });
    }

}