import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-single-question",
  template: `
    <div class="row">
      <div class="col-6" *ngFor="let option of options; let no = index">
        <div class="form-check form-check-inline">
          <input
            [disabled]="isDisabled"
            class="form-check-input"
            [name]="'question' + questionId"
            type="radio"
            [id]="'option-' + questionId + no"
            [value]="option.option_value?.Singgle ?? ''"
            [checked]="value === (option.option_value?.Singgle ?? '')"
            (change)="onChange(option.option_value?.Singgle ?? '')"
          />
          <label class="form-check-label" [for]="'option-' + questionId + no">
            {{ option.display }}
          </label>
        </div>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleQuestionComponent),
      multi: true,
    },
  ],
})
export class SingleQuestionComponent implements ControlValueAccessor {
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
