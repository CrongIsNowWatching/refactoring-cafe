import Person from "../Person";

class Cashier extends Person {
  constructor() {
    super();
    this.newOrder = {
      menu: "",
      count: 0,
    };
    this.receivedValue = 0;
    this.exchange = 0;
  }

  getOrder() {
    // 주문을 접수한다.
    const orderInfo = this.makeNewOrder();
    POS.setCurrentOrderList(orderInfo); // if (!isStart) return new Error() //=> startOrder()검증 역할
    this.getMoney(receivedMoney);
    this.returnExchange();
    this.provideWaitingNum();
  }

  makeNewOrder(item, count) {
    // todo: setOrder

    return newOrder;
  }

  getMoney(receivedMoney) {
    // 손님에게 돈을 받는다.
    this.setReceivedMoney(receivedMoney);
  }

  setReceivedMoney(receivedMoney) {
    this.receivedValue = receivedMoney;
  }

  returnExchange() {
    // 손님에게 거스름 돈을 준다.
    this.exchange = POS.calculateExchangeAmount(this.receivedValue);
    return this.exchange;
  }

  provideWaitingNum() {
    // 손님에게 번호표를 준다.
    const waitingNum = POS.endOrder();
    return waitingNum;
  }
}

export default Cashier;
