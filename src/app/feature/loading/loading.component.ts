import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loadingServiceSubscriber: Subscription;
  messageAfterLoadingSubscriber: Subscription;

  messageAfterLoading: string;
  constructor(loadingService: LoadingService) {
    this.loadingServiceSubscriber = loadingService.getLoading.subscribe(
      (value) => (this.loading = value)
    );

    this.messageAfterLoadingSubscriber =
      loadingService.getLoadingMessage.subscribe((message) => {
        this.messageAfterLoading = message;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loadingServiceSubscriber.unsubscribe();
  }

  setMessageAfterLoading(message: string) {
    this.messageAfterLoading = message;
  }
}
