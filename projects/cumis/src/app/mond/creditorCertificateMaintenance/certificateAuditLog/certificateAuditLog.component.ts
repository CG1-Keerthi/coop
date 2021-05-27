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

        Array.prototype.push.apply(applicantLoanAuditHistory, applicantCoverageAuditHistory);
        Array.prototype.push.apply(applicantAddressAuditHistory, applicantAuditHistory);
        Array.prototype.push.apply(applicantCreditorAuditHistory, applicantGrpPlcyHolderAuditHistory);
        Array.prototype.push.apply(applicantLoanAuditHistory, applicantAddressAuditHistory);
        Array.prototype.push.apply(applicantLoanAuditHistory,applicantCreditorAuditHistory);
        this.certificateAuditHistory = [];
        this.certificateAuditHistory = applicantLoanAuditHistory;
   }

}


