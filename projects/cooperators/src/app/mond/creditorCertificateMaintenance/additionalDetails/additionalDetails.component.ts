import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../_services/ds/MDMondServiceDS';
import { MDCommonGetterSetter } from '../../../_services/common';
declare var $: any;

@Component({
  selector: 'app-additionalDetails-designer',
  templateUrl: './additionalDetails.component.html',
  styleUrls: ['./additionalDetails.component.css'],
})

export class additionalDetailsComponent implements OnInit {
  @Input() additionalDetailsData;
  @Input() set param(data) {
    this.params = data;
    if (data.logicalDeleteFlag == true) {
      this.isDeleteBtn = false;
      this.isReverseBtn = true;
    } else {
      this.isDeleteBtn = true;
      this.isReverseBtn = false;
    }
  }

  public additionalDetailsList: any;
  public parsedAdditionalDetailsList: any;
  public isFieldreadonly: boolean = true;
  public csfrToken: any;
  public isDeleteBtn: boolean;
  public isReverseBtn: boolean;
  public modelheader: string;
  public modelTitle: string;
  public params: any;
  @ViewChild('note') note: ElementRef;
  constructor(private mdMondServiceDS: MDMondServiceDS,
    private mdCommonGetterAndSetter: MDCommonGetterSetter) { }


  ngOnInit() {
    debugger;
    this.additionalDetailsList = this.additionalDetailsData;
    this.parsedAdditionalDetailsList = {};
    this.parsedAdditionalDetailsList = JSON.parse(this.additionalDetailsList.creditorDataJson).certificate;
    this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
      if (data) {
        this.csfrToken = data;
      }
    });
    if (this.params.logicalDeleteFlag == true) {
      this.modelheader = 'Please update logical delete reversal Note';
      this.modelTitle = 'Logical Delete Reversal Note';
    } else {
      this.modelheader = 'Please update logical delete notes';
      this.modelTitle = 'Logical delete notes';
    }
  }

  deleteCertificate() {
    let serviceName;
    let formData
    if (this.params.logicalDeleteFlag == true) {
      serviceName = "ReverseDeleteCertificate";
      formData = {
        certificateId: this.params.certificateIdentifier,
        reversalNotes: this.note.nativeElement.value,
        status: "",
        message: "",
        newPolicyStatus: "",
        inputProcessField1: "certificateId",
        inputServiceField1: "certificateId",
        inputProcessField2: "reversalNotes",
        inputServiceField2: "reversalNotes",
        outputProcessField1: "status",
        outputServiceField1: "status",
        outputProcessField2: "message",
        outputServiceField2: "message",
        outputProcessField3: "newPolicyStatus",
        outputServiceField3: "newPolicyStatus"
      }
    } else {
      serviceName = "DeleteCertificate";
      formData = {
        certificateId: this.params.certificateIdentifier,
        deleteNotes: this.note.nativeElement.value,
        status: "",
        message: "",
        newPolicyStatus: "",
        inputProcessField1: "certificateId",
        inputServiceField1: "certificateId",
        inputProcessField2: "deleteNotes",
        inputServiceField2: "deleteNotes",
        outputProcessField1: "status",
        outputServiceField1: "status",
        outputProcessField2: "message",
        outputServiceField2: "message",
        outputProcessField3: "newPolicyStatus",
        outputServiceField3: "newPolicyStatus"
      }
    }

    this.mdMondServiceDS.invokeMondService("Creditor Self Admin", serviceName, "1.00", btoa(JSON.stringify(formData)), this.csfrToken, true, true, true, true).subscribe(
      data => {
        this.mdMondServiceDS.showSuccessMessage(JSON.parse(atob(data)).message);
        if (serviceName == 'DeleteCertificate') {
          this.isDeleteBtn = false;
          this.isReverseBtn = true;
        } else {
          this.isDeleteBtn = true;
          this.isReverseBtn = false;
        }
      },
      error => {
        this.mdMondServiceDS.MDError(error);
        // let data = "eyJtZXNzYWdlIjoiQ2VydGlmaWNhdGUgRGVsZXRpb24gUmV2ZXJzZWQgU3VjY2Vzc2Z1bGx5Iiwic3RhdHVzIjoiU3VjY2VzcyJ9"
      });
  }

}