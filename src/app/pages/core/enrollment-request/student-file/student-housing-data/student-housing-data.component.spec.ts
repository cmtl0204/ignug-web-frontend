import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHousingDataComponent } from './student-housing-data.component';

describe('StudentHousingDataComponent', () => {
  let component: StudentHousingDataComponent;
  let fixture: ComponentFixture<StudentHousingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentHousingDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentHousingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
