import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from './task.service';
import { EventEmitter } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    mockTaskService = {
      create: jasmine.createSpy('create').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskFormComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if title is empty', () => {
    spyOn(window, 'alert');
    component.title = '';
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Titre requis');
    expect(mockTaskService.create).not.toHaveBeenCalled();
  });

  it('should call service and emit event on submit', () => {
    spyOn(component.created, 'emit');
    component.title = 'Nouvelle tâche';
    component.description = 'Description';
    component.submit();
    expect(mockTaskService.create).toHaveBeenCalledWith({ title: 'Nouvelle tâche', description: 'Description' });
    expect(component.title).toBe('');
    expect(component.description).toBe('');
    expect(component.done).toBe(false);
    expect(component.created.emit).toHaveBeenCalled();
  });

  it('should alert on error', () => {
    mockTaskService.create.and.returnValue(throwError(() => ({ message: 'Erreur API' })));
    spyOn(window, 'alert');
    component.title = 'Test';
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Erreur: Erreur API');
  });
});
