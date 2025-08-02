import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";

// Import standalone components
import { ListViewComponent } from './list-view/list-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { MultiLangInputComponent } from './multi-lang-input/multi-lang-input.component';
import { ValidatorComponent } from './validator/validator.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    // IonicSelectableComponent,
    
    // Import standalone components
    ListViewComponent,
    DetailsViewComponent,
    MultiLangInputComponent,
    ValidatorComponent
  ],
  exports: [
    ListViewComponent,
    DetailsViewComponent,
    ValidatorComponent
  ]
})
export class GenricModule { }
