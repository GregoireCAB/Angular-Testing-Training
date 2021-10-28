import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import {
  AddItem,
  CompleteAllItems,
  UncompleteAllItems,
} from 'src/app/stores/todo/todo.actions';
import { TodoState } from 'src/app/stores/todo/todo.state';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
      'select',
      'selectSnapshot',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [NgxsModule.forRoot()],
      providers: [{ provide: Store, useValue: storeSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item and reset input on enter', () => {
    const text = 'New todo item';
    component.inputCtrl.setValue(text);

    component.onEnter();

    expect(store.dispatch).toHaveBeenCalledOnceWith(new AddItem(text));
    expect(component.inputCtrl.value).toBeFalsy();
    expect(component.inputCtrl.touched).toBeFalse();
  });

  it('should complete all items if at least one is not complete', () => {
    store.selectSnapshot
      .withArgs(TodoState.areAllCompleted as any)
      .and.returnValue(false);

    component.toggleAll();

    expect(store.selectSnapshot).toHaveBeenCalledOnceWith(
      TodoState.areAllCompleted as any
    );
    expect(store.dispatch).toHaveBeenCalledOnceWith(new CompleteAllItems());
  });

  it('should uncomplete all items if they are all complete', () => {
    store.selectSnapshot
      .withArgs(TodoState.areAllCompleted as any)
      .and.returnValue(true);

    component.toggleAll();

    expect(store.selectSnapshot).toHaveBeenCalledOnceWith(
      TodoState.areAllCompleted as any
    );
    expect(store.dispatch).toHaveBeenCalledOnceWith(new UncompleteAllItems());
  });

  it('should display as many items as passed in @Input', () => {
    component.items = [
      { id: 1, text: 'First', completed: false },
      { id: 2, text: 'Second', completed: false },
      { id: 3, text: 'Third', completed: false },
    ];
    fixture.detectChanges();

    const containerElement = fixture.debugElement.query(
      By.css('.todoList__items')
    );

    expect(containerElement.children.length).toBe(3);
  });
});
