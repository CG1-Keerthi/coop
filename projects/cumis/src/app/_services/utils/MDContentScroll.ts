import { Injectable, EventEmitter } from '@angular/core';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Injectable({ providedIn: 'root' })
export class MDContentScroll {
  public opts: ISlimScrollOptions;
  public scrollEvents: EventEmitter<SlimScrollEvent>;

  public getScrollEvents(){
    return this.scrollEvents = new EventEmitter<SlimScrollEvent>();
  }

  public getOpts(){
     return this.opts = {
        position:"right",
        barBackground: "#C9C9C9",
        barOpacity: "0.8",
        barWidth:"10",
        barBorderRadius: "20",
        barMargin: "0",
        gridBackground:"#D9D9D9",
        gridOpacity: "1",
        gridWidth:"2",
        gridBorderRadius:"0",
        gridMargin: "0",
        alwaysVisible:true,
        visibleTimeout: 3000// 1000
        //scrollSensitivity?: number; // 1
      }
  }
  public play(): void {
    let event = null;
 
    Promise.resolve()
      .then(() => this.timeout(3000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToBottom',
          duration: 2000,
          easing: 'inOutQuad'
        });
 
        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(3000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToTop',
          duration: 3000,
          easing: 'outCubic'
        });
 
        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(4000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollToPercent',
          percent: 80,
          duration: 1000,
          easing: 'linear'
        });
 
        this.scrollEvents.emit(event);
      })
      .then(() => this.timeout(2000))
      .then(() => {
        event = new SlimScrollEvent({
          type: 'scrollTo',
          y: 200,
          duration: 4000,
          easing: 'inOutQuint'
        });
 
        this.scrollEvents.emit(event);
      });
  }
 
  timeout(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
}