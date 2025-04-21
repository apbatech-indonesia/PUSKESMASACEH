import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tekanan-darah",
  templateUrl: "./form-tekanan-darah.component.html",
  styleUrls: ["./form-tekanan-darah.component.sass"],
})
export class FormTekananDarahComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    sistolik: null,
    diastolik: null,
    hasil: "",
  };

  submitForm() {
    this.model.hasil = this.getTekananDarahLabel(
      this.model.sistolik,
      this.model.diastolik
    );
    console.log("Tekanan Darah:", this.model);
  }

  getTekananDarahLabel(s: number, d: number): string {
    if (!s || !d) return "Tidak diketahui";
    if (s >= 140 || d >= 90) return "Hipertensi";
    if (s < 90 || d < 60) return "Hipotensi";
    return "Normal";
  }
}
