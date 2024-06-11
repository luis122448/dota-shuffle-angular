import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { DiscordDialogComponent } from '../discord-dialog/discord-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private dialog: Dialog
  ) { }

  stackTechs: string[] = [
    "angular",
    "docker",
  ]

}
