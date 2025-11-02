import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list.component';
import { TaskService } from './task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    mockTaskService = {
      list: jasmine.createSpy('list').and.returnValue(of([
        { id: 1, title: 'Test 1', done: false },
        { id: 2, title: 'Test 2', done: true }
      ])),
      update: jasmine.createSpy('update').and.returnValue(of({})),
      delete: jasmine.createSpy('delete').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].title).toBe('Test 1');
  });

  it('should filter tasks by searchTerm', () => {
    component.searchTerm = 'Test 2';
    expect(component.filteredTasks().length).toBe(1);
    expect(component.filteredTasks()[0].title).toBe('Test 2');
  });

  it('should call update when toggling', () => {
    component.toggle(component.tasks[0]);
    expect(mockTaskService.update).toHaveBeenCalledWith(1, { done: true });
  });

  it('should call delete when removing', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.remove(component.tasks[0]);
    expect(mockTaskService.delete).toHaveBeenCalledWith(1);
  });
});
