import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-aktivitas-fisik",
  templateUrl: "./form-aktivitas-fisik.component.html",
  styleUrls: ["./form-aktivitas-fisik.component.sass"],
})
export class FormAktivitasFisikComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}
  model = {
    olahraga: "",
    frekuensi: null,
    durasi: null,
  };

  submitForm() {
    console.log(this.model);
  }
}
