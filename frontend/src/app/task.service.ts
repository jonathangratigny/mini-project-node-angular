import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string | null;
  done?: boolean;
  createdAt?: string;
}

@Injectable()
export class TaskService {
  private base = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.base);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.base, task);
  }

  update(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.base}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
