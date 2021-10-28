import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';
import { TodoState } from 'src/app/stores/todo/todo.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select(TodoState.items)
  items$!: Observable<TodoItem[]>;

  constructor() {}

  ngOnInit(): void {}
}
