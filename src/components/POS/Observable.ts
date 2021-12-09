// import { IOrder } from "./index";

class Observable {
  observers: Set<Function>; //정하기
  constructor() {
    console.log(11);
    this.observers = new Set();
  }

  notify<T>(arg?: T) {
    [...this.observers].forEach(callback => callback(arg));
  }

  subscribe(observer: Function) {
    if (this.observers.has(observer)) return;

    this.observers.add(observer);
  }

  unsubscribe(observer: Function) {
    if (!this.observers.has(observer)) return;

    this.observers.delete(observer);
  }
}

const test = new Observable();
export default Observable;
