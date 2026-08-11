import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateToDoItemDto, ToDoItem } from '../interfaces/to-do-item';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly apiUrl = 'http://localhost:3000/todos';

  private readonly http = inject(HttpClient);
  getTodos(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl).pipe(
      catchError(this.handleError),
    );
  }

  getToDoItemById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError),
    );
  }

  createTask(dto: CreateToDoItemDto): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, dto).pipe(
      catchError(this.handleError),
    );
  }

  updateTask(id: number, dto: Partial<ToDoItem>): Observable<ToDoItem> {
    return this.http.patch<ToDoItem>(`${this.apiUrl}/${id}`, dto).pipe(
      catchError(this.handleError),
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Неизвестная ошибка API';
    if (error.error instanceof ErrorEvent) {
      message = `Клиентская ошибка: ${error.error.message}`;
    } else {
      message = `Серверная ошибка: ${error.status} ${error.message}`;
    }
    console.error(message, error);
    return throwError(() => new Error(message));
  }
}