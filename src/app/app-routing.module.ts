import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDotaShuffleComponent } from './layout/layout-dota-shuffle/layout-dota-shuffle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dota-shuffle',
    pathMatch: 'full'
  },
  {
    path: 'dota-shuffle',
    component: LayoutDotaShuffleComponent,
    title: 'Dota Shuffle'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
