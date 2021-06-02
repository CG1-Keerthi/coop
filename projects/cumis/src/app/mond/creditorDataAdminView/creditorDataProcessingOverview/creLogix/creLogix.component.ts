import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MDMondServiceDS } from '../../../../_services/ds'
import { MDCommonGetterSetter } from '../../../../_services/common';



@Component({
    selector: 'app-creLogix-designer',
    templateUrl: './creLogix.component.html',
    styleUrls: ['./creLogix.component.css']
})

export class CreLogixComponent implements OnInit {
    @Input() creLogixData;
    public creLogixList: any;
    public policyDetailsList: any;
    public downloadData: any;
    public fileUrl: any;
    public processSummaryRowData: any;
    public csfrToken: any;
    public isResizeTrue: boolean = false;
    constructor(private http: HttpClient,
        private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterSetter: MDCommonGetterSetter) { }

    ngOnInit() {
        debugger;
        this.creLogixList = this.creLogixData;
        this.mdCommonGetterSetter.getProcessSummaryRowData().subscribe(
            data =>{
                this.processSummaryRowData = data;
            });
           this.mdCommonGetterSetter.getCsfrToken().subscribe(data => {
          if (data) {
            this.csfrToken = data;
          }
        });
    }

    onClickOfPolicyDataRow(event) {
        this.policyDetailsList = event.data;
    }


    onClickOfDownloadErrorreport() {
        this.invokePFDServiceWithDownload(this.processSummaryRowData.fileIdentifier, this.csfrToken);
    }


    invokePFDServiceWithDownload(fileIdentifier: any, csfrToken: any) {
        let dataToSend = 'projectName=' + 'Reports' + '&serviceName=' + 'CreateErrorReport' + '&version=' + '1.00' +
            '&clientName=' + 'Crelogix' + '&fileIdentifier=' + fileIdentifier + '&context=' +
            'Download' + '&downloadAsFile=' + true + '&returnByteArrayVariableName=' + '$fileContent' + '&returnByteArrayFileName=' + '$fileName'
            + '&csfrToken=' + csfrToken;
        this.http.post("/mondrestws/services/executeService/invokePFDServiceWithDownload", dataToSend, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }, responseType: 'blob', observe: 'response' }).subscribe(
            data => {
                // console.log("data", data);
                var contentDisposition = data.headers.get('content-disposition');
                // console.log("contentDisposition", contentDisposition);
                var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                // console.log("filename", filename);
                // console.log("Success data onClickOfFileDownload" + JSON.stringify(data));
                // console.log("Success data onClickOfFileDownload2" + data);
                this.downloadData = data.body;
                // console.log(" data.body", data.body)
                // console.dir("data.body", data.body);
                // console.log("data.body, JSONParse", JSON.parse(JSON.stringify(data.body)));
                const blob = new Blob([this.downloadData], { type: 'application/xls' });
                // console.log("downloadData" + JSON.stringify(this.downloadData));
                this.fileUrl = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.href = this.fileUrl; //data is object received as response
                link.download = JSON.parse(filename);
                // console.log("link.download", link.download);
                // console.log("link", link)
                link.click();
                // console.log("after click on link,link.download", link.download);
            }, error => {
                this.mdMondServiceDS.MDError(error);
            });
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