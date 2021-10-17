import { Injectable, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationEvent } from 'src/app/feature/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationCreator = new Subject<NotificationEvent>();
  notificationRemover = new Subject<ViewRef>();
  constructor() {}

  createSuccessNotification(message: string) {
    this.notificationCreator.next({ type: 'success', message: message });
  }

  createErrorNotification(message: string) {
    this.notificationCreator.next({ type: 'error', message: message });
  }

  createInfoNotification(message: string) {
    this.notificationCreator.next({ type: 'info', message: message });
  }
}
