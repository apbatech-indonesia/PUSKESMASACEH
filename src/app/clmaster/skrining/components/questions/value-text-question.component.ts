import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-value-text-question",
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
        [value]="option.ValueText"
        [checked]="value === option.ValueText"
        (change)="onChange(option.ValueText)"
      />
      <label class="form-check-label" [for]="'option-' + questionId + no">
        {{ option.display }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueTextQuestionComponent),
      multi: true,
    },
  ],
})
export class ValueTextQuestionComponent implements ControlValueAccessor {
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
