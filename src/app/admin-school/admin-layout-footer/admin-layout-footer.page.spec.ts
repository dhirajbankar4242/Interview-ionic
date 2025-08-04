import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayoutFooterPage } from './admin-layout-footer.page';

describe('AdminLayoutFooterPage', () => {
  let component: AdminLayoutFooterPage;
  let fixture: ComponentFixture<AdminLayoutFooterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
