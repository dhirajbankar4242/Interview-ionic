import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFooterPage } from './student-footer.page';

describe('StudentFooterPage', () => {
  let component: StudentFooterPage;
  let fixture: ComponentFixture<StudentFooterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
