import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-credits-dialog',
  templateUrl: './credits-dialog.component.html',
  styleUrls: ['./credits-dialog.component.scss']
})
export class CreditsDialogComponent implements OnInit{

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
    initFlowbite();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
