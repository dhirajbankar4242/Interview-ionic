import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLayoutHeaderPage } from './admin-layout-header.page';

describe('AdminLayoutHeaderPage', () => {
  let component: AdminLayoutHeaderPage;
  let fixture: ComponentFixture<AdminLayoutHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
