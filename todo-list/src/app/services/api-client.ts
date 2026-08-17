import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateToDoItemDto, ToDoItem } from '../interfaces/to-do-item';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly apiUrl = `${environment.apiUrl}/todos`;

  private readonly http = inject(HttpClient);
  getTodos(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl);
  }

  createTask(dto: CreateToDoItemDto): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, dto);
  }

  updateTask(id: number, dto: Partial<ToDoItem>): Observable<ToDoItem> {
    return this.http.patch<ToDoItem>(`${this.apiUrl}/${id}`, dto);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}