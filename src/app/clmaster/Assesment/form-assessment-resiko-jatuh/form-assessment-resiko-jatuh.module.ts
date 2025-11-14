import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormAssessmentResikoJatuhComponent } from "./form-assessment-resiko-jatuh.component";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [FormAssessmentResikoJatuhComponent],
  exports: [FormAssessmentResikoJatuhComponent],
  imports: [CommonModule, FormsModule, ToastrModule.forRoot()],
})
export class FormAssessmentResikoJatuhModule {}
