import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'task-list',
  template: `
    <div class="card">
  <div class="header">
  <input class="search" type="text" placeholder="Rechercher…" [(ngModel)]="searchTerm" >
    <button class="btn btn-ghost" (click)="refresh()">Rafraîchir</button>
  </div>

  <ul class="list">
    <li class="item" *ngFor="let t of filteredTasks()">
      <input type="checkbox" [checked]="t.done" (change)="toggle(t)">
      <div class="task">
        <div class="title-line">
          <span class="title" [class.done]="t.done">{{ t.title }}</span>
          <span class="badge" *ngIf="t.done">Terminé</span>
          <span class="badge warn" *ngIf="!t.done">À faire</span>
        </div>
        <div class="item-meta">{{ t.createdAt | date:'short' }}</div>
        <div *ngIf="t.description">{{ t.description }}</div>
      </div>
      <div class="item-actions">
        <button class="btn" (click)="edit(t)">Éditer</button>
        <button class="btn btn-danger" (click)="remove(t)">Supprimer</button>
      </div>
    </li>
  </ul>
</div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private svc: TaskService) { }

  ngOnInit() { this.load(); }

  refresh() { this.load(); }

  load() {
    this.loading = true;
    this.svc.list().subscribe({
      next: t => { this.tasks = t; this.loading = false; },
      error: e => { console.error(e); this.loading = false; }
    });
  }

  filteredTasks(): Task[] {
    if (!this.searchTerm.trim()) return this.tasks;
    const term = this.searchTerm.toLowerCase();
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(term) ||
      (t.description && t.description.toLowerCase().includes(term))
    );
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
