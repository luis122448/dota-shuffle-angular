import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutDotaShuffleComponent } from './layout/layout-dota-shuffle/layout-dota-shuffle.component';
import { BasicDotaShuffleComponent } from './component/basic-dota-shuffle/basic-dota-shuffle.component';
import { ItemPlayerComponent } from './component/item-player/item-player.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogEditPlayerComponent } from './component/dialog-edit-player/dialog-edit-player.component';
import { DiscordDialogComponent } from './component/discord-dialog/discord-dialog.component';
import { CreditsDialogComponent } from './component/credits-dialog/credits-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [
    AppComponent,
    LayoutDotaShuffleComponent,
    BasicDotaShuffleComponent,
    ItemPlayerComponent,
    HeaderComponent,
    FooterComponent,
    DialogEditPlayerComponent,
    DiscordDialogComponent,
    CreditsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    DragDropModule,
    DialogModule,
    HttpClientModule,
    NgxCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
