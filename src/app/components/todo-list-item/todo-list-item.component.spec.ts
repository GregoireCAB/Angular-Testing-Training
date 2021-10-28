import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import {
  CompleteItem,
  RemoveItem,
  UncompleteItem,
} from 'src/app/stores/todo/todo.actions';

import { TodoListItemComponent } from './todo-list-item.component';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [TodoListItemComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;

    component.item = { id: 1, text: 'Lorem ipsum', completed: false };

    fixture.detectChanges();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check item when not checked when calling toggle()', () => {
    component.toggle();

    expect(store.dispatch).toHaveBeenCalledOnceWith(new CompleteItem(1));
  });

  it('should uncheck item when already checked when calling toggle()', () => {
    component.item.completed = true;
    fixture.detectChanges();

    component.toggle();

    expect(store.dispatch).toHaveBeenCalledOnceWith(new UncompleteItem(1));
  });

  it('should remove item when calling remove()', () => {
    component.remove();

    expect(store.dispatch).toHaveBeenCalledOnceWith(new RemoveItem(1));
  });

  it('should be lined-through when completed', () => {
    component.item.completed = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.todoListItem__body'));
    const elementStyle = window.getComputedStyle(element.nativeElement);

    expect(elementStyle.textDecorationLine).toBe('line-through');
  });
});
