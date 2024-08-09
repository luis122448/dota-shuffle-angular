import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MetricsModel, NumberMetricsModel } from '../model/metrics.model';
import { ApiResponseObject } from '../model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  API_URL = environment.API_URL;

  constructor(
    private httpCliente: HttpClient
  ) { }

  patchMetrics(id: number, value_integer: number) {
    const metrics: NumberMetricsModel = {
      id: id,
      project_id: 1,
      value_integer: value_integer
    };
    return this.httpCliente.patch<ApiResponseObject<MetricsModel>>(`${this.API_URL}/metrics`, metrics);
  }

}
