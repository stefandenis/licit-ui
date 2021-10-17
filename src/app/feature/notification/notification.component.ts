import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import {
  NotificationCardComponent,
  NotificationType,
} from './notification-card/notification-card.component';
import { NotificationDirective } from './notification.directive';

export interface NotificationEvent {
  type: string;
  message: string;
}

export interface NotificationItem {
  message: string;
  color: string;
  type: string;
  component: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements AfterViewInit {
  @ViewChild(NotificationDirective, { static: true })
  notificationHost!: NotificationDirective;

  viewContainerRef: ViewContainerRef;
  componentFactory: ComponentFactory<NotificationCardComponent>;

  constructor(
    private notificationService: NotificationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        NotificationCardComponent
      );
    this.notificationService.notificationCreator.subscribe(
      (notification: NotificationEvent) => {
        switch (notification.type) {
          case 'success':
            this.createSuccessNotification(notification.message);
            break;
          case 'error':
            this.createErrorNotification(notification.message);
            break;
          case 'info':
            this.createInfoNotification(notification.message);
            break;

          default:
            this.createInfoNotification(notification.message);
        }
      }
    );
    this.notificationService.notificationRemover.subscribe(
      (viewRef: ViewRef) => {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
      }
    );
  }

  ngAfterViewInit() {
    this.viewContainerRef = this.notificationHost.viewContainerRef;
  }

  createSuccessNotification(message: string) {
    this.createNotificationComponent(message, 'success');
  }

  createErrorNotification(message: string) {
    this.createNotificationComponent(message, 'error');
  }

  createInfoNotification(message: string) {
    this.createNotificationComponent(message, 'info');
  }

  createNotificationComponent(message: string, type: NotificationType) {
    const componentRef =
      this.viewContainerRef.createComponent<NotificationCardComponent>(
        this.componentFactory,
        0
      );

    componentRef.instance.message = message;
    componentRef.instance.notificationType = type;
    componentRef.instance.view = componentRef.hostView;
  }
}
