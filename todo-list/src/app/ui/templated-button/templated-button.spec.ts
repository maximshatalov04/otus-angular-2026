import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedButton } from './templated-button';

describe('TemplatedButton', () => {
  let component: TemplatedButton;
  let fixture: ComponentFixture<TemplatedButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatedButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatedButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
