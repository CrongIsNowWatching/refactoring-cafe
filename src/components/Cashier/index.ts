import Person from "../Person/"; //향후 추상화 예정
import POS from "../POS/"; //인스턴스 import 해오기

class Cashier extends Person {
  exchange: number;

  constructor() {
    super();
    this.exchange = 0;
  }

  getOrder(menu: string, receivedMoney: number) {
    POS.setOrder(menu); // if (!isStart) return new Error() //=> startOrder()검증 역할
    this.returnExchange(receivedMoney);
    this.provideWaitingNum();
    POS.endOrder();
  }

  returnExchange(receivedMoney: number) {
    this.exchange = (POS.calculateExchangeAmount(receivedMoney) as number);
    console.log(`거스름돈 ${this.exchange}원을 반환하였습니다.`);
  }

  provideWaitingNum() {
    const waitingNum = POS.endOrder();
    console.log(`주문번호 ${waitingNum}번이 접수되었습니다.`);
  }
}

export default Cashier;
