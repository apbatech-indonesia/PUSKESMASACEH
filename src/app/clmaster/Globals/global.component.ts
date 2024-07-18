import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.sass']
})
export class GlobalComponent implements OnInit {

  public static localhost: string = 'http://127.0.0.1:8000';
  public static website: string = 'https://backtemprs.clenic.id';
  
  
  public static urlemr: string = 'https://barona.clenicapp.com/backend/public';
  // public static urlsocket: string = 'https://socketbarona.clenicapp.com';
  public static urlsocket: string = localStorage.getItem('socketBaseUrl');


  public static url: string = GlobalComponent.urlemr;
  public static urlsocketv:string = GlobalComponent.urlsocket;

  public static urlEmrBe: string = GlobalComponent.url;

  // public static urlGambarLocal: string = 'http://127.0.0.1:8000/';
  // public static urlGambarWebsite = 'https://backtemprs.clenic.id/public/';
  // public static urlGambarNabiya: string = 'https://emrnabiya.clenicapp.com/backend/public/';
  // public static urlGambarMaimunah: string = 'https://emrmaimunah.clenicapp.com/backend/public/';
  // public static urlGambarEfaMedika: string = 'https://emrefamedika.clenicapp.com/backend/public/';
  // public static urlGambar: string = GlobalComponent.urlGambarLocal;
  public static urlGambar: string = GlobalComponent.url + "/";
  public static masterUrlWebsite: string = 'https://mydemo.clenicapp.com/';
  public static masterUrlNabiya: string = 'https://knm.clenicapp.com/';
  public static masterUrlMaimunah: string = 'https://kmaimunah.clenicapp.com/';
  public static masterUrlEfaMedika: string = 'https://efamedika.clenicapp.com/';
  public static masterUrl: string = GlobalComponent.masterUrlWebsite;

  public static variabelGlobal = '';
  constructor() {
    console.log("Socket URL Global : " + localStorage.getItem('socketBaseUrl'))
   }

  ngOnInit(): void {
    console.log("Socket URL Global : " + localStorage.getItem('socketBaseUrl'))
  }

}
