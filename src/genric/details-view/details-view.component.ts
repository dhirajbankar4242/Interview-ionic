import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { InputType, RecordFields } from 'src/dto/dtos';
import { HttpService } from 'src/services/http.service';
import { ToasterService } from 'src/services/toaster.service';
import {ModalController} from "@ionic/angular";
import { ValidatorComponent } from "../validator/validator.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MultiLangInputComponent } from "../multi-lang-input/multi-lang-input.component";

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
  imports: [ValidatorComponent, IonicModule, ReactiveFormsModule, CommonModule, FormsModule, MultiLangInputComponent, IonicSelectableComponent],
})
export class DetailsViewComponent  implements OnInit {

  @Input() id: any;
  @Input() url: string = '';
  @Input() recordFields: RecordFields[] = [];
  submitted = false;
  isEditMode = false;
  isInsertMode = false;
  recordForm!: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder, private http: HttpService, private toaster: ToasterService) {
  }

  ngOnInit() {
    this.isInsertMode = this.id == null;
    const formControls: any = {};
    this.recordFields.forEach(field => {
      formControls[field.key] = [{value: field.default || '', disabled: !this.isInsertMode}, field.validators];
      if (field.type === InputType.DROP_DOWN && field.url) {
        field.dropDownOptions = this.getDropDownOptions(field.url);
      }
    });
    this.recordForm = this.fb.group(formControls);
    this.getRecord();
  }

  getDropDownOptions(url: string): any[] {
    const data: any[] = [];
    this.getApiCall(url).then(response => {
      for (const item of response) {
        const itemData = JSON.parse(item);
        data.push({value: itemData.id, label: itemData.name});
      }
    });
    return data;
  }

  async getApiCall(url: string) {
    return await this.http.get(url).toPromise();
  }

  getRecord() {
    if (this.id) {
      this.http.get(this.url + '/' + this.id).subscribe((data: any) => {
        this.recordForm.patchValue(data);
      });
    }
  }


  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      for (const control in this.recordForm.controls) {
        this.recordForm.controls[control].enable();
      }
    } else {
      for (const control in this.recordForm.controls) {
        this.recordForm.controls[control].disable();
      }
    }
  }

  saveChanges() {
    this.submitted = true;
    if (this.recordForm.invalid) {
      return;
    }
    if (this.isInsertMode) {
      this.http.post(this.url, this.recordForm.value).subscribe(() => {
        this.toaster.success('record created successfully').then(() => {
          this.dismissModal({msg: "record"});
        });
      });
    } else {
      this.http.put(this.url, {id: this.id, ...this.recordForm.value}).subscribe(() => {
        this.toaster.success('record updated successfully').then(() => {
          this.dismissModal({msg: "record"});
        });
      });
    }
  }

  public get inputType() {
    return InputType;
  }

  checkType(type: any, inputType: InputType) {
    return inputType === type;
  }

  getLabel(field: RecordFields) {
    if (field.validators) {
      for (const validator of field.validators) {
        if (validator === Validators.required) {
          return field.label + '*';
        }

      }
    }
    return field.label;
  }

  onDropdownSearch(event: { component: IonicSelectableComponent; text: string }, url: any) {

    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = [];
      event.component.endSearch();
      return;
    }

    this.http
      .get(url + '?search=' + text)
      .subscribe((ports) => {
        event.component.items = ports;
        event.component.endSearch();
      });

  }

}
