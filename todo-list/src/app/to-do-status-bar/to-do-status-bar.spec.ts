import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoStatusBar } from './to-do-status-bar';

describe('ToDoStatusBar', () => {
  let component: ToDoStatusBar;
  let fixture: ComponentFixture<ToDoStatusBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoStatusBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoStatusBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
