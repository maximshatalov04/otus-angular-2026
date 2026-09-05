import { Routes } from '@angular/router';
import { ToDoList } from './to-do-list/to-do-list';
import { ToDoListContainer } from './to-do-list-container/to-do-list-container';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: ToDoList,
    children: [
      { path: '', component: ToDoListContainer },
      { path: ':id', component: ToDoListContainer }, // /tasks/1
    ],
  },
  { path: '**', redirectTo: '/tasks' },
];
