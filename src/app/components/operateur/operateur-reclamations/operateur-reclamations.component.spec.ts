import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateurReclamationsComponent } from './operateur-reclamations.component';

describe('OperateurReclamationsComponent', () => {
  let component: OperateurReclamationsComponent;
  let fixture: ComponentFixture<OperateurReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperateurReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperateurReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
