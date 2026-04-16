import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOperateurComponent } from './dashboard-operateur.component';

describe('DashboardOperateurComponent', () => {
  let component: DashboardOperateurComponent;
  let fixture: ComponentFixture<DashboardOperateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOperateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
