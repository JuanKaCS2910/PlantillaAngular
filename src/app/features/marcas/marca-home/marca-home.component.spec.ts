import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaHomeComponent } from './marca-home.component';

describe('MarcaHomeComponent', () => {
  let component: MarcaHomeComponent;
  let fixture: ComponentFixture<MarcaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
