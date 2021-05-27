import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MDMondServiceDS } from '../../../../_services/ds';
import { MDCommonGetterSetter } from '../../../../_services/common';
import { any } from 'codelyzer/util/function';


@Component({
    selector: 'app-lgmTwo-designer',
    templateUrl: './lgmTwo.component.html',
    styleUrls: ['./lgmTwo.component.css']
})

export class lgmTwoComponent implements OnInit {
    @Input() processingOverviewData;

    isShowField: boolean = false;
    public LGMTwoData: any;


    constructor(private mdMondServiceDS: MDMondServiceDS,
    ) { }

    ngOnInit() {
        debugger;
        this.LGMTwoData = this.processingOverviewData;
        // this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
        //   if (data) {
        //     this.csfrToken = data;
        //   }
        // });


    }

    onClickOfPWE(event) {
        debugger
        if (event.currentTarget.lastElementChild.control.checked == false) {
            this.isShowField = true;
        } else {
            this.isShowField = false;
        }
    }


}