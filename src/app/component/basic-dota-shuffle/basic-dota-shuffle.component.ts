import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DotaPlayerModel } from 'src/app/model/dota-player.model';
import { DotaPlayerDataSource } from 'src/app/service/dota-player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DialogErrorAlertComponent } from 'src/app/shared/component/dialog-error-alert/dialog-error-alert.component';
import { DefaultValuesService } from 'src/app/service/default-values.service';
import { MetricsService } from 'src/app/service/metrics.service';
import { NgxCaptureService } from 'ngx-capture';

@Component({
  selector: 'app-basic-dota-shuffle',
  templateUrl: './basic-dota-shuffle.component.html',
  styleUrls: ['./basic-dota-shuffle.component.scss'],
})
export class BasicDotaShuffleComponent {
  @ViewChild('captureArea', { static: true }) captureArea!: ElementRef;
  playerDataSouce = DotaPlayerDataSource.getInstance();
  formPlayer!: FormGroup;
  total0: number = 0;
  total1: number = 0;
  total2: number = 0;
  diff: number = 0;
  difference: string = '';
  countPlayersNotInTeam: number = 0;

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
    private dialog: Dialog,
    private metricsService: MetricsService,
    private captureService: NgxCaptureService
  ) {
    this.BuildForm();
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

  addPlayer() {
    if (!this.formPlayer.valid) {
      this.formPlayer.markAllAsTouched();
      return;
    }
    try {
      const name = this.formPlayer.get('name')?.value;
      const mmr = this.formPlayer.get('mmr')?.value.trim();
      this.playerDataSouce.addPlayer(name, mmr);
      console.log(this.playerDataSouce.getPlayers());
      this.total0 = this.playerDataSouce.getTotal(0);
      this.BuildForm();
      this.onCalculate();
      this.defaultValuesService.setLocalStorageValue(
        'players',
        this.playerDataSouce.getPlayers()
      );
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

  deletePlayer(id: number) {
    this.playerDataSouce.deletePlayer(id);
    this.onCalculate();
    this.defaultValuesService.setLocalStorageValue(
      'players',
      this.playerDataSouce.getPlayers()
    );
  }

  onCapture() {
    this.captureService.getImage(this.captureArea.nativeElement, true).subscribe((img) => {
      const link = document.createElement('a');
      link.href = img;
      link.download = 'emparejamiento.png';
      link.click();
    });
  }

  onShuffle() {
    try {
      this.playerDataSouce.onShuffle();
      this.onCalculate();
      this.metricsService.patchMetrics(2, 1).subscribe();
      this.metricsService.patchMetrics(3, this.playerDataSouce.getTotalMMRPlayers()).subscribe();
      this.metricsService.patchMetrics(4, this.playerDataSouce.getTotalTopPlayers(12000)).subscribe();
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

  drop(event: CdkDragDrop<DotaPlayerModel[]>) {
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
      this.playerDataSouce.movePlayer(
        movedItem.id,
        event.container.data[0].team
      );
      this.onCalculate();
      console.log('Diferente contenedor');
    }
    console.log(event);
  }
}
