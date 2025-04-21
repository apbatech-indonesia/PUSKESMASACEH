import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-perilaku-merokok",
  templateUrl: "./form-perilaku-merokok.component.html",
  styleUrls: ["./form-perilaku-merokok.component.sass"],
})
export class FormPerilakuMerokokComponent implements OnInit {
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
    merokokSetahun: "",
    pernahMerokok: "",
    asapRokok: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
