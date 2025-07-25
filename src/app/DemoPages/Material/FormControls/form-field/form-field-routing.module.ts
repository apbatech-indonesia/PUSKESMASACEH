import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormFieldComponent } from "./form-field.component";

const routes: Routes = [
  {
    path: "",
    component: FormFieldComponent,
    data: {
      title: "FormField",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormFieldRoutingModule {}
