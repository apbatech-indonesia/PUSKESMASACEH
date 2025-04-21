import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-leher-rahim",
  templateUrl: "./form-leher-rahim.component.html",
  styleUrls: ["./form-leher-rahim.component.sass"],
})
export class FormLeherRahimComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    hubunganIntimKanker: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
