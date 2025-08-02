import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentHeaderPage } from './student-header.page';

describe('StudentHeaderPage', () => {
  let component: StudentHeaderPage;
  let fixture: ComponentFixture<StudentHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
