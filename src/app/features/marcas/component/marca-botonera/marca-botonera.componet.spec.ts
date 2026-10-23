import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaBotoneraComponet } from './marca-botonera.componet';

describe('MarcaBotoneraComponet', () => {
  let component: MarcaBotoneraComponet;
  let fixture: ComponentFixture<MarcaBotoneraComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaBotoneraComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaBotoneraComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
