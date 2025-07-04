import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hasil-ekg",
  templateUrl: "./form-hasil-ekg.component.html",
  styleUrls: ["./form-hasil-ekg.component.sass"],
})
export class FormHasilEkgComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelJantung = {
    hasilEkg: "",
  };

  submitFormJantung() {
    console.log("Data Hasil Ekg:", this.modelJantung);
  }
}
