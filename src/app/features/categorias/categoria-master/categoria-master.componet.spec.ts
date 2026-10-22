import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaMasterComponet } from './categoria-master.componet';

describe('CategoriaMasterComponet', () => {
  let component: CategoriaMasterComponet;
  let fixture: ComponentFixture<CategoriaMasterComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaMasterComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaMasterComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
