import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../../_services/ds';
import { MDCommonGetterSetter } from '../../../../_services/common';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-lais-designer',
    templateUrl: './lais.component.html',
    styleUrls: ['./lais.component.css']
})

export class LAISComponent implements OnInit {
    @Input() laisData;
    public certificateRowData: any;

    isShowField: boolean = false;
    public laisDataList: any;
    public laisCertificateList: any;
    public processSummaryRowData: any;
    public csfrToken: any;
    public downloadData: any;
    public fileUrl: any;

    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter,
        private http: HttpClient) { }

    ngOnInit() {
        debugger;
        this.laisDataList = this.laisData;

        if (this.laisDataList.creditorFile_policyReinstatementFileLAIS_certificate.length > 0) {
            this.laisCertificateList = this.laisDataList.creditorFile_policyReinstatementFileLAIS_certificate;
        } else if (this.laisDataList.creditorFile_policyFileLAIS_certificate.length > 0) {
            this.laisCertificateList = this.laisDataList.creditorFile_policyFileLAIS_certificate;
        } else if (this.laisDataList.creditorFile_policyCancellationFileLAIS_certificate.length > 0) {
            this.laisCertificateList = this.laisDataList.creditorFile_policyCancellationFileLAIS_certificate;
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

    onClickOfCertificateDataRow(event) {
        this.certificateRowData = event.data;
    }

    onClickOfPWE(event) {
        if (event.currentTarget.lastElementChild.control.checked == false) {
            this.isShowField = true;
        } else {
            this.isShowField = false;
        }
    }

    onClickOfLAISDownloadErrorreport() {
        this.invokePFDServiceWithDownload(this.processSummaryRowData.fileIdentifier, this.processSummaryRowData.partnerName, this.processSummaryRowData.fileFunctionType, this.csfrToken);
    }


    invokePFDServiceWithDownload(fileIdentifier: any, clientName: any, fileFunctionType: any, csfrToken: any) {
        let dataToSend = 'projectName=' + 'Reports' + '&serviceName=' + 'CreateErrorReport' + '&version=' + '1.00' +
            '&clientName=' + clientName + '&fileIdentifier=' + fileIdentifier + '&fileFunctionType=' + fileFunctionType + '&context=' +
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
                this.mdMondServiceDS.MDError(error);              
            });
    }

}