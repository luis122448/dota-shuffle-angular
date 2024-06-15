import { Component, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DotaPlayerModel } from 'src/app/model/dota-player.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DotaPlayerDataSource } from 'src/app/service/dota-player.service';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {

  formPlayer!: FormGroup;
  playerDataSouce = DotaPlayerDataSource.getInstance();

  private BuildForm(id: number, name: string, mmr: number) {
    this.formPlayer = this.formBuilder.group({
      id: [id, Validators.required],
      name: [name, Validators.required],
      mmr: ['', [Validators.required,Validators.pattern('^[0-9 ]*$')]]
    });
  }

  isInputInvalid(fieldName: string): boolean {
    const field = this.formPlayer.get(fieldName);
    return field ? field.invalid && field.touched : true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: DotaPlayerModel
  ){
    this.BuildForm(data.id,data.name, data.mmr);
  }

  onClose(){
    this.dialogRef.close()
  }

  onSave(){
    if (!this.formPlayer.valid) {
      this.formPlayer.markAllAsTouched();
      return;
    }
    const id = this.formPlayer.get('id')?.value;
    const name = this.formPlayer.get('name')?.value;
    const mmr = this.formPlayer.get('mmr')?.value.trim();
    this.playerDataSouce.editPlayer(id, name, mmr);
    this.dialogRef.close()
  }

}
