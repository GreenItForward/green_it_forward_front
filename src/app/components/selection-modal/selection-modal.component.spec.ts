import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionModalComponent } from './selection-modal.component';

describe('PostCreateModalComponent', () => {
  let component: SelectionModalComponent;
  let fixture: ComponentFixture<SelectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionModalComponent]
    });
    fixture = TestBed.createComponent(SelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
