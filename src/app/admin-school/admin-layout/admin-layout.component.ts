import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { AdminLayoutFooterPage } from "../admin-layout-footer/admin-layout-footer.page";
import { AdminLayoutHeaderPage } from "../admin-layout-header/admin-layout-header.page";
import { AdminRoutingModule } from "../admin-routing.module";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [ AdminRoutingModule,  AdminLayoutHeaderPage, AdminLayoutFooterPage, IonContent],
})
export class AdminLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
