import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponseList } from '../model/api-response.model';
import { MetricsModel } from '../model/metrics.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  WS_URL = environment.WS_URL + '/metrics/websocket/1';

  private webSocket!: WebSocket;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 2000;
  metrics = signal<ApiResponseList<MetricsModel>>({
    status: 0.0,
    message: '',
    list: [],
  });

  constructor() {}

  connect(): void {
    this.webSocket = new WebSocket(this.WS_URL);

    this.webSocket.onopen = () => {
      this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
      console.log('WebSocket connected');
    };

    this.webSocket.onmessage = (event) => {
      const data: ApiResponseList<MetricsModel> = JSON.parse(event.data);
      this.metrics.set(data);
    };

    this.webSocket.onclose = () => {
      console.log('WebSocket closed');
      this.reconnect();
    };

    this.webSocket.onerror = (error) => {
      console.error('WebSocket error', error);
    };
  }

  disconnect(): void {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }

  reconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        console.log(`Reconnecting attempt ${this.reconnectAttempts}...`);
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnect attempts reached');
    }
  }

}
