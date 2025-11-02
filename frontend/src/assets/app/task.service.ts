import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
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

  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.base}/${id}`);
  }

  create(task: Partial<Task>) {
    return this.http.post<Task>(this.base, task);
  }

  update(id: number, task: Partial<Task>) {
    return this.http.put<Task>(`${this.base}/${id}`, task);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
