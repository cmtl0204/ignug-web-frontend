import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalEmergencyInformationFormComponent } from './additional-emergency-information-form.component';

describe('AdditionalEmergencyInformationFormComponent', () => {
  let component: AdditionalEmergencyInformationFormComponent;
  let fixture: ComponentFixture<AdditionalEmergencyInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalEmergencyInformationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalEmergencyInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
