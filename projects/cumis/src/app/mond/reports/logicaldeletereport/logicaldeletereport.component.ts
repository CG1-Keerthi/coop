import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDCommonGetterSetter } from '../../../_services/common';
import { MDMondServiceDS } from '../../../_services/ds/MDMondServiceDS';
import { MDConnectedPartnersDS } from '../../../_services/ds/MDConnectedPartnersDS';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../../_services/constants/MDDateFormate';

@Component({
    selector: 'app-logicaldeletereport-designer',
    templateUrl: './logicaldeletereport.component.html',
    styleUrls: ['./logicaldeletereport.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})

export class LogicalDeleteReportComponent implements OnInit {
    public csfrToken: string;
    public selectedNetPremiumFromDate: string;
    public selectedNetPremiumTillDate: string;
    public downloadData: any;
    public fileUrl: any;
    public isFromDateSubmit: boolean = false;
    public isToDateSubmit: boolean = false;

    @ViewChild('fromDate') fromDate: ElementRef;
    @ViewChild('tillDate') tillDate: ElementRef;



    constructor(private mdMondServiceDS: MDMondServiceDS,
        private mdCommonGetterAndSetter: MDCommonGetterSetter,
        private mdConnectedPartnersDS: MDConnectedPartnersDS,
        private http: HttpClient) { }


    ngOnInit() {
        // debugger;
        this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
            if (data) {
                this.csfrToken = data;
            }
        });
    }

    OnLogicalDeleteFromDateChange(event) {
        debugger
        this.selectedNetPremiumFromDate = this.fromDate.nativeElement.value;
    }

    OnLogicalDeleteTillDateChange(event) {
        debugger;
        this.selectedNetPremiumTillDate = this.tillDate.nativeElement.value;
    }

    onClickOfLogicalDeleteDownload() {
        debugger;
        if(this.fromDate.nativeElement.value == ""){
            this.isFromDateSubmit = true;
            this.mdMondServiceDS.showErrorMessage("Please enter the From Date.");
            return;
        }else{
            this.isFromDateSubmit = false;
        }

        if(this.tillDate.nativeElement.value == ""){
            this.isToDateSubmit = true;
            this.mdMondServiceDS.showErrorMessage("Please enter the To Date.");
            return;
        }else{
            this.isToDateSubmit = false;
        }
        let projectName = 'Reports';
        let serviceName = 'CreateLogicalDeleteReport';
        let version = '1.00';
        let fromDate = this.selectedNetPremiumFromDate + "T00:00:00.000Z";
        let toDate = this.selectedNetPremiumTillDate + "T00:00:00.000Z";
        let context = 'Download';
        let downloadAsFile = 'true';
        let returnByteArrayVariableName = '$fileContent';
        let returnByteArrayFileName = '$fileName';
        let csfrToken = this.csfrToken
        this.invokeMondService(projectName, serviceName, version, fromDate, toDate, context, downloadAsFile, returnByteArrayVariableName, returnByteArrayFileName, csfrToken);
    }



    invokeMondService(projectName: string, serviceName: string, version: string, fromDate: string, toDate: string, context: string, downloadAsFile: string, returnByteArrayVariableName: string, returnByteArrayFileName: string, csfrToken: string) {
        let dataToSend = 'projectName=' + projectName + '&serviceName=' + serviceName + '&version=' + version + '&fromDate=' + fromDate +
            '&toDate=' + toDate + '&context=' +
            context + '&downloadAsFile=' + downloadAsFile + '&returnByteArrayVariableName=' + returnByteArrayVariableName + '&returnByteArrayFileName=' + returnByteArrayFileName + '&csfrToken=' + csfrToken +'&addSessionInfoFlag=' + true;
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
                // var filename="Noname.zip"
            });
    }

    onClickOfLogicalDeleteReset() {
        debugger;
        this.fromDate.nativeElement.value = "";
        this.tillDate.nativeElement.value = "";
    }

}