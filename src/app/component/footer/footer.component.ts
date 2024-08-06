import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

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
