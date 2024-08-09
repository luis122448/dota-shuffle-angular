import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { ApiResponseList } from 'src/app/model/api-response.model';
import { MetricsModel } from 'src/app/model/metrics.model';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { faUsers, faShuffle, faRankingStar, faMedal, faCalculator, faEarthAmerica, faServer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics-dashboard.component.html',
  styleUrls: ['./metrics-dashboard.component.scss']
})
export class MetricsDashboardComponent implements OnInit, OnDestroy {

  faUsers = faUsers
  faShuffle = faShuffle
  faMedal = faMedal
  faCalculator = faCalculator
  faEarthAmerica = faEarthAmerica
  faServer = faServer
  metrics: Signal<ApiResponseList<MetricsModel>>;

  faIcons: any[] = [faUsers, faShuffle, faCalculator, faMedal, faEarthAmerica, faServer];

  constructor(
    private webSocketService: WebSocketService,
  ) {
    this.metrics = this.webSocketService.metrics.asReadonly();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  ngOnInit(): void {
    this.webSocketService.connect();
  }

}
