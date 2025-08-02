import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss'],
  imports: [CommonModule, ]
})
export class ValidatorComponent   {
  
 
  @Input() public control!: AbstractControl<any, any>;
  @Input() submitted: boolean = false;

  validators = {
    "required": "required",
    "email": "E-mail is not valid",
    "minlength": "Invalid Minimum input length, limit:",
    "maxlength": "Invalid Maximum input length, limit:",
    "min": "Invalid Minimum input value, allowed values >",
    "min_date": "Invalid, older date selected",
    "max": "Invalid Minimum input value, allowed values <=",
    "max_date": "Invalid, upcoming date selected",
    "pattern": "Invalid,wrong pattern for input format."
  };

}
