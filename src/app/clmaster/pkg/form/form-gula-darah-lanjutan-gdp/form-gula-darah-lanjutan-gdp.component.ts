import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gula-darah-lanjutan-gdp",
  templateUrl: "./form-gula-darah-lanjutan-gdp.component.html",
  styleUrls: ["./form-gula-darah-lanjutan-gdp.component.sass"],
})
export class FormGulaDarahLanjutanGdpComponent implements OnInit {
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
