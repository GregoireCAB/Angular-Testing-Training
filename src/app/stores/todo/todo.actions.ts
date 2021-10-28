export class AddItem {
  public static readonly type = '[TODO] Add item';

  constructor(public text: string) {}
}

export class RemoveItem {
  public static readonly type = '[TODO] Remove item';

  constructor(public id: number) {}
}

export class CompleteItem {
  public static readonly type = '[TODO] Complete item';

  constructor(public id: number) {}
}

export class UncompleteItem {
  public static readonly type = '[TODO] Uncomplete item';

  constructor(public id: number) {}
}

export class CompleteAllItems {
  public static readonly type = '[TODO] Complete all items';
}

export class UncompleteAllItems {
  public static readonly type = '[TODO] Uncomplete all items';
}
