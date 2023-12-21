import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSubjectListComponent } from './enrollment-subject-list.component';

describe('EnrollmentSubjectListComponent', () => {
  let component: EnrollmentSubjectListComponent;
  let fixture: ComponentFixture<EnrollmentSubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentSubjectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
