import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  message = '';

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) {}

  ngOnInit() {}

  show(message: string, duration: number = 3000): void {
    this.message = message;

    const overlayRef = this.overlay.create(this.getOverlayConfig());
    const notificationPortal = new ComponentPortal(NotificationComponent, null, this.injector);
    const notificationRef = overlayRef.attach(notificationPortal);

    setTimeout(() => {
      overlayRef.dispose();
    }, duration);
  }

  private getOverlayConfig(): OverlayConfig {
    return {
      positionStrategy: this.overlay.position().global().top('20px').centerHorizontally(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false
    };
  }
}
