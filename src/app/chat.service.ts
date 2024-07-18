import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socketUrl = localStorage.getItem('socketBaseUrl');

  constructor() {
    console.log("Socket URL : " + this.socketUrl)
  }

  socket = io('http://sockettabaro.clenic.id/');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
