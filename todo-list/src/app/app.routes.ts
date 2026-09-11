import { Routes } from '@angular/router';
import { ToDoListContainer } from './to-do-list-container/to-do-list-container';
import { Backlog } from './backlog/backlog';
import { Board } from './board/board';

export const routes: Routes = [
  { path: '', redirectTo: '/backlog', pathMatch: 'full' },
  {
    path: 'backlog',
    component: Backlog,
    title: 'Backlog',
    children: [
      { path: '', component: ToDoListContainer },
      { path: ':id', component: ToDoListContainer }, // /backlog/1
    ],
  },
  { path: 'board', component: Board, title: 'Board' },
  { path: '**', redirectTo: '/backlog' },
];
