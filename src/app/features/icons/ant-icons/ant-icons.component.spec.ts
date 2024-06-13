import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntIconComponent } from './ant-icons.component';

describe('AntIconsComponent', () => {
  let component: AntIconComponent;
  let fixture: ComponentFixture<AntIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntIconComponent]
    });
    fixture = TestBed.createComponent(AntIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
