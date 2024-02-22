export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(head?: Node<T>, size?: number) {
    this.head = head || null;
    this.size = size || 0;
  }
  append(element: T) {
    if (this.size === 10) {
      console.log("List is overloaded");
      return;
    }
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (this.size === 10) {
        console.log("List is overloaded");
        return;
      }
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIndex = 0;
        let prev = null;
        while (currentIndex < index) {
          prev = current;
          current = current!.next;
          currentIndex++;
        }
        prev!.next = node;
        node.next = current;
      }
      this.size++;
    }
  }
  deleteAt(index: number) {
    if (index < 0 || index > this.size - 1) {
      console.log("Enter a valid index");
      return;
    } else {
      let prev = null;
      let current = this.head;
      let currentIndex = 0;
      if (index === 0) {
        this.head = this.head!.next;
      } else {
        while (currentIndex < index) {
          prev = current;
          current = current!.next;
          currentIndex++;
        }
        prev!.next = current!.next;
      }
      this.size--;
    }
  }
  getSize() {
    return this.size;
  }
  showValues(): T[] {
    let res = [];
    let current: Node<T> | null = this.head;
    while (current !== null) {
      res.push(current.value);
      current = current.next;
    }
    return res;
  }
}
