import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentNotificationPage } from './student-notification.page';

describe('StudentNotificationPage', () => {
  let component: StudentNotificationPage;
  let fixture: ComponentFixture<StudentNotificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
