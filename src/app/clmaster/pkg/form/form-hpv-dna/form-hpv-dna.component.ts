import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hpv-dna",
  templateUrl: "./form-hpv-dna.component.html",
  styleUrls: ["./form-hpv-dna.component.sass"],
})
export class FormHpvDnaComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  hpvDnaOptions = [
    "Negatif",
    "Positif (Tipe Lain)",
    "Tipe 52",
    "Tipe 18",
    "Tipe 16",
  ];

  modelHPVDNA = {
    hpvDna: "",
  };

  submitFormHPVDNA() {
    console.log("Data HPV DNA:", this.modelHPVDNA);
  }
}
