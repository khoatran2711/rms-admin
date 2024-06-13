import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniIconComponent } from './uni-icon.component';

describe('UniIconComponent', () => {
  let component: UniIconComponent;
  let fixture: ComponentFixture<UniIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniIconComponent]
    });
    fixture = TestBed.createComponent(UniIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
