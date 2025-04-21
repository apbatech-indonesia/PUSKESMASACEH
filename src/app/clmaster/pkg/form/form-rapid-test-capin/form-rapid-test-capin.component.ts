import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-rapid-test-capin",
  templateUrl: "./form-rapid-test-capin.component.html",
  styleUrls: ["./form-rapid-test-capin.component.sass"],
})
export class FormRapidTestCapinComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelRapid = {
    hb: "",
    sifilis: "",
    hib: "",
    anemia: "",
  };

  submitFormRapid() {
    console.log("Rapid Test Capil:", this.modelRapid);
  }
}
