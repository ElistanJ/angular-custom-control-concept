import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface TemplateOptions {
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  maxength?: number;
  minlength?: number;
  required?: boolean;
  validators?: [(control: AbstractControl) => ValidationErrors];
  errorMessages?: { [key: string]: string };
}
