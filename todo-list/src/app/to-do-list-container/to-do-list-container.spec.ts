import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListContainer } from './to-do-list-container';

describe('ToDoListContainer', () => {
  let component: ToDoListContainer;
  let fixture: ComponentFixture<ToDoListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
