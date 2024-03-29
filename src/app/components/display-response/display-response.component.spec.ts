import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResponseComponent } from './display-response.component';

describe('DisplayResponseComponent', () => {
  let component: DisplayResponseComponent;
  let fixture: ComponentFixture<DisplayResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayResponseComponent]
    });
    fixture = TestBed.createComponent(DisplayResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
