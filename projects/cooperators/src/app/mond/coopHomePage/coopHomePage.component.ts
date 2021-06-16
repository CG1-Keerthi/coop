import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { MDApplicationDetailsDS } from '../../_services/ds';
import { Router } from '@angular/router';
import { MDMondServiceDS } from '../../_services/ds';

@Component({
    selector: 'app-coopHomePage-designer',
    templateUrl: './coopHomePage.component.html',
    styleUrls: ['./coopHomePage.component.css'],

})

export class CoopHomePageComponent implements OnInit {
    menuListData: any;
    newMenuListArray: any;
    constructor(private mdApplicationDetailDS: MDApplicationDetailsDS,
        private router: Router,
        private mdMondServiceDS: MDMondServiceDS) { }
    ngOnInit() {
        debugger;
        // console.log("this.menuListData-ngOnInit", this.menuListData)
        this.mdApplicationDetailDS.getListOfApplicationDetailsWithMenuAndAccessRights().pipe(first()).subscribe(
            data => {
                // this.menuListData = data;
                this.getReportMenu(data);
            },
            error => {
                // debugger;
                this.mdMondServiceDS.MDError(error);
                // console.log(error);
                // let data = [{ "applicationDetailsId": "59eea95c2cdcf771b041c30f", "applicationDetailsIdLong": 2, "companyId": 6881, "applicationName": "Creditors Insurance", "bpmEngineVersion": 1, "menuList": [{ "menuId": "59eeaa192cdcf771b041c310", "menuIdLong": 3, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Creditor Data - Admin View", "menuLink": "form_155489", "menuProcessLink": "-1", "toolTip": "View policy data files submitted by Creditors \u0026 their processing status", "parentMenuId": "" }, { "menuId": "5a1e7a952cdc3d5494434c93", "menuIdLong": 5, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Creditor Certificate Maintenance", "menuLink": "form_157744", "menuProcessLink": "-1", "toolTip": "Search and maintain creditor certificate", "parentMenuId": "" }, { "menuId": "5a3345a32cdc7238f41c0bfc", "menuIdLong": 8, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Client Maintenance", "menuLink": "form_159112", "menuProcessLink": "-1", "toolTip": "Search and maintain Client", "parentMenuId": "" }, { "menuId": "5a4179022cdcded8a5a7d1df", "menuIdLong": 10, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Product Maintenance", "menuLink": "form_159889", "menuProcessLink": "-1", "toolTip": "Search and maintain Product ", "parentMenuId": "" }, { "menuId": "5aa75d5164deef848ec83094", "menuIdLong": 11, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Reports", "menuLink": "form_165662", "menuProcessLink": "-1", "toolTip": "Reports", "parentMenuId": "" }, { "menuId": "5bcffef92cdcd46a03039b96", "menuIdLong": 12, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Creditor Self Admin Dashboard", "menuLink": "form_178306", "menuProcessLink": "-1", "toolTip": "Creditor Self Admin Dashboard", "parentMenuId": "" }, { "menuId": "5e4bb5a32cdc3f44ae386bda", "menuIdLong": 16, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Rate Structure configuration", "menuLink": "form_244694", "menuProcessLink": "-1", "toolTip": "Rate Structure configuration", "parentMenuId": "" }, { "menuId": "5e4e4fc32cdcf18e366e2328", "menuIdLong": 17, "applicationDetailsId": "59eea95c2cdcf771b041c30f", "companyId": 6881, "menuName": "Financial Reconciliation", "menuLink": "form_245289", "menuProcessLink": "-1", "toolTip": "Financial Reconciliation", "parentMenuId": "" }], "homePagePresent": false }]
                // this.menuListData = data;
                // let data = [{"applicationDetailsId":"59f064152cdc0a2e33ce3fca","applicationDetailsIdLong":1,"companyId":6868,"applicationName":"Creditors Insurance","bpmEngineVersion":1,"menuList":[{"menuId":"59f064582cdc0a2e33ce3fcb","menuIdLong":1,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Data - Admin View","menuLink":"form_66767","menuProcessLink":"-1","toolTip":"View policy data files submitted by Creditors \u0026 their processing status","parentMenuId":""},{"menuId":"5a2a777d2cdc724eb1b60019","menuIdLong":3,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Certificate Maintenance","menuLink":"form_68768","menuProcessLink":"-1","toolTip":"View and maintain client certificates","parentMenuId":""},{"menuId":"5a65d79a2cdcb211b20366b5","menuIdLong":4,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Product Maintenance","menuLink":"form_69937","menuProcessLink":"-1","toolTip":"View and maintain product details","parentMenuId":""},{"menuId":"5a83eb982cdc063d8c2ce9e2","menuIdLong":5,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Client Maintenance","menuLink":"form_70330","menuProcessLink":"-1","toolTip":"View and maintain client details","parentMenuId":""},{"menuId":"5ab225612cdcd99564b9c3c6","menuIdLong":6,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Reports","menuLink":"form_71436","menuProcessLink":"-1","toolTip":"View and maintain reports","parentMenuId":""},{"menuId":"5c0791892cdc725f0a931112","menuIdLong":7,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Self Admin Dashboard","menuLink":"form_79866","menuProcessLink":"-1","toolTip":"View admin dashboard","parentMenuId":""},{"menuId":"5ddcb1022cdc7969d8e089f1","menuIdLong":9,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"test","menuLink":"-1","menuProcessLink":"68928","toolTip":"test","parentMenuId":""}],"homePagePresent":false}];
            //    let data = [{"applicationDetailsId":"59f064152cdc0a2e33ce3fca","applicationDetailsIdLong":1,"companyId":6868,"applicationName":"Creditors Insurance","bpmEngineVersion":1,"menuList":[{"menuId":"59f064582cdc0a2e33ce3fcb","menuIdLong":1,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Data - Admin View","menuLink":"form_66767","menuProcessLink":"-1","toolTip":"View policy data files submitted by Creditors \u0026 their processing status","parentMenuId":""},{"menuId":"5a2a777d2cdc724eb1b60019","menuIdLong":3,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Certificate Maintenance","menuLink":"form_68768","menuProcessLink":"-1","toolTip":"View and maintain client certificates","parentMenuId":""},{"menuId":"5a65d79a2cdcb211b20366b5","menuIdLong":4,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Product Maintenance","menuLink":"form_69937","menuProcessLink":"-1","toolTip":"View and maintain product details","parentMenuId":""},{"menuId":"5a83eb982cdc063d8c2ce9e2","menuIdLong":5,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Client Maintenance","menuLink":"form_70330","menuProcessLink":"-1","toolTip":"View and maintain client details","parentMenuId":""},{"menuId":"5ab225612cdcd99564b9c3c6","menuIdLong":6,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Reports","menuLink":"form_71436","menuProcessLink":"-1","toolTip":"View and maintain reports","parentMenuId":""},{"menuId":"5c0791892cdc725f0a931112","menuIdLong":7,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"Creditor Self Admin Dashboard","menuLink":"form_79866","menuProcessLink":"-1","toolTip":"View admin dashboard","parentMenuId":""},{"menuId":"5ddcb1022cdc7969d8e089f1","menuIdLong":9,"applicationDetailsId":"59f064152cdc0a2e33ce3fca","companyId":6868,"menuName":"test","menuLink":"-1","menuProcessLink":"68928","toolTip":"test","parentMenuId":""}],"homePagePresent":false}]
            //     this.getReportMenu(data);

            });
    }

    getReportMenu(list) {
        debugger;
        let ApplicationMenuList = list[0].menuList;
        let menuList = [];
        for (let i = 0; i < ApplicationMenuList.length; i++) {
            if (ApplicationMenuList[i].menuName.trim() == "Reports") {
                menuList.push(ApplicationMenuList[i]);
            }
        }
        this.newMenuListArray = [];
        for (var j = 0; j < list.length; j++) {
            debugger;
            let obj = {};
            obj["applicationDetailsId"] = list[j].applicationDetailsId;
            obj["applicationDetailsIdLong"] = list[j].applicationDetailsIdLong;
            obj["companyId"] = list[j].companyId;
            obj["applicationName"] = list[j].applicationName;
            obj["bpmEngineVersion"] = list[j].bpmEngineVersion;
            obj["menuList"] = menuList;
            this.newMenuListArray.push(obj);
        }
        this.menuListData = this.newMenuListArray;
    }

    onClickOfApplicationMenu(menuName) {
        debugger;
        if (menuName == "Creditor Data - Admin View") {
            this.router.navigate(['/home/creditorDataAdminView'], { skipLocationChange: true });
        }
        if (menuName == "Creditor Certificate Maintenance") {
            this.router.navigate(['/home/creditorCertificate'], { skipLocationChange: true });
        }
        if (menuName == "Client Maintenance") {
            this.router.navigate(['/home/clientmaintenance'], { skipLocationChange: true });
        }
        if (menuName == "Product Maintenance") {
            this.router.navigate(['/home/productMaintenance'], { skipLocationChange: true });
        }
        if (menuName.trim() == "Reports") {
            this.router.navigate(['/home/reportsComponent'], { skipLocationChange: true });
        }
        if (menuName == "Creditor Self Admin Dashboard") {
            this.router.navigate(['/home/creditorSelfAdminDashboard'], { skipLocationChange: true });
        }
        if (menuName == "Rate Structure configuration") {
            this.router.navigate(['/home/rateStructureConfiguration'], { skipLocationChange: true });
        }
        if (menuName == "Financial Reconciliation") {
            this.router.navigate(['/home/financialReconciliation'], { skipLocationChange: true });
        }

    }

}