import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
})
export class ProgressRingComponent implements OnInit, AfterViewInit {

  @ViewChild('circle') circle: ElementRef<any>;

  @Input() radius     : number;
  @Input() strokeWidth: number;
  @Input() svgHeight  : number;
  @Input() svgWidth   : number;
  @Input() progress   : number;

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    const circleStyle = this.circle.nativeElement.style;

    circleStyle.r = this.radius;
    circleStyle.cx = this.radius + this.strokeWidth;
    circleStyle.cy = this.radius + this.strokeWidth;
    circleStyle.strokeWidth = this.strokeWidth;
    circleStyle.strokeDasharray =
    `${this.getCircumference(this.radius, this.strokeWidth)} ${this.getCircumference(this.radius, this.strokeWidth)}`;
    circleStyle.strokeDashoffset = `${this.getCircumference(this.radius, this.strokeWidth) * (1 - this.progress)}`;

  }

  private getCircumference(radius: number, offset: number) {
    return (radius + offset) * 2 * Math.PI;
  }

}
