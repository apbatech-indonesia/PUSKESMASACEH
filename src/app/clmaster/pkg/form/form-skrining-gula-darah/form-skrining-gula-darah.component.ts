import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-skrining-gula-darah",
  templateUrl: "./form-skrining-gula-darah.component.html",
  styleUrls: ["./form-skrining-gula-darah.component.sass"],
})
export class FormSkriningGulaDarahComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  
  model = {
    gds: null,
    gdp: null,
  };

  submitForm() {
    console.log("Skrining Gula Darah:", this.model);
  }
}
