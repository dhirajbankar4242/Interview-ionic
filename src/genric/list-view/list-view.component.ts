import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordFields } from 'src/dto/dtos';
import { HttpService } from 'src/services/http.service';
import { DetailsViewComponent } from '../details-view/details-view.component';
import {ModalController, MenuController} from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonicModule, FormsModule]
})
export class ListViewComponent  implements OnInit {

  
  @Input() url!: string;
  @Input() fields: RecordFields[] = [];
  @Input() sortData: any[] = [];
  @Input() component: any = DetailsViewComponent;
  @Input() colSize: number = 6;

  data: any[] = [];
  page = 0;
  totalPages = 0;

  currentFile?: File;
  progress = 0;
  message = '';

  public actionSheetButtons: any[] = [];

  constructor(private router: Router, private modalController: ModalController, private http: HttpService, private menuCtrl: MenuController) {
  }


  ngOnInit(): void {
    this.actionSheetButtons = [
      ...this.sortData,
      {
        text: 'Export',
        role: 'export',
      },
      {
        text: 'Upload',
        role: 'upload',
        data: {
          action: 'upload',
        },
      },
      {
        text: 'Maintain stock',
        role: 'Maintain stock',
        data: {
          action: 'select',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];
    this.getRecords();
  }

  filterClients(event: any) {
    const searchTerm = event.target.value;
    this.resetPagination();
    this.getRecords(searchTerm);

  }

  async openAddRecordModal() {
    const modal = await this.modalController.create({
      component: this.component,
      componentProps: {
        recordFields: this.fields,
        url: this.url
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        this.resetPagination();
        this.getRecords();
      }
    });

    return await modal.present();
  }

  private resetPagination() {
    this.data = [];
    this.page = 0;
  }

  async openRecordDetails(inputData: any) {
    const modal = await this.modalController.create({
      component: this.component,
      componentProps: {
        id: inputData.id,
        recordFields: this.fields,
        url: this.url
      }
    });
    modal.onDidDismiss().then((result) => {
      if (result && result.data) {
        this.resetPagination();
        this.getRecords();
      }
    });
    return await modal.present();
  }

  ignorableKeySet = ['name', 'status', 'id', 'code'];

  getRecordProperties(recordData: any): { label: string; value: string }[] {
    const properties: { label: string; value: any }[] = [];

    for (const [key, value] of Object.entries(recordData)) {
      if (this.ignorableKeySet.includes(key)) {
        continue;
      }
      properties.push({label: this.capitalize(key), value: value});
    }
    return properties;
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getRecords(search?: string | null, sortBy?: string, sortDir?: string): Promise<any> {

    return new Promise((resolve, reject) => {
      const request = {
        search: search || null,
        sortDir: sortDir || null,
        sortBy: sortBy || null,
        pageSize: 20,
        offset: this.page,
      };
      this.http.post(`${this.url}/page`, request).subscribe((data: any) => {
        for (const item of data.content) {
          const parsedItem = JSON.parse(item);

          const properties: { label: string; value: any }[] = [];
          for (const [key, value] of Object.entries(parsedItem)) {
            if (this.ignorableKeySet.includes(key)) {
              continue;
            }
            properties.push({label: this.capitalize(key), value: value});
          }

          this.data.push({...parsedItem, properties});
        }
        this.totalPages = data.totalPages;
        this.page = data.number;
        resolve('data load done');
      }, error => {
        reject('error while load data');
      })
    });
  }


  getMultiLangInput(text: any) {
    if (!text) {
      return '-';
    }
    return text.en ? text.en : (text || '-');
  }

  onIonInfinite(ev: any) {
    this.page++;
    this.getRecords().finally(() => {
      ev.target.complete()
    });
  }


  openOptionsMenu() {
    this.menuCtrl.enable(true, 'main-content');
    this.menuCtrl.open('main-content');
  }

  doAction(ev: any) {
    if (ev.detail.role === "export") {
      this.exportToExcel();
    } else if (ev.detail.role === "sort") {
      this.resetPagination();
      this.getRecords(null, ev.detail.data.sortBy, ev.detail.data.sortDir);
    } else if(ev.detail.role === "upload"){
      this.router.navigate(['upload-file'])      
    }else if(ev.detail.role === "Maintain stock"){
      this.router.navigate(['maintain-stock'])      
    }
  }

  exportToExcel() {
    this.http.downloadExcel(this.url + '/export');
  }

  
  

  getColumnAlignItems(itemIndex: number): string {
    if (this.colSize === 6) {
      return itemIndex % 2 == 0 ? 'start' : 'end';
    } else if (this.colSize === 4) {
      const relativeIndex = itemIndex - (Math.floor(itemIndex / 3)) * 3; //
      if (relativeIndex === 0) {
        return 'start';
      } else if (relativeIndex === 1) {
        return 'center';
      } else {
        return 'end';
      }
    }
    return 'stretch'; // Default value
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
