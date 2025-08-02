import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherHeaderPage } from './teacher-header.page';

describe('TeacherHeaderPage', () => {
  let component: TeacherHeaderPage;
  let fixture: ComponentFixture<TeacherHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
