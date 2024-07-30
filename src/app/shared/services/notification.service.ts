import { Injectable } from '@angular/core';
import {
  NzNotificationPlacement,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}
  createNotification(options) {
    this.notification.create(options.type, options.title, options.message, {
      nzPlacement: options.position,
    });
  }
}
