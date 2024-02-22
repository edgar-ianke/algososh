export class Queue<T> {
  private container: T[] | ""[];
  head = 0;
  tail = 0;
  length = 0;
  size = 0;
  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill("");
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      return;
    }
    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  }
  dequeue() {
    this.container[this.head] = "";
    this.head = (this.head + 1) % this.size;
    this.length--;
  }
  reset() {
    this.container = Array(this.size).fill("");
    this.tail = 0;
    this.length = 0;
    this.head = 0;
  }
  getData() {
    return this.container;
  }
}
