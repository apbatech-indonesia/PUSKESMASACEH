import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-foto-thorax",
  templateUrl: "./form-foto-thorax.component.html",
  styleUrls: ["./form-foto-thorax.component.sass"],
})
export class FormFotoThoraxComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  modelFotoThorax = {
    hasil: "",
  };
  constructor() {}

  ngOnInit(): void {}

  submitFormFotoThorax() {
    console.log("Foto Thorax:", this.modelFotoThorax);
  }
}
