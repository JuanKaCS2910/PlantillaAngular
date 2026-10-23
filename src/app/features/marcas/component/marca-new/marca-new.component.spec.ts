import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaNewComponent } from './marca-new.component';

describe('MarcaNewComponent', () => {
  let component: MarcaNewComponent;
  let fixture: ComponentFixture<MarcaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
