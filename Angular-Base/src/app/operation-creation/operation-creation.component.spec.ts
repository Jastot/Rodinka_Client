import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCreationComponent } from './operation-creation.component';

describe('OperationCreationComponent', () => {
  let component: OperationCreationComponent;
  let fixture: ComponentFixture<OperationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
