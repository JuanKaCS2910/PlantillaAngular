import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoNewComponent } from './producto-new.component';

describe('ProductoNewComponent', () => {
  let component: ProductoNewComponent;
  let fixture: ComponentFixture<ProductoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
