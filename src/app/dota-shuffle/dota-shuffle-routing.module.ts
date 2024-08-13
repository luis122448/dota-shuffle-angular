import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDotaShuffleComponent } from './layout/layout-dota-shuffle/layout-dota-shuffle.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutDotaShuffleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotaShuffleRoutingModule {}
