import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBotoneraComponent } from './usuario-botonera.component';

describe('UsuarioBotoneraComponent', () => {
  let component: UsuarioBotoneraComponent;
  let fixture: ComponentFixture<UsuarioBotoneraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioBotoneraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioBotoneraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
