import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import Swal from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [],
})
export class AppComponent {
  public userDetails: any;
  nama: any;
  hakAkses: any;

  title =
    "ArchitectUI - Angular 12 Bootstrap 5 & Material Design Admin Dashboard Template";
  content = "";
  received = [];
  sent = [];

  pasienNotification(msg) {
    let audio: HTMLAudioElement = new Audio(
      "https://clenicapp.com/notiflama.mp3"
    );
    audio.play();

    // this.toastr.success('Mendapat Pasien Baru', 'Sukses', {
    //   timeOut: 2000,
    // });

    Swal.fire({
      title: "Pasien Baru",
      text: msg,
      icon: "warning",
      // showCancelButton: true,
      confirmButtonText: "Oke",
      // cancelButtonText: 'No, let me think',
    });
  }
  pasienNotificationf(msg) {
    let audio: HTMLAudioElement = new Audio(
      "https://clenicapp.com/farmasi.mp3"
    );
    audio.play();

    // this.toastr.success('Mendapat Pasien Baru', 'Sukses', {
    //   timeOut: 2000,
    // });

    Swal.fire({
      title: "Pasien Baru",
      text: msg,
      icon: "warning",
      // showCancelButton: true,
      confirmButtonText: "Oke",
      // cancelButtonText: 'No, let me think',
    });
  }

  constructor(public toastr: ToastrService) {}

  sendMsg() {
    // WebSocket functionality removed
  }

  sendNotificationDokter(kodeDokter) {
    // WebSocket functionality removed
  }
}
