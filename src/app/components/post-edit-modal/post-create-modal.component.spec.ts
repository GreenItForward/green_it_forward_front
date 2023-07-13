import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateModalComponent } from './post-create-modal.component';

describe('PostCreateModalComponent', () => {
  let component: PostCreateModalComponent;
  let fixture: ComponentFixture<PostCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCreateModalComponent]
    });
    fixture = TestBed.createComponent(PostCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
