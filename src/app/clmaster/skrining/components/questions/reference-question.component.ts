import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-reference-question",
  template: `
    <div class="row">
      <div class="col-6" *ngFor="let option of options; let no = index">
        <div class="form-check form-check-inline">
          <input
            [disabled]="disabled"
            class="form-check-input"
            [name]="'question' + questionId"
            type="checkbox"
            [id]="'option-' + questionId + no"
            [value]="option.option_value.valueReference"
            [(ngModel)]="option.isChecked"
            (ngModelChange)="onAnswerChange($event)"
          />
          <label class="form-check-label" [for]="'option-' + questionId + no">
            {{ option.display }}
          </label>
        </div>
      </div>
    </div>
  `,
})
export class ReferenceQuestionComponent {
  @Input() options: any[] = [];
  @Input() questionId: string;
  @Input() disabled: boolean = false;
  @Input() set value(val: any) {
    // Handle value setting if needed
  }
  @Output() valueChange = new EventEmitter<any>();

  onAnswerChange(value: any) {
    this.valueChange.emit(value);
  }
}
