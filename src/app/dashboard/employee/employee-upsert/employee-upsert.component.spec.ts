import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpsertComponent } from './employee-upsert.component';

describe('EmployeeUpsertComponent', () => {
  let component: EmployeeUpsertComponent;
  let fixture: ComponentFixture<EmployeeUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
