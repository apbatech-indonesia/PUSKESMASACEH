import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-input-question",
  template: `
    <div
      class="input-group mb-2"
      *ngFor="let option of options; let no = index"
    >
      <input
        #inputField
        [disabled]="isDisabled"
        type="text"
        class="form-control"
        [ngModel]="value"
        (ngModelChange)="onInputChange($event)"
        (blur)="onTouched()"
      />
      <div class="input-group-prepend" *ngIf="option?.display">
        <div class="input-group-text">{{ option.display }}</div>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputQuestionComponent),
      multi: true,
    },
  ],
})
export class InputQuestionComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() questionId: string;

  @ViewChild("inputField") inputField: ElementRef;

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

  onInputChange(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
