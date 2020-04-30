import {
  Component,
  OnInit,
  Input,
  Self,
  Optional,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import {  isFunction } from 'lodash-es';
import { TemplateOptions } from './options';
@Component({
  selector: 'app-control',
  templateUrl: './app-control.html',
  styleUrls: ['./app-control.css'],
})
export class AppConstrolComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input', { static: true })
  input: ElementRef;
  onChange = (p: any) => {};
  onTouched = () => {};
  errorMessages = new Map<string, string>();
  @Input()
  options: TemplateOptions;

  @Input()
  disabled = false;

  constructor(@Self() @Optional() public controlDir: NgControl) {
    this.controlDir && (this.controlDir.valueAccessor = this);
  }

  ngOnInit() {
    this.setValidators();
    this.setErrorMessages();
  }

  setValidators() {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    if (this.options.required) {
      validators.push(Validators.required);
    }
    if (this.options.minlength) {
      validators.push(Validators.minLength(this.options.minlength));
    }
    if(this.options.validators){
      this.options.validators.map((validator) => {
        if(isFunction(validator)){
          validators.push(validator);
        }
        });
    }
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  setErrorMessages() {
    Object.keys(this.options.errorMessages).map((key) =>
      this.errorMessages.set(key, this.options.errorMessages[key])
    );

    if (this.options.required && !this.errorMessages.has('required')) {
      this.errorMessages.set(
        'required',
        `${this.options.label} is required.`
      );
    }
    if (this.options.minlength && !this.errorMessages.has('minlength')) {
      this.errorMessages.set(
        'minlength',        
          `The number of characters should not be less than ${this.options.minlength}.`
      );
    }
  }

  get invalid(): boolean {
    return this.controlDir ? !this.controlDir.valid : false;
  }

  get showError(): boolean {
    if (!this.controlDir) {
      return false;
    }

    const { dirty, touched } = this.controlDir;
    return this.invalid ? dirty || touched : false;
  }

  get errors(): Array<string> {
    if (!this.controlDir) {
      return [];
    }

    return Object.keys(this.controlDir.errors).map((key) => 
      this.errorMessages.has(key)
        ? this.errorMessages.get(key)
        : this.controlDir.errors[key] || key
    );
  }

  onValueChange($event) {
    this.onChange($event.target.value);
  }

  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
