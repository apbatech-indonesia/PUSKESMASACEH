import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-foto-thorax",
  templateUrl: "./form-foto-thorax.component.html",
  styleUrls: ["./form-foto-thorax.component.sass"],
})
export class FormFotoThoraxComponent implements OnInit {
  modelFotoThorax = {
    hasil: "",
  };
  constructor() {}

  ngOnInit(): void {}

  submitFormFotoThorax() {
    console.log("Foto Thorax:", this.modelFotoThorax);
  }
}
