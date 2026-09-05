import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { CreateToDoItemDto, ToDoItem } from '../interfaces/to-do-item';
import { environment } from '../../environments/environment';

const randomDelay = Math.random() * 1500;
@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly apiUrl = `${environment.apiUrl}/todos`;

  private readonly http = inject(HttpClient);
  getTodos(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl).pipe(delay(randomDelay));
  }

  createTask(dto: CreateToDoItemDto): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, dto).pipe(delay(randomDelay));
  }

  updateTask(id: string, dto: Partial<ToDoItem>): Observable<ToDoItem> {
    return this.http.patch<ToDoItem>(`${this.apiUrl}/${id}`, dto).pipe(delay(randomDelay));
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(delay(randomDelay));
  }
}