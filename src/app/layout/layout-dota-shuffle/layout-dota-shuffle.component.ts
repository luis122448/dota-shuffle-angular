import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DialogChangelogComponent } from 'src/app/shared/component/dialog-changelog/dialog-changelog.component';

@Component({
  selector: 'app-layout-dota-shuffle',
  templateUrl: './layout-dota-shuffle.component.html',
  styleUrls: ['./layout-dota-shuffle.component.scss']
})
export class LayoutDotaShuffleComponent {

  constructor(
    private dialog: Dialog
  ) {
    this.dialog.open(DialogChangelogComponent, {
      width: '480px',
    });
  }
}
