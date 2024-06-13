import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardOneComponent } from './wizard-one.component';

describe('WizardOneComponent', () => {
  let component: WizardOneComponent;
  let fixture: ComponentFixture<WizardOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardOneComponent]
    });
    fixture = TestBed.createComponent(WizardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
