import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ChangeLog } from 'src/app/dota-shuffle/model/change-log.model';

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
      title: 'Initial Release 🚀',
      date: new Date('2024-05-12'),
      description: 'We are excited to launch the first version of our app! This release introduces the core features and functionalities that lay the foundation for future updates.',
      version: '1.0.0',
      features: [
        '🎉 Initial version of the app',
        '🌗 Support for light and dark mode',
        '💾 LocalStorage for saving data',
      ]
    },
    {
      id: 2,
      title: 'Feature Update ✨',
      date: new Date('2024-06-24'),
      description: 'The second version of the app brings new features and enhancements to improve user experience.',
      version: '1.1.0',
      features: [
        '✅ Extra validation added for Add Player form',
        '📊 Indicator for total players',
        '💡 New credits button',
      ]
    },
    {
      id: 3,
      title: 'Enhancements and SSR 🌟',
      date: new Date('2024-08-06'),
      description: 'In this release, we introduce new badges, a top MMR button, and support for Server-Side Rendering (SSR) to enhance performance and user engagement.',
      version: '1.2.0',
      features: [
        '🏅 New badges (First Win!, Full!)',
        '🔝 Top MMR button',
        '⚙️ SSR support for CEO',
      ]
    },
    {
      id: 4,
      title: 'Implementing Metrics 📈',
      date: new Date('2024-08-11'),
      description: 'This update focuses on improving accessibility and responsiveness, while also introducing real-time metrics via WebSockets.',
      version: '1.3.0',
      features: [
        '🎨 Updated styles for better accessibility and responsiveness',
        '📊 Implemented WebSockets for real-time metrics',
      ]
    },
    {
      id: 5,
      title: 'Support for Mobile Devices 📱',
      date: new Date('2024-08-11'),
      description: 'This release enhances mobile compatibility and introduces a new capture button for a better user experience on mobile devices.',
      version: '1.4.0',
      features: [
        '📱 Responsive design for mobile devices',
        '📸 Added capture button',
        '🚀 Improved web performance and load times'
      ]
    },
    {
      id: 6,
      title: 'Lock/Unlock Teams 🔒',
      date: new Date('2024-08-13'),
      description: 'Enable locking and unlocking of teams for flexible player positioning and shuffling.',
      version: '1.5.0',
      features: [
        '🔐 Lock teams to prevent player movements.',
        '🔓 Unlock teams to set specific player positions and shuffle others.',
        '🔄 Visual indicators for locked/unlocked status.'
      ]
    },
    {
      id: 7,
      title: 'Bug Fix: Duplicate Player Issue 🐛',
      date: new Date('2024-08-14'),
      description: 'Resolved an issue where the last player would duplicate upon deletion of the previous player and addition of a new one.',
      version: '1.5.1',
      features: [
        '🔧 Fixed duplication of the last player when deleting and adding new players.',
        '⚙️ Improved data synchronization across all player groups.'
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
