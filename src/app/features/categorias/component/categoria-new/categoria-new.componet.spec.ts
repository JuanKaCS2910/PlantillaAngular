import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaNewComponet } from './categoria-new.componet';

describe('CategoriaNewComponet', () => {
  let component: CategoriaNewComponet;
  let fixture: ComponentFixture<CategoriaNewComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaNewComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaNewComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
