import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';
import {
  AddItem,
  CompleteAllItems,
  UncompleteAllItems,
} from 'src/app/stores/todo/todo.actions';
import { TodoState } from 'src/app/stores/todo/todo.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.areAllCompleted) areAllCompleted$!: Observable<boolean>;

  @Input() items: TodoItem[] = [];

  inputCtrl = new FormControl();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  trackById(_: number, item: TodoItem): number {
    return item.id;
  }

  onEnter(): void {
    if (!this.inputCtrl.value) {
      return;
    }

    this.store.dispatch(new AddItem(this.inputCtrl.value));
    this.inputCtrl.reset();
  }

  toggleAll(): void {
    const areAllCompleted = this.store.selectSnapshot(
      TodoState.areAllCompleted
    );
    const action = areAllCompleted
      ? new UncompleteAllItems()
      : new CompleteAllItems();

    this.store.dispatch(action);
  }
}
