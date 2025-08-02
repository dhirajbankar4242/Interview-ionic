import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

export class LangInput {
  en!: string;
  mr!: string;
}

@Component({
  selector: 'app-multi-lang-input',
  templateUrl: './multi-lang-input.component.html',
  styleUrls: ['./multi-lang-input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MultiLangInputComponent, multi: true}
  ],
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class MultiLangInputComponent  implements OnInit {

  @Input() label: string | null = '';

  code = 'en';

  value: LangInput = {en: '', mr: ''};
  options = ['en', 'mr'];


  lang!: FormGroup;

  constructor(private fb: FormBuilder
  ) {

  }


  ngOnInit(): void {
    this.lang = this.fb.group({
      en: ['', [Validators.maxLength(64)]],
      mr: ['', [Validators.maxLength(64)]]
    });
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    if (value) {
      this.lang.patchValue(value);
    }
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    if (!isDisabled) {
      for (const control in this.lang.controls) {
        this.lang.controls[control].enable();
      }
    } else {
      for (const control in this.lang.controls) {
        this.lang.controls[control].disable();
      }
    }

  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: (value: any) => void) {
    this.lang.valueChanges.subscribe(fn);
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched() {
    this.onTouched();
  }

  onTouched() {
  }


}
