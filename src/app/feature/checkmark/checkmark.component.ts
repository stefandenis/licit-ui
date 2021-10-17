import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'check',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
})
export class CheckmarkComponent implements OnInit {
  public static timeForAnimationToComplete: number = 2000;
  startCheckAnimation: number = 1000;
  triggerCheckAnimation: boolean = false;
  triggerCircleAnimation: boolean = false;
  @Input() checkSize: number;
  constructor() {}

  ngOnInit(): void {
    this.triggerCircleAnimation = true;
    setTimeout(() => {
      this.triggerCheckAnimation = true;
    }, this.startCheckAnimation);
  }
}
