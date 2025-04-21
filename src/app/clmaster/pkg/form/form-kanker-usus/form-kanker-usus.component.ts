import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-kanker-usus",
  templateUrl: "./form-kanker-usus.component.html",
  styleUrls: ["./form-kanker-usus.component.sass"],
})
export class FormKankerUsusComponent implements OnInit {
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  model = {
    riwayatKeluargaUsus: "",
    merokokUsus: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
