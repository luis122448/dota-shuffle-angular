import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DotaPlayerModel } from 'src/app/model/dota-player.model';
import { DotaPlayerDataSource } from 'src/app/service/dota-player.service';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-item-player',
  templateUrl: './item-player.component.html',
  styleUrls: ['./item-player.component.scss']
})
export class ItemPlayerComponent {

  playerDataSouce = DotaPlayerDataSource.getInstance();
  @Input() player: DotaPlayerModel | undefined = undefined;
  @Input() isEdit = false;
  @Output() dropped = new EventEmitter<number>();

  constructor(
    private Dialog: Dialog
  ) { }

  onDropped() {
    if (this.player) {
      this.dropped.emit(this.player.id);
    }
  }

  onEdit() {
    this.Dialog.open(DialogEditPlayerComponent, {
      width: '400px',
      data: this.player
    });
  }

}
