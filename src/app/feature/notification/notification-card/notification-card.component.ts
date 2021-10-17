import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  RendererFactory2,
  ViewChild,
  ViewRef,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  AnimationEvent,
} from '@angular/animations';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

export type NotificationType = 'success' | 'error' | 'info';

const NOTIFICATION_CARD_MIN_WIDTH_SHORT_TEXT: string = '250px';
const NOTIFICATION_CARD_MIN_WIDTH_LONG_TEXT: string = '350px';
const MESSAGE_LENGTH_LIMIT: number = 200;

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  animations: [
    trigger('spawnNotification', [
      state(
        'hidden',
        style({
          right: '-200px',
          opacity: 0,
        })
      ),

      state(
        'visible',
        style({
          right: '10px',
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('0.7s ease-out')]),
      transition('visible => hidden', [
        animate(
          '0.5s',
          keyframes([
            style({ right: '10px', offset: 0 }),
            style({ right: '-30px', opacity: 0, offset: 0.9 }),
            style({ right: '-200px', offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class NotificationCardComponent implements AfterViewInit {
  @Input() message: string;
  @Input() notificationType: NotificationType;

  @Output() manualRemoval: EventEmitter<any> = new EventEmitter();

  @ViewChild('notificationCard') notificationElement: ElementRef;
  view: ViewRef;

  readonly notificationIcon: Map<string, string> = new Map([
    ['success', 'check_circle_outline'],
    ['error', 'error_outline'],
    ['info', 'info'],
  ]);
  isHidden: boolean = true;
  upTime: number = 3000;
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    private cd: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {
    this.isHidden = false;
    setTimeout(() => {
      this.isHidden = true;
    }, this.upTime);
    this.notificationElement.nativeElement.style.minWidth =
      NOTIFICATION_CARD_MIN_WIDTH_SHORT_TEXT;
    if (this.message.length > MESSAGE_LENGTH_LIMIT)
      this.notificationElement.nativeElement.style.minWidth =
        NOTIFICATION_CARD_MIN_WIDTH_LONG_TEXT;

    this.cd.detectChanges();
  }

  setNotificationColor(type: NotificationType) {
    return 'notification-color--' + type;
  }

  animationDone($event: AnimationEvent) {
    if ($event.toState === 'hidden')
      this.notificationService.notificationRemover.next(this.view);
  }

  animationStart($event: AnimationEvent) {
    if ($event.fromState === 'hidden') {
      var notificationElements = document.getElementsByClassName(
        'notification'
      ) as HTMLCollectionOf<HTMLElement>;
      var currentNotification = notificationElements[0];
      for (var i = 0; i < notificationElements.length; i++) {
        notificationElements[i].style.top = `${
          (currentNotification.offsetHeight + 10) * i
        }px`;
      }
    }
  }

  test() {}

  setLowOpacity() {
    this.notificationElement.nativeElement.style.opacity = 0.7;
  }

  setHighOpacity() {
    this.notificationElement.nativeElement.style.opacity = 1;
  }

  removeNotification() {
    this.isHidden = true;
  }
}
