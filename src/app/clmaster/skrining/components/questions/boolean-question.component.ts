import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-boolean-question",
  template: `
    <div
      class="form-check form-check-inline"
      *ngFor="let option of options; let no = index"
    >
      <input
        [disabled]="isDisabled"
        class="form-check-input"
        [name]="'question' + questionId"
        type="radio"
        [id]="'option-' + questionId + no"
        [value]="option.valueBoolean"
        [checked]="value === option.valueBoolean"
        (change)="onChange(option.valueBoolean)"
      />
      <label class="form-check-label" [for]="'option-' + questionId + no">
        {{ option.display }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanQuestionComponent),
      multi: true,
    },
  ],
})
export class BooleanQuestionComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() questionId: string;

  value: any;
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
