import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroquisComponent } from './croquis.component';

describe('CroquisComponent', () => {
  let component: CroquisComponent;
  let fixture: ComponentFixture<CroquisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroquisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroquisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
