import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-perilaku-merokok",
  templateUrl: "./form-perilaku-merokok.component.html",
  styleUrls: ["./form-perilaku-merokok.component.sass"],
})
export class FormPerilakuMerokokComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    merokokSetahun: "",
    pernahMerokok: "",
    asapRokok: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
