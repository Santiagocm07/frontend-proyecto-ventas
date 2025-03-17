import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionSegundofaComponent } from './identificacion-segundofa.component';

describe('IdentificacionSegundofaComponent', () => {
  let component: IdentificacionSegundofaComponent;
  let fixture: ComponentFixture<IdentificacionSegundofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentificacionSegundofaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificacionSegundofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
