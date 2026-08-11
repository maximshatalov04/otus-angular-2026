import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFilter } from './items-filter';

describe('ItemsFilter', () => {
  let component: ItemsFilter;
  let fixture: ComponentFixture<ItemsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
