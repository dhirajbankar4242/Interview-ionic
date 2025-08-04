import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFeesPage } from './student-fees.page';

describe('StudentFeesPage', () => {
  let component: StudentFeesPage;
  let fixture: ComponentFixture<StudentFeesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
