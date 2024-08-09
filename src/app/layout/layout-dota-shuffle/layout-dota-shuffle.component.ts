import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MetricsService } from 'src/app/service/metrics.service';
import { DialogChangelogComponent } from 'src/app/shared/component/dialog-changelog/dialog-changelog.component';

@Component({
  selector: 'app-layout-dota-shuffle',
  templateUrl: './layout-dota-shuffle.component.html',
  styleUrls: ['./layout-dota-shuffle.component.scss']
})
export class LayoutDotaShuffleComponent {

  constructor(
    private dialog: Dialog,
    private metricsService: MetricsService
  ) {
    this.metricsService.patchMetrics(1,1)
    // this.dialog.open(DialogChangelogComponent, {
    //   width: '480px',
    // });
  }
}
