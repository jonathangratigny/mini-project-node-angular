import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'task-form',
  template: `
    <div style="margin-bottom:1rem;">
      <h3>Ajouter une tâche</h3>
      <form (ngSubmit)="submit()">
        <input [(ngModel)]="title" name="title" placeholder="Titre" required>
        <input [(ngModel)]="description" name="description" placeholder="Description">
        <button type="submit">Ajouter</button>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  title = '';
  description = '';

  constructor(private svc: TaskService) {}

  submit() {
    if (!this.title.trim()) return alert('Titre requis');
    this.svc.create({ title: this.title, description: this.description }).subscribe(() => {
      this.title = '';
      this.description = '';
    }, err => alert('Erreur: ' + (err.message || err)));
  }
}
