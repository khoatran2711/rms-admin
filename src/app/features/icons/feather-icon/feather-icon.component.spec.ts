import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatherIconComponent } from './feather-icon.component';

describe('FeatherIconComponent', () => {
  let component: FeatherIconComponent;
  let fixture: ComponentFixture<FeatherIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatherIconComponent]
    });
    fixture = TestBed.createComponent(FeatherIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
