import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPagePage } from './selector-page.page';

describe('SelectorPagePage', () => {
  let component: SelectorPagePage;
  let fixture: ComponentFixture<SelectorPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorPagePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
