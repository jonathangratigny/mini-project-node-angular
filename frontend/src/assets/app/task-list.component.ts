import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'task-list',
  template: `
    <div>
      <h2>Liste des tâches</h2>
      <div *ngIf="loading">Chargement...</div>
      <ul>
        <li *ngFor="let t of tasks">
          <input type="checkbox" [checked]="t.done" (change)="toggle(t)">
          <strong [style.textDecoration]="t.done ? 'line-through' : 'none'">{{t.title}}</strong>
          <button (click)="edit(t)">Éditer</button>
          <button (click)="remove(t)">Supprimer</button>
          <div *ngIf="t.description">{{t.description}}</div>
        </li>
      </ul>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;

  constructor(private svc: TaskService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.list().subscribe(data => { this.tasks = data; this.loading = false; });
  }

  toggle(t: Task) {
    this.svc.update(t.id!, { done: !t.done }).subscribe(() => this.load());
  }

  edit(t: Task) {
    const title = prompt('Titre', t.title);
    if (title === null) return;
    const desc = prompt('Description', t.description || '');
    this.svc.update(t.id!, { title, description: desc }).subscribe(() => this.load());
  }

  remove(t: Task) {
    if (!confirm('Supprimer ?')) return;
    this.svc.delete(t.id!).subscribe(() => this.load());
  }
}
