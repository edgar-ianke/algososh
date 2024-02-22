interface INode<T> {
  value: T;
  next: INode<T> | null;
}
export const mockedList: INode<string> = {
  value: "0",
  next: { value: "34", next: { value: "8", next: { value: "1", next: null } } },
};
export const mockedListSize: number = 4;