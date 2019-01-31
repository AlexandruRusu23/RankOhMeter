export class GenericListModel<T> {
  constructor(public items: T[],
              public totalCount: number) {}
}
