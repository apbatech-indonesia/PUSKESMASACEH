import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-iva",
  templateUrl: "./form-iva.component.html",
  styleUrls: ["./form-iva.component.sass"],
})
export class FormIvaComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  inspekuloOptions = ["Normal", "Curiga Kanker"];
  ivaOptions = ["Negatif", "Positif"];

  modelIVA = {
    inspekulo: "",
    iva: "",
  };

  submitFormIVA() {
    console.log("Data Pemeriksaan IVA:", this.modelIVA);
  }
}
