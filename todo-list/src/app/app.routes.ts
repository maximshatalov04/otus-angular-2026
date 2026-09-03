import { Routes } from '@angular/router';
import { ToDoList } from './to-do-list/to-do-list';
import { ToDoItemView } from './to-do-item-view/to-do-item-view';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { 
        path: 'tasks', 
        component: ToDoList,
        children: [
             { path: ':id', component: ToDoItemView }, // /tasks/1
        ],
     },
    { path: '**', redirectTo: '/tasks' },
];
