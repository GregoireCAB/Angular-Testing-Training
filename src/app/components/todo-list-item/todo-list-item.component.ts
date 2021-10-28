import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';
import {
  CompleteItem,
  RemoveItem,
  UncompleteItem,
} from 'src/app/stores/todo/todo.actions';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit {
  @Input() item!: TodoItem;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  toggle(): void {
    const action = this.item.completed
      ? new UncompleteItem(this.item.id)
      : new CompleteItem(this.item.id);

    this.store.dispatch(action);
  }

  remove(): void {
    this.store.dispatch(new RemoveItem(this.item.id));
  }
}
