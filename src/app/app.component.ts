import { ContentObserver } from '@angular/cdk/observers';
import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { interval, Observable, of, pipe } from 'rxjs';
import { from, fromEvent } from 'rxjs';
import {
  concatMap,
  debounceTime,
  delay,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/internal/operators';
import { NotificationService } from './core/services/notification/notification.service';
import { ThemeService } from './core/services/theme/theme.service';
import { fader } from './route-animations';
import { checkAuth } from './store/auth/auth.actions';

fromEvent(window, 'scroll').subscribe(console.log);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private store: Store
  ) {}
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngOnInit() {
    console.log('check log');
    this.store.dispatch(checkAuth());
  }

  test() {
    // this.notificationService.createErrorNotification('A aparut o eroare');
    const date = new Date();
    const date2 = new Date();
    date2.setDate(20);
    date2.setMonth(9);
    date2.setFullYear(2021);
    date2.setMinutes(30);
    date2.setHours(19);
    date2.setSeconds(0);
    console.log(date2);
    const diff: any = date2.valueOf() - date.valueOf();
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    console.log(`${days}z ${hours}h ${minutes}m ${seconds}s`);
  }

  function1() {
    console.log('prima functie');
  }

  function2() {
    console.log('a doua functie');
  }
}
