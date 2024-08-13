import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-discord-dialog',
  templateUrl: './discord-dialog.component.html',
  styleUrls: ['./discord-dialog.component.scss']
})
export class DiscordDialogComponent {

  constructor(
    private dialog: Dialog
  ) { }

  closeDialog() {
    this.dialog.closeAll();
  }

}
