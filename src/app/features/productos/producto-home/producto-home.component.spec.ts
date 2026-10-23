import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoHomeComponent } from './producto-home.component';

describe('ProductoHomeComponent', () => {
  let component: ProductoHomeComponent;
  let fixture: ComponentFixture<ProductoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
