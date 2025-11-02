import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list.component';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [AppComponent, TaskListComponent, TaskFormComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
