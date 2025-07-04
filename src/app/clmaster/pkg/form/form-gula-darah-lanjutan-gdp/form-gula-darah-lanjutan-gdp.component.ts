import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gula-darah-lanjutan-gdp",
  templateUrl: "./form-gula-darah-lanjutan-gdp.component.html",
  styleUrls: ["./form-gula-darah-lanjutan-gdp.component.sass"],
})
export class FormGulaDarahLanjutanGdpComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelGulaLanjutan = {
    gdp: null,
    pp2: null,
  };

  submitFormGulaLanjutan() {
    console.log("Gula Darah Lanjutan:", this.modelGulaLanjutan);
  }
}
