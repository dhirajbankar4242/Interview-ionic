import { Component, OnInit } from '@angular/core';
import { AdminHeaderPage } from '../admin-header/admin-header.page';
import { AdminRoutingModule } from "../admin-routing.module";
import { AdminFooterPage } from "../admin-footer/admin-footer.page";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: true,
  imports: [AdminHeaderPage, AdminRoutingModule, AdminFooterPage],
})
export class AdminLayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
