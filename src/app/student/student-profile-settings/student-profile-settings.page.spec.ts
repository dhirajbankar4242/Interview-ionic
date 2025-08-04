import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentProfileSettingsPage } from './student-profile-settings.page';

describe('StudentProfileSettingsPage', () => {
  let component: StudentProfileSettingsPage;
  let fixture: ComponentFixture<StudentProfileSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
