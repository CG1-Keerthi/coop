import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-ratingDetails-designer',
    templateUrl: './ratingDetails.component.html',
    styleUrls: ['./ratingDetails.component.css'],

})

export class RatingDetailsComponent implements OnInit {

    // public csfrToken: any;
  
    constructor(private http: HttpClient) { }


    ngOnInit() {
        // debugger;
        // this.mdCommonGetterAndSetter.getCsfrToken().subscribe(data => {
        //     if (data) {
        //         this.csfrToken = data;
        //     }
        // });       
    }





}