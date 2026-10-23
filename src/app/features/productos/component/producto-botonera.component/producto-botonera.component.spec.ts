import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoBotoneraComponent } from './producto-botonera.component';

describe('ProductoBotoneraComponent', () => {
  let component: ProductoBotoneraComponent;
  let fixture: ComponentFixture<ProductoBotoneraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoBotoneraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoBotoneraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
