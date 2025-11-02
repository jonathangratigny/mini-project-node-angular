import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'task-form',
  template: `
    <div class="card form">
  <div class="grid-2">
    <div class="form-field">
      <label>Titre</label>
      <input type="text" [(ngModel)]="title" placeholder="Ex : Inspection ligne 3">
    </div>
    <div class="form-field">
      <label>Statut</label>
      <select [(ngModel)]="done" class="btn">
        <option [ngValue]="false">À faire</option>
        <option [ngValue]="true">Terminé</option>
      </select>
    </div>
  </div>
  <div class="form-field">
    <label>Description</label>
    <textarea [(ngModel)]="description" placeholder="Détails…"></textarea>
  </div>
  <div class="actions">
    <button class="btn btn-primary" (click)="submit()">Créer</button>
    <span class="helper">Les champs marqués sont requis.</span>
  </div>
</div>
  `
})
export class TaskFormComponent {
  title = '';
  description = '';
  done = false;
  @Output() created = new EventEmitter<void>();

  constructor(private svc: TaskService) { }

  submit() {
    if (!this.title.trim()) return alert('Titre requis');
    this.svc.create({ title: this.title, description: this.description }).subscribe(() => {
      this.title = '';
      this.description = '';
      this.done = false;
      this.created.emit();
    }, err => alert('Erreur: ' + (err.message || err)));
  }
}
