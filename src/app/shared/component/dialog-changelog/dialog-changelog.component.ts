import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ChangeLog } from 'src/app/model/change-log.model';

@Component({
  selector: 'app-dialog-changelog',
  templateUrl: './dialog-changelog.component.html',
  styleUrls: ['./dialog-changelog.component.scss']
})
export class DialogChangelogComponent {

  faCalendar = faCalendar;
  changeLog: ChangeLog[] = [
    {
      id: 1,
      title: 'Initial Release',
      date: new Date('2024-05-12'),
      description: 'First release of the app, introducing core features and functionalities.',
      version: '1.0.0',
      features: [
        'Fisrt version of the app',
        'Support light and dark mode',
        'Add LocalStorage for save data',
      ]
    },
    {
      id: 2,
      title: 'Feature Update',
      date: new Date('2024-06-24'),
      description: 'Second version of the app with new features and improvements.',
      version: '1.1.0',
      features: [
        'Add extra validation for Add Player form',
        'Add indicator for total players',
        'Add credits button',
      ]
    },
    {
      id: 3,
      title: 'Enhancements and SSR',
      date: new Date('2024-08-06'),
      description: 'Third version of the app with new badges, top MMR button, and SSR support.',
      version: '1.2.0',
      features: [
        'Add badges ( First Win!, Full! )',
        'Add top MMR button',
        'Add SSR for the app',
      ]
    }
  ];
  lastIdChangeLog = this.changeLog.length;

  constructor(
    private dialog: Dialog
  ) { }

  closeDialog() {
    this.dialog.closeAll();
  }

}
