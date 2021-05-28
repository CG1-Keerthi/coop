import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../../_services/ds';
import { MDCommonGetterSetter } from '../../../../_services/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-lgmTwo-designer',
    templateUrl: './lgmTwo.component.html',
    styleUrls: ['./lgmTwo.component.css']
})

export class lgmTwoComponent implements OnInit {
    @Input() processingOverviewData;

    isShowField: boolean = false;
    public LGMTwoData: any;
    public lgmTwoDataCertificate: any;
    public lgmTwoCertificateDetails: any;
    public processSummaryRowData: any;
    public csfrToken: any;
    public downloadData: any;
    public fileUrl: any;
    public processWithErrors: boolean;


    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.LGMTwoData = this.processingOverviewData;
        if (this.LGMTwoData.creditorFile_policyFileLGM2_certificate.length > 0) {
            this.lgmTwoDataCertificate = this.LGMTwoData.creditorFile_policyFileLGM2_certificate;
        } else if (this.LGMTwoData.creditorFile_policyExpiredFileLGM2_certificate.length > 0) {
            this.lgmTwoDataCertificate = this.LGMTwoData.creditorFile_policyExpiredFileLGM2_certificate;
        } else if (this.LGMTwoData.creditorFile_policyUnexpiredFileLGM2_certificate.length > 0) {
            this.lgmTwoDataCertificate = this.LGMTwoData.creditorFile_policyUnexpiredFileLGM2_certificate;
        } else if (this.LGMTwoData.creditorFile_policyCancellationFileLGM2_certificate.length > 0) {
            this.lgmTwoDataCertificate = this.LGMTwoData.creditorFile_policyCancellationFileLGM2_certificate;
        } else if (this.LGMTwoData.creditorFile_policyReinstatementFileLGM2_certificate.length > 0) {
            this.lgmTwoDataCertificate = this.LGMTwoData.creditorFile_policyReinstatementFileLGM2_certificate;
        }

        if(this.LGMTwoData.creditorFile_policyFileLGM2_header_processedWithErrors != undefined){
            this.processWithErrors = this.LGMTwoData.creditorFile_policyFileLGM2_header_processedWithErrors;
        }else if(this.LGMTwoData.creditorFile_policyExpiredFileLGM2_header_processedWithErrors != undefined){
            this.processWithErrors = this.LGMTwoData.creditorFile_policyExpiredFileLGM2_header_processedWithErrors;
        }else if(this.LGMTwoData.creditorFile_policyUnexpiredFileLGM2_header_processedWithErrors != undefined){
            this.processWithErrors = this.LGMTwoData.creditorFile_policyUnexpiredFileLGM2_header_processedWithErrors;
        }else if(this.LGMTwoData.creditorFile_policyCancellationFileLGM2_header_processedWithErrors != undefined){
            this.processWithErrors =  this.LGMTwoData.creditorFile_policyCancellationFileLGM2_header_processedWithErrors
        }else if(this.LGMTwoData.creditorFile_policyReinstatementFileLGM2_header_processedWithErrors != undefined){
            this.processWithErrors = this.LGMTwoData.creditorFile_policyReinstatementFileLGM2_header_processedWithErrors
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

    onClickOfPWE(event) {
        if (event.currentTarget.lastElementChild.control.checked == false || this.processWithErrors == true) {
            this.isShowField = true;
        } else {
            this.isShowField = false;
        }
    }
    onClickOflgmTwoCertificateRow(event) {
        this.lgmTwoCertificateDetails = event.data;
    }

    onClickOfLgmTwoDownloadErrorReport(){
        this.invokePFDServiceWithDownload('CreateErrorReport',this.processSummaryRowData.fileIdentifier, this.processSummaryRowData.partnerName, this.processSummaryRowData.fileFunctionType, this.csfrToken,null);
    }

    onClickOfLgmTwoDownloadwarningReport(){
        this.invokePFDServiceWithDownload('CreateWarningReport',this.processSummaryRowData.fileIdentifier, this.processSummaryRowData.partnerName, this.processSummaryRowData.fileFunctionType, this.csfrToken,'Premium');
    }

    invokePFDServiceWithDownload(serviceName: any,fileIdentifier: any, clientName: any, fileFunctionType: any, csfrToken: any, warningContext: any) {
        let dataToSend
        if(warningContext == null){
       dataToSend = 'projectName=' + 'Reports' + '&serviceName=' + serviceName + '&version=' + '1.00' +
        '&clientName=' + clientName + '&fileIdentifier=' + fileIdentifier + '&fileFunctionType=' + fileFunctionType + '&context=' +
        'Download' + '&downloadAsFile=' + true + '&returnByteArrayVariableName=' + '$fileContent' + '&returnByteArrayFileName=' + '$fileName'
        + '&csfrToken=' + csfrToken;
       }else{
        dataToSend = 'projectName=' + 'Reports' + '&serviceName=' + serviceName + '&version=' + '1.00' +
        '&clientName=' + clientName + '&fileIdentifier=' + fileIdentifier + '&fileFunctionType=' + fileFunctionType + '&context=' +
        'Download' + '&warningContext='+ warningContext +'&downloadAsFile=' + true + '&returnByteArrayVariableName=' + '$fileContent' + '&returnByteArrayFileName=' + '$fileName'
        + '&csfrToken=' + csfrToken; 
       }
        
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
                this.mdMondServiceDS.MDError(error);           
            });
    }

}