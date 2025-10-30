import { Injectable } from "@angular/core";
import { Subject, Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";

const CHAT_URL = "https://socketpkm.apbatech.com/";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class WebsocketService {
  private ws: WebSocket;
  private subject = new Subject<Message>();
  public messages: Observable<Message> = this.subject.asObservable();

  constructor() {
    this.connect(CHAT_URL);
  }

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.subject.next(data);
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket closed");
    };

    console.log("Connected to: " + url);
  }

  sendMessage(message: Message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}
