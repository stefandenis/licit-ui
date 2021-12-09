import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.scss'],
})
export class BigCardComponent implements OnInit {
  @Input() itemId: string;
  @Input() isAddedToWatchList: boolean = false;
  @Input() watchListMessage: string;
  @Input() title: string;
  @Input() endDate: string;
  @Input() price: string;
  @Input() imageUrl: string;

  @Input() isCardLoaded: boolean = false;

  timeRemaining: string;

  @Output()
  addToWatchList: EventEmitter<string> = new EventEmitter();
  @Output() removeFromWatchList: EventEmitter<string> = new EventEmitter();
  constructor() {
    setInterval(() => {
      var currentDate = new Date();
      var endDate = new Date(this.endDate);
      var diff = Math.abs(endDate.valueOf() - currentDate.valueOf());
      if (endDate.valueOf() - currentDate.valueOf() < 0) {
        this.timeRemaining = 'Licitatia s-a incheiat';
      } else {
        this.timeRemaining = `${this.getDaysRemaining(
          diff
        )} ${this.getHoursRemaining(diff)} ${this.getMinutesRemaining(
          diff
        )} ${this.getSecondsRemaining(diff)}`;
      }
    }, 1000);
  }

  ngOnInit(): void {}

  manageWatchList() {
    this.isAddedToWatchList
      ? this.removeFromWatchList.emit(this.itemId)
      : this.addToWatchList.emit(this.itemId);
  }

  getDaysRemaining(diff: number) {
    var days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return this.createString(days, 'z');
  }

  getHoursRemaining(diff: number) {
    var hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    return this.createString(hours, 'o');
  }

  getMinutesRemaining(diff: number) {
    var minutes = Math.floor(diff / 1000 / 60) % 60;
    return this.createString(minutes, 'm');
  }

  getSecondsRemaining(diff: number) {
    var seconds = Math.floor(diff / 1000) % 60;
    return this.createString(seconds, 's');
  }

  createString(unit: number, unitSign: string) {
    if (unit == 0) {
      if (unitSign == 's') return '00s';
      return '';
    } else if (unit < 10) {
      return `0${unit}` + unitSign;
    } else return `${unit}` + unitSign;
  }
}
