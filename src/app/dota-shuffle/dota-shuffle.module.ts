import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDotaShuffleComponent } from "@dota-shuffle/component/basic-dota-shuffle/basic-dota-shuffle.component";
import { CreditsDialogComponent } from "@dota-shuffle/component/credits-dialog/credits-dialog.component";
import { DialogEditPlayerComponent } from "@dota-shuffle/component/dialog-edit-player/dialog-edit-player.component";
import { DiscordDialogComponent } from "@dota-shuffle/component/discord-dialog/discord-dialog.component";
import { FooterComponent } from "@dota-shuffle/component/footer/footer.component";
import { HeaderComponent } from "@dota-shuffle/component/header/header.component";
import { ItemPlayerComponent } from "@dota-shuffle/component/item-player/item-player.component";
import { SharedModule } from "@shared/shared.module";
import { DotaShuffleRoutingModule } from './dota-shuffle-routing.module';
import { LayoutDotaShuffleComponent } from './layout/layout-dota-shuffle/layout-dota-shuffle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { PlayerFormComponent } from './component/player-form/player-form.component';

@NgModule({
  declarations: [
    BasicDotaShuffleComponent,
    CreditsDialogComponent,
    DialogEditPlayerComponent,
    DiscordDialogComponent,
    FooterComponent,
    HeaderComponent,
    ItemPlayerComponent,
    LayoutDotaShuffleComponent,
    PlayerFormComponent
  ],
  imports: [
    CommonModule,
    DotaShuffleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DragDropModule,
    DialogModule,
    HttpClientModule
  ]
})

export class DotaShuffleModule { }
