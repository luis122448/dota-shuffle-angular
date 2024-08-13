import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DotaPlayerModel } from 'src/app/dota-shuffle/model/dota-player.model';
import { DotaPlayerDataSource } from '@dota-shuffle/service/dota-player.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from 'src/app/shared/component/dialog-error-alert/dialog-error-alert.component';
import { DefaultValuesService } from '@dota-shuffle/service/default-values.service';
import { MetricsService } from '@dota-shuffle/service/metrics.service';
import { NgxCaptureService } from 'ngx-capture';
import { NotificationService } from '@dota-shuffle/service/notification.service';

@Component({
  selector: 'app-basic-dota-shuffle',
  templateUrl: './basic-dota-shuffle.component.html',
  styleUrls: ['./basic-dota-shuffle.component.scss'],
})
export class BasicDotaShuffleComponent {
  @ViewChild('captureArea', { static: true }) captureArea!: ElementRef;

  playerDataSouce = DotaPlayerDataSource.getInstance();
  total0: number = 0;
  total1: number = 0;
  total2: number = 0;
  diff: number = 0;
  difference: string = '';
  countPlayersNotInTeam: number = 0;
  menuOpen = false;
  actionText = 'Capture';
  unlock = signal(false);

  constructor(
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog,
    private metricsService: MetricsService,
    private captureService: NgxCaptureService,
    private notificationService: NotificationService
  ) {
    const players: DotaPlayerModel[] =
      this.defaultValuesService.getLocalStorageValue('players');
    if (players.length > 0) {
      this.playerDataSouce.setPlayers(players);
    } else {
      this.playerDataSouce.onTest(true);
    }
    this.onCalculate();
  }

  getTeam(team: number): DotaPlayerModel[] {
    return this.playerDataSouce.getTeam(team);
  }

  deletePlayer(id: number) {
    this.playerDataSouce.deletePlayer(id);
    this.onCalculate();
    this.defaultValuesService.setLocalStorageValue(
      'players',
      this.playerDataSouce.getPlayers()
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onCapture(action: 'download' | 'copy' = 'download') {
    this.captureService
      .getImage(this.captureArea.nativeElement, true)
      .subscribe((img: string) => {
        if (action === 'download') {
          this.downloadImage(img);
        } else if (action === 'copy') {
          this.copyImageToClipboard(img);
        }
        this.menuOpen = false; // Close menu after action
      });
  }

  private downloadImage(img: string) {
    const link = document.createElement('a');
    link.href = img;
    link.download = 'shuffle.png';
    link.click();
  }

  private copyImageToClipboard(img: string) {
    // Create an image element
    const image = new Image();
    image.src = img;

    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Ensure context is not null before using it
    if (context) {
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        // Copy the canvas content to the clipboard
        canvas.toBlob((blob) => {
          if (blob) {
            const clipboardItem = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard
              .write([clipboardItem])
              .then(() => {
                console.log('Image copied to clipboard successfully!');
              })
              .catch((error) => {
                console.error('Failed to copy image to clipboard:', error);
              });
          }
        }, 'image/png');
      };

      // Handle image load errors
      image.onerror = (error) => {
        console.error('Failed to load image:', error);
      };
    } else {
      console.error('Failed to get canvas 2D context');
    }
  }

  onShuffle() {
    if (this.unlock()) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: {
          status: -3,
          message: 'You must 🔒 lock the teams to shuffle the players',
        },
      });
      return;
    }
    try {
      this.playerDataSouce.onShuffle();
      this.onCalculate();
      this.metricsService.patchMetrics(2, 1).subscribe();
      this.metricsService
        .patchMetrics(3, this.playerDataSouce.getTotalMMRPlayers())
        .subscribe();
      this.metricsService
        .patchMetrics(4, this.playerDataSouce.getTotalTopPlayers(12000))
        .subscribe();
    } catch (error: any) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: {
          status: -3,
          message: error.message,
        },
      });
    }
  }

  onReset() {
    this.playerDataSouce.onReset();
    this.onCalculate();
  }

  onCalculate() {
    this.total0 = this.playerDataSouce.getTotal(0);
    this.total1 = this.playerDataSouce.getTotal(1);
    this.total2 = this.playerDataSouce.getTotal(2);
    this.diff = this.total1 - this.total2;
    this.difference = '+' + Math.abs(this.diff) + ' MMR';
    this.countPlayersNotInTeam = this.playerDataSouce.countPlayersNotInTeam();
  }

  onDeleteAll() {
    this.playerDataSouce.deleteAll();
    this.onCalculate();
    this.defaultValuesService.setLocalStorageValue(
      'players',
      this.playerDataSouce.getPlayers()
    );
  }

  drop(event: CdkDragDrop<DotaPlayerModel[]>, team: number) {
    if (!this.unlock()) {
      return;
    }

    const previousContainerData = event.previousContainer.data;
    const movedItem = previousContainerData[event.previousIndex];
    console.log('Elemento movido:', movedItem);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Mismo contenedor');
      this.onCalculate();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.playerDataSouce.movePlayer(movedItem.id, team);
      console.log(`Moviendo player ${movedItem.id} a equipo ${team}`);

      this.onCalculate();
      console.log('Diferente contenedor');
    }

    console.log(event);
  }

  onEventCalculate($event: boolean) {
    if ($event) {
      this.onCalculate();
    }
  }

  onUnlock($event: boolean) {
    if ($event) {
      this.notificationService.show('🔓 Teams have been unlocked. You can now move players between teams. 🤝');
    } else {
      this.notificationService.show('🔒 Teams are now locked. Please shuffle the players. 🔄');
    }
    this.unlock.set($event);
  }
}
