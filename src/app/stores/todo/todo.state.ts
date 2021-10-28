import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from '@ngxs/store/operators';
import { TodoItem } from 'src/app/interfaces/todo-item.interface';
import {
  AddItem,
  CompleteAllItems,
  CompleteItem,
  RemoveItem,
  UncompleteAllItems,
  UncompleteItem,
} from './todo.actions';

interface TodoStateModel {
  items: TodoItem[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TodoState {
  @Selector()
  public static items(state: TodoStateModel): TodoItem[] {
    return state.items;
  }

  @Selector([TodoState.items])
  public static areAllCompleted(items: TodoItem[]): boolean {
    if (items.length < 1) {
      return false;
    }

    for (const item of items) {
      if (!item.completed) {
        return false;
      }
    }

    return true;
  }

  @Action(CompleteItem)
  public completeItem(
    ctx: StateContext<TodoStateModel>,
    { id }: CompleteItem
  ): void {
    ctx.setState(
      patch<TodoStateModel>({
        items: updateItem(
          (item) => item?.id === id,
          patch({ completed: true })
        ),
      })
    );
  }

  @Action(UncompleteItem)
  public uncompleteItem(
    ctx: StateContext<TodoStateModel>,
    { id }: UncompleteItem
  ): void {
    ctx.setState(
      patch<TodoStateModel>({
        items: updateItem(
          (item) => item?.id === id,
          patch({ completed: false })
        ),
      })
    );
  }

  @Action(AddItem)
  public addItem(ctx: StateContext<TodoStateModel>, { text }: AddItem): void {
    const newItem: TodoItem = {
      id: Math.round(Math.random() * 1e6),
      completed: false,
      text,
    };

    ctx.setState(
      patch<TodoStateModel>({
        items: insertItem(newItem, 0),
      })
    );
  }

  @Action(RemoveItem)
  public removeItem(
    ctx: StateContext<TodoStateModel>,
    { id }: RemoveItem
  ): void {
    ctx.setState(
      patch<TodoStateModel>({
        items: removeItem((item) => item?.id === id),
      })
    );
  }

  @Action(CompleteAllItems)
  public completeAllItems(ctx: StateContext<TodoStateModel>): void {
    const items = ctx
      .getState()
      .items.map((item) => ({ ...item, completed: true }));

    ctx.patchState({ items });
  }

  @Action(UncompleteAllItems)
  public uncompleteAllItems(ctx: StateContext<TodoStateModel>): void {
    const items = ctx
      .getState()
      .items.map((item) => ({ ...item, completed: false }));

    ctx.patchState({ items });
  }
}
