import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-select-question",
  template: `
    <select
      [name]="'question' + questionId"
      class="form-select"
      [disabled]="isDisabled"
      [value]="value"
      (change)="onChange($event.target.value)"
    >
      <option
        *ngFor="let option of options; let no = index"
        [value]="option.option_value.selectOption"
      >
        {{ option.display }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectQuestionComponent),
      multi: true,
    },
  ],
})
export class SelectQuestionComponent implements ControlValueAccessor {
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
