import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isAddedToWatchList: boolean;

  constructor() {}

  ngOnInit(): void {}

  getDate() {
    return new Date('2021-10-25T00:00:00').toString();
  }
}
