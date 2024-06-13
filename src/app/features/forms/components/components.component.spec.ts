import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponentsComponent } from './components.component';

describe('ComponentsComponent', () => {
  let component: FormsComponentsComponent;
  let fixture: ComponentFixture<FormsComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsComponentsComponent]
    });
    fixture = TestBed.createComponent(FormsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
