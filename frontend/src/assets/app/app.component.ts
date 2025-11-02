import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="max-width:800px;margin:2rem auto;font-family:Arial,Helvetica,sans-serif">
      <h1>Mini-projet Node/Angular</h1>
      <task-form (created)="reload()"></task-form>
      <task-list #list></task-list>
    </div>
  `
})
export class AppComponent {
  reload() {
    // placeholder if needed
  }
}
