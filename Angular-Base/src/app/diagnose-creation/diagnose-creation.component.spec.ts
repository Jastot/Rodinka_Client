import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseCreationComponent } from './diagnose-creation.component';

describe('DiagnoseCreationComponent', () => {
  let component: DiagnoseCreationComponent;
  let fixture: ComponentFixture<DiagnoseCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoseCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
