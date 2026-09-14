import { Routes } from '@angular/router';
import { ToDoListContainer } from './to-do-list-container/to-do-list-container';
import { Backlog } from './backlog/backlog';
import { Board } from './board/board';

export const routes: Routes = [
  { path: '', redirectTo: '/backlog', pathMatch: 'full' },
  {
    path: 'backlog',
    component: Backlog,
    title: 'LAYOUT.BACKLOG',
    children: [
      { path: '', component: ToDoListContainer }, { path: ':id', component: ToDoListContainer }, // /backlog/1
    ],
  },
  { path: 'board', component: Board, title: 'LAYOUT.BOARD' },
  { path: '**', redirectTo: '/backlog' },
];
