import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsersComponent } from './browsers.component';

describe('BrowsersComponent', () => {
  let component: BrowsersComponent;
  let fixture: ComponentFixture<BrowsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
