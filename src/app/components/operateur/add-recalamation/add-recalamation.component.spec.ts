import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecalamationComponent } from './add-recalamation.component';

describe('AddRecalamationComponent', () => {
  let component: AddRecalamationComponent;
  let fixture: ComponentFixture<AddRecalamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecalamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecalamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
