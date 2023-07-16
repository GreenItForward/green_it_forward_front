import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFormComponent } from './community-form.component';

describe('CommunityComponent', () => {
  let component: CommunityFormComponent;
  let fixture: ComponentFixture<CommunityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityFormComponent]
    });
    fixture = TestBed.createComponent(CommunityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
