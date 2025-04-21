import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-periodontal",
  templateUrl: "./form-periodontal.component.html",
  styleUrls: ["./form-periodontal.component.sass"],
})
export class FormPeriodontalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelPeriodontal = {
    pocket: "",
    gigiGoyang: "",
  };

  submitFormPeriodontal() {
    console.log("Data Skrining Periodontal:", this.modelPeriodontal);
  }
}
