import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsCardComponent } from './patients-card.component';

describe('PatientsCardComponent', () => {
  let component: PatientsCardComponent;
  let fixture: ComponentFixture<PatientsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
