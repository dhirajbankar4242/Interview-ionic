import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherFooterPage } from './teacher-footer.page';

describe('TeacherFooterPage', () => {
  let component: TeacherFooterPage;
  let fixture: ComponentFixture<TeacherFooterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
