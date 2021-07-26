import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsAccountComponent } from './doctors-account.component';

describe('DoctorsAccountComponent', () => {
  let component: DoctorsAccountComponent;
  let fixture: ComponentFixture<DoctorsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
