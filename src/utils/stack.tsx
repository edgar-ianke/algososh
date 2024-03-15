export class Stack<T> {
  private container: T[] = [];

  push(item: T) {
    this.container.push(item);
  }
  pop() {
    this.container.pop();
  }
  getData() {
    return this.container;
  }
}
