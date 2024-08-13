import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dota-shuffle',
    pathMatch: 'full'
  },
  {
    path: 'dota-shuffle',
    loadChildren: () => import('./dota-shuffle/dota-shuffle.module').then(m => m.DotaShuffleModule),
    title: 'Dota Shuffle MMR'
  },
  {
    path: 'metrics',
    loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
    title: 'Metrics'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
