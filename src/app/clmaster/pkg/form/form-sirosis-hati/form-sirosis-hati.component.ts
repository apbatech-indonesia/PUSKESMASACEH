import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-sirosis-hati",
  templateUrl: "./form-sirosis-hati.component.html",
  styleUrls: ["./form-sirosis-hati.component.sass"],
})
export class FormSirosisHatiComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelHati = {
    sgot: null,
    trombosit: null,
    aspri: "",
  };

  submitFormHati() {
    console.log("Fungsi Hati:", this.modelHati);
  }
}
