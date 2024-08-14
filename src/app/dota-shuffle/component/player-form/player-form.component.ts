import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultValuesService } from '@dota-shuffle/service/default-values.service';
import { DotaPlayerDataSource } from '@dota-shuffle/service/dota-player.service';
import { DialogErrorAlertComponent } from '@shared/component/dialog-error-alert/dialog-error-alert.component';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent {
  @Output() onCalculate = new EventEmitter<boolean>(false);
  @Output() onUnlock = new EventEmitter<boolean>(false);
  playerDataSouce = DotaPlayerDataSource.getInstance();
  formPlayer!: FormGroup;
  unlock = signal(false);

  private BuildForm() {
    this.formPlayer = this.formBuilder.group({
      name: ['', Validators.required],
      mmr: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    });
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formPlayer.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private defaultValuesService: DefaultValuesService,
    private dialog: Dialog
  ) {
    this.BuildForm();
  }

  addPlayer() {
    if (!this.formPlayer.valid) {
      this.formPlayer.markAllAsTouched();
      return;
    }
    try {
      console.log(this.formPlayer.value);
      console.log(this.playerDataSouce.getPlayers());
      const name = this.formPlayer.get('name')?.value;
      const mmr = this.formPlayer.get('mmr')?.value.trim();

      const existingPlayer = this.playerDataSouce.getPlayers().find(player => player.name === name && player.mmr === mmr);

      if (existingPlayer) {
        throw new Error('The player already exists in the roster.');
      }

      console.log(this.playerDataSouce.getPlayers());

      this.playerDataSouce.addPlayer(name, mmr);

      console.log(this.playerDataSouce.getPlayers());

      this.BuildForm();
      // setTimeout(() => {
      //   this.onCalculate.emit(true);
      // }, 250);
      // this.defaultValuesService.setLocalStorageValue(
      //   'players',
      //   this.playerDataSouce.getPlayers()
      // );

      console.log(this.playerDataSouce.getPlayers());
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


  unlockPlayer(unlock: boolean) {
    if (this.playerDataSouce.getPlayers().length < 10) {
      this.dialog.open(DialogErrorAlertComponent, {
        width: '400px',
        data: {
          status: -3,
          message: 'Error, Then number of players must be 10!',
        },
      });
      return;
    }
    this.onUnlock.emit(unlock);
    this.unlock.set(unlock);
  }
}
