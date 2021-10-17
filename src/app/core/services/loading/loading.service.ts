import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CheckmarkComponent } from 'src/app/feature/checkmark/checkmark.component';
import { LoadingComponent } from 'src/app/feature/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  showOverlay: boolean = false;
  loading = new BehaviorSubject<boolean>(false);
  messageAfterLoading = new BehaviorSubject<string>('');
  getLoading = this.loading.asObservable();
  getLoadingMessage = this.messageAfterLoading.asObservable();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  startLoadingScreen() {
    this.showOverlay = true;
    this.renderer.addClass(
      document.getElementsByClassName('loading-container')[0],
      'loading-container--showOverlay'
    );
    this.loading.next(true);
  }

  stopLoadingScreen() {
    this.showOverlay = false;
    this.renderer.removeClass(
      document.getElementsByClassName('loading-container')[0],
      'loading-container--showOverlay'
    );
    this.loading.next(false);
  }

  stopLoadingScreenWithMessage(message: string) {
    var wordcount = message.split(' ').length;
    this.messageAfterLoading.next(message);
    this.loading.next(false);

    setTimeout(() => {
      this.stopLoadingScreen();
    }, Math.max(CheckmarkComponent.timeForAnimationToComplete, wordcount * 300));
  }
}
