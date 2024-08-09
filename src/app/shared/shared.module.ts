import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonStandardComponent } from './component/button-standard/button-standard.component';
import { StackTechComponent } from './component/stack-tech/stack-tech.component';
import { ThemeSwitcherComponent } from './component/theme-switcher/theme-switcher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontIconComponent } from './component/font-icon/font-icon.component';
import { ButtonOperacComponent } from './component/button-operac/button-operac.component';
import { DialogErrorAlertComponent } from './component/dialog-error-alert/dialog-error-alert.component';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogChangelogComponent } from './component/dialog-changelog/dialog-changelog.component';
import { MetricsDashboardComponent } from './component/metrics-dashboard/metrics-dashboard.component';
import { NumberFormatPipe } from './pipe/number-format.pipe';
import { OrderByPipe } from './pipe/order-by.pipe';

@NgModule({
  declarations: [
    ButtonStandardComponent,
    StackTechComponent,
    ThemeSwitcherComponent,
    FontIconComponent,
    ButtonOperacComponent,
    DialogErrorAlertComponent,
    DialogChangelogComponent,
    OrderByPipe,
    MetricsDashboardComponent,
    NumberFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DragDropModule,
    DialogModule
  ],
  exports: [
    ButtonStandardComponent,
    StackTechComponent,
    ThemeSwitcherComponent,
    FontIconComponent,
    ButtonOperacComponent,
    DialogErrorAlertComponent,
    OrderByPipe,
    NumberFormatPipe,
    MetricsDashboardComponent
  ]
})

export class SharedModule { }
