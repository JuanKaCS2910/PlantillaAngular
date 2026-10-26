import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHomeComponent } from './usuario-home.component';

describe('UsuarioHomeComponent', () => {
  let component: UsuarioHomeComponent;
  let fixture: ComponentFixture<UsuarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
