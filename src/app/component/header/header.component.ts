import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DiscordDialogComponent } from '../discord-dialog/discord-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { TamaDialogComponent } from '../tama-dialog/tama-dialog.component';
import { CreditsDialogComponent } from '../credits-dialog/credits-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  baseUrl: string;
  constructor(
    private router:Router,
    private location:Location,
    private dialog: Dialog
  ){
    this.baseUrl = this.location.prepareExternalUrl('/')
  }

  toRedirec(path: string){
    const redirectUrl = `${this.baseUrl}/${path}`; // Construir la URL de redirección
    this.router.navigateByUrl(redirectUrl); // Redirigir a la URL especificada
  }

  openDialogDicord(){
    this.dialog.open(DiscordDialogComponent, {
      width: '600px',
      height: '420px'
    })
  }

  openDialogCredits(){
    this.dialog.open(CreditsDialogComponent, {
      width: '600px',
      height: '420px'
    })
  }

}
