import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsComponent } from './validations.component';

describe('ValidationsComponent', () => {
  let component: ValidationsComponent;
  let fixture: ComponentFixture<ValidationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationsComponent]
    });
    fixture = TestBed.createComponent(ValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
