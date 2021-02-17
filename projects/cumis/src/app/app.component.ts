import { Component, HostBinding, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW } from './window.provider';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cumis';

  public currRoute: string;
  public currStyleUrl: SafeResourceUrl;

  constructor(
    @Inject(WINDOW) private window: Window,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.currRoute = this.window.location.hostname.split('.')[0];
    this.currRoute = this.currRoute.includes('demo') || this.currRoute.includes('dev') ? this.currRoute.replace('demo', '').replace('dev', '') : this.currRoute;
    this.currStyleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://tarmikaimages.s3.us-east-2.amazonaws.com/wl/${this.currRoute}/style.css`);
  }
}
