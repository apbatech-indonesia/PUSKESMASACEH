import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ValueTextQuestionComponent } from "./value-text-question.component";
import { BooleanQuestionComponent } from "./boolean-question.component";
import { InputQuestionComponent } from "./input-question.component";
import { SingleQuestionComponent } from "./single-question.component";
import { ReferenceQuestionComponent } from "./reference-question.component";
import { SelectQuestionComponent } from "./select-question.component";

@NgModule({
  declarations: [
    ValueTextQuestionComponent,
    BooleanQuestionComponent,
    InputQuestionComponent,
    SingleQuestionComponent,
    ReferenceQuestionComponent,
    SelectQuestionComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ValueTextQuestionComponent,
    BooleanQuestionComponent,
    InputQuestionComponent,
    SingleQuestionComponent,
    ReferenceQuestionComponent,
    SelectQuestionComponent,
  ],
})
export class QuestionsModule {}
