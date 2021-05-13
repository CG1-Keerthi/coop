import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-certificateAuditLog-designer',
    templateUrl: './certificateAuditLog.component.html',
    styleUrls: ['./certificateAuditLog.component.css'],
})

export class CertificateAuditLogComponent implements OnInit {
    @Input() auditLogData
    @Input() auditHistoryData

    public auditLogList: any;
    public parsedAuditLogList: any;
    public auditHistoryList: any;
    public parsedAuditHistoryData: any;
    public certificateAuditHistory: any;
    public isFieldreadonly: boolean = true;
    constructor() { }

    ngOnInit() {
        debugger;
        this.auditLogList = this.auditLogData;
        this.parsedAuditLogList = [];
        this.parsedAuditLogList = JSON.parse(this.auditLogList.certificateData).certificateHistory;

        // auditHistory   
        this.auditHistoryList = this.auditHistoryData;
        this.parsedAuditHistoryData = JSON.parse(this.auditHistoryList.auditHistoryJson).auditHistoryData;
        let applicantCoverageAuditHistory = this.parsedAuditHistoryData.applicantCoverageAuditHistory;
        let applicantLoanAuditHistory = this.parsedAuditHistoryData.applicantLoanAuditHistory;
        let applicantAddressAuditHistory = this.parsedAuditHistoryData.applicantAddressAuditHistory;
        let applicantAuditHistory = this.parsedAuditHistoryData.applicantAuditHistory;
        let applicantCreditorAuditHistory = this.parsedAuditHistoryData.applicantCreditorAuditHistory;
        let applicantGrpPlcyHolderAuditHistory = this.parsedAuditHistoryData.applicantGrpPlcyHolderAuditHistory;

        Array.prototype.push.apply(applicantCoverageAuditHistory, applicantLoanAuditHistory);
        Array.prototype.push.apply(applicantAddressAuditHistory, applicantAuditHistory);
        Array.prototype.push.apply(applicantCreditorAuditHistory, applicantGrpPlcyHolderAuditHistory);
        console.log('applicantCoverageAuditHistory', applicantCoverageAuditHistory);
        console.log('applicantAddressAuditHistory', applicantAddressAuditHistory);
        console.log('applicantCreditorAuditHistory', applicantCreditorAuditHistory);

        Array.prototype.push.apply(applicantCoverageAuditHistory, applicantAddressAuditHistory);
        console.log('applicantCoverageAuditHistory2', applicantCoverageAuditHistory);
        Array.prototype.push.apply(applicantCoverageAuditHistory, applicantCreditorAuditHistory);
        console.log('applicantCoverageAuditHistory3', applicantCoverageAuditHistory);
        this.certificateAuditHistory = [];
        this.certificateAuditHistory = applicantCoverageAuditHistory;


    }




}


