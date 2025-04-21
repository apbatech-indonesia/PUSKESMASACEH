import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tuberkulosis",
  templateUrl: "./form-tuberkulosis.component.html",
  styleUrls: ["./form-tuberkulosis.component.sass"],
})
export class FormTuberkulosisComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  model = {
    batukLama: "",
    kontakTBC: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
