import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCreationComponent } from './consultation-creation.component';

describe('ConsultationCreationComponent', () => {
  let component: ConsultationCreationComponent;
  let fixture: ComponentFixture<ConsultationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
