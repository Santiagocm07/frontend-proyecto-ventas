import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorCantidadComponent } from './contador-cantidad.component';

describe('ContadorCantidadComponent', () => {
  let component: ContadorCantidadComponent;
  let fixture: ComponentFixture<ContadorCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorCantidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
