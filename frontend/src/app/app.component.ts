import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <div class="page">
  <div class="header">
    <h1 class="h1">Mini-projet Node / Angular</h1>
    <span class="badge">Demo</span>
  </div>

  <div class="section">
    <task-form (created)="reload()"></task-form>
  </div>

  <div class="section">
    <task-list #list></task-list>
  </div>
</div>
  `
})
export class AppComponent {
  reload() { /* noop */ }
}
