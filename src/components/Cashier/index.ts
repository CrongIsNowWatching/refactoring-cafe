import Person from "../Person/"; //향후 추상화 예정
import POS from "../POS/"; //인스턴스 import 해오기
interface IOrder {
  menu: string;
  count: number;
}
class Cashier extends Person {
  newOrder: IOrder;
  receivedValue: number;
  exchange: number;

  constructor() {
    super();
    this.newOrder = { menu: "", count: 0 };
    this.receivedValue = 0;
    this.exchange = 0;
  }

  getOrder(menu: string, count: number, receivedMoney: number) {
    this.setNewOrder({ menu: menu, count: count });
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
