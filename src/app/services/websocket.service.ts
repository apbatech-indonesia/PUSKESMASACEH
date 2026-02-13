import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface QueueCallPayload {
  prefix: string;
  number: number;
  pasien: string;
  poli: string;
  channel: string;
}

export interface NotificationPayload {
  title: string;
  message?: string;
  channel: string;
}

@Injectable({ providedIn: "root" })
export class WebsocketService {
  // Base API host for queue calls
  private readonly API_BASE = "https://websocket.clenicapp.com";

  constructor(private http: HttpClient) {}

  /**
   * POST to https://websocket.clenicapp.com/api/{kdcabang}/queue/call
   */
  callQueueForCabang(
    kdcabang: string,
    payload: QueueCallPayload,
  ): Observable<any> {
    if (!kdcabang) throw new Error("kdcabang is required");
    const url = `${this.API_BASE}/api/queue/call`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(url, payload, { headers });
  }

  /**
   * POST to https://websocket.clenicapp.com/api/notification/send
   * payload example: { title: 'permintaan laborat', message: 'test', channel: '076.hasil-laborat' }
   */
  sendNotification(payload: NotificationPayload): Observable<any> {
    if (!payload || !payload.title || !payload.channel) {
      throw new Error("Notification payload must include title and channel");
    }
    const url = `${this.API_BASE}/api/notification/send`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(url, payload, { headers });
  }
}
