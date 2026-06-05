import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListTitle } from './to-do-list-title';

describe('ToDoListTitle', () => {
  let component: ToDoListTitle;
  let fixture: ComponentFixture<ToDoListTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
