import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListForm } from './to-do-list-form';

describe('ToDoListForm', () => {
  let component: ToDoListForm;
  let fixture: ComponentFixture<ToDoListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
