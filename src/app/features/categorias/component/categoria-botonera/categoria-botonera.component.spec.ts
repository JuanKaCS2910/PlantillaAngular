import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBotoneraComponent } from './categoria-botonera.component';

describe('CategoriaBotoneraComponent', () => {
  let component: CategoriaBotoneraComponent;
  let fixture: ComponentFixture<CategoriaBotoneraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaBotoneraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaBotoneraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
