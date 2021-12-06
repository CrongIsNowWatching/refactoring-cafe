import Person from "../Person";
interface IOrder {
  menu: string;
  count: number;
}
class Cashier extends Person {
  constructor() {
    super();
    this.newOrder = {};
    this.receivedValue = 0;
    this.exchange = 0;
  }

  getOrder() {
    this.setNewOrder(order);
    POS.setCurrentOrderList(this.newOrder); // if (!isStart) return new Error() //=> startOrder()검증 역할
    this.getMoney(receivedMoney);
    this.returnExchange();
    this.provideWaitingNum();
  }

  setNewOrder({ menu, count }: IOrder) {
    const order = {
      menu: menu,
      count: count,
    };
    this.newOrder = order;
  }

  getMoney(receivedMoney: number) {
    this.setReceivedMoney(receivedMoney);
  }

  setReceivedMoney(receivedMoney: number) {
    this.receivedValue = receivedMoney;
  }

  returnExchange() {
    this.exchange = POS.calculateExchangeAmount(this.receivedValue);
    return this.exchange;
  }

  provideWaitingNum() {
    const waitingNum = POS.endOrder();
    return waitingNum;
  }
}

export default Cashier;
