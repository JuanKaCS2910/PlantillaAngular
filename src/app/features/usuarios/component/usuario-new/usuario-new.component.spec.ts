import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNewComponent } from './usuario-new.component';

describe('UsuarioNewComponent', () => {
  let component: UsuarioNewComponent;
  let fixture: ComponentFixture<UsuarioNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
