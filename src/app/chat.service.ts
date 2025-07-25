import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { io } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject("");
  socketUrl = localStorage.getItem("socketBaseUrl");

  constructor() {
    console.log("Socket URL : " + this.socketUrl);
  }

  socket = io("https://socketpkm.apbatech.com/");

  public sendMessage(message: any) {
    console.log("sendMessage: ", message);
    this.socket.emit("message", message);
  }

  public getNewMessage = () => {
    this.socket.on("message", (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
