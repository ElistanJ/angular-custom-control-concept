import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TemplateOptions } from './app-control/options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-building-custom-form-control-demo';
  options: {[field: string]: TemplateOptions};

  formGroup: FormGroup = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [''],
      email: [''],
    });

    this.formGroup.patchValue({email: 'aaa@aa.aa'});

    this.options = {
      email: {
        type: 'text',
        label: 'Email',
        placeholder: 'Please enter email',
        minlength: 3,
        required: true,
        errorMessages: {
          required: 'Email is required.',
          minlength: 'The number of characters should not be less than 3.',
          email: 'Email is invalid.',
        },
        validators: [Validators.email]
      },
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Please enter name',
        minlength: 5,
        required: true,
        errorMessages: {
          required: 'Name is required.',
          minlength: 'The number of characters should not be less than 5.'
        }
      }
    };
  }

  onSubmit(){
  }
}
