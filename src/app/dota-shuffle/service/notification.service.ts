import { Injectable } from '@angular/core';
import { NotificationComponent } from '@shared/component/notification/notification.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  show(message: string, duration: number = 3000000): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().top('5px').centerHorizontally(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false
    });

    const notificationPortal = new ComponentPortal(NotificationComponent);
    const notificationRef = overlayRef.attach(notificationPortal);

    const notificationComponent = notificationRef.instance as NotificationComponent;
    notificationComponent.show(message, duration);

    setTimeout(() => {
      this.overlayRef?.dispose();
    }, duration);
  }
}
