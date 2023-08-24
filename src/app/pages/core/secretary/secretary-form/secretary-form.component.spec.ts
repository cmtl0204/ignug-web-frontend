import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryFormComponent } from './secretary-form.component';

describe('SecretaryFormComponent', () => {
  let component: SecretaryFormComponent;
  let fixture: ComponentFixture<SecretaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
