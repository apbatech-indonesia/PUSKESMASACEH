import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBalitaSakitComponent } from "./form-balita-sakit.component";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [FormBalitaSakitComponent],
  exports: [FormBalitaSakitComponent],
  imports: [CommonModule, FormsModule, ToastrModule.forRoot()],
})
export class FormBalitaSakitModule {}
