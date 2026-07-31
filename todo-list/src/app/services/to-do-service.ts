import { Injectable, computed, signal } from '@angular/core';
import { ToDoState } from '../interfaces/to-do-state';
import { ToDoItem } from '../interfaces/to-do-item';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  #state = signal<ToDoState>({
    todos: [
      { id: 1, text: 'Lorem ipsum dolor sit amet consectetur.', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores eum rerum nulla! Inventore recusandae tempora quisquam, obcaecati ea at quia praesentium. Impedit cumque sint temporibus blanditiis exercitationem, nemo eligendi.' },
      { id: 2, text: 'Reprehenderit magnam nobis tempore ratione quasi?', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
      { id: 3, text: 'Ipsum delectus dicta reprehenderit illum enim!?', description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.' },
      { id: 4, text: 'Eum explicabo quaerat reprehenderit?', description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?.' },
    ],
    loading: true,
  });

  readonly todos = computed(() => this.#state().todos);
  readonly loading = computed(() => this.#state().loading);
  readonly selectedItem = computed(() =>
     this.todos()?.find(t => t.id === this.#state().selectedItemId));
  readonly editModeId = computed(() =>
    this.#state().editModeId);
  
  setLoaded() {
        this.#state.update(state => ({
      ...state,
      loading: false,
    }));
  }

  add(todo: Omit<ToDoItem,'id'>):number {
    const currentList = this.todos();
    const maxId = currentList.length === 0
      ? 0
      : currentList.reduce((max, item) => (item.id > max ? item.id : max), 0);

    const newItem = { id: maxId + 1, text: todo.text.trim(), description: todo.description?.trim() };
    
    this.#state.update(state => {


      return { ...state, todos: [...state.todos,  newItem] };
    });

    return newItem.id;
  }

  delete(id: number) {
    this.#state.update(state => ({
      ...state,
      todos: state.todos.filter(item => item.id !== id),
    }));
  }

  select(id: number) {
    this.#state.update(state => ({
      ...state,
      selectedItemId: id,
      editModeId: undefined,
    }));
  }

  update(newItem: ToDoItem) {
    const itemToChange = newItem;

    if(itemToChange.description){
      itemToChange.description = itemToChange.description.trim();
    }
    itemToChange.text = itemToChange.text.trim();

    this.#state.update(state => ({
      ...state,
      todos: state.todos.map(item =>
        item.id === newItem.id ? { ...newItem } : item,
      ),
    }));
  }

  setEditMode(id: number | undefined) {
    this.#state.update(state => ({
      ...state,
      editModeId: id,
    }));
  }
}

