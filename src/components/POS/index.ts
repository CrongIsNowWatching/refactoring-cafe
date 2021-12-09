import menu from "../../data/menu";

export interface IOrder {
  menu: string;
  count: number;
}

class POS {
  orderList: Map<string, number>;
  orderNumber: number; //주문번호
  totalAmount: number; //주문 총액
  isStart: boolean; //주문 시작 여부
  menu: typeof menu;

  constructor() {
    this.orderList = new Map<string, number>();
    this.orderNumber = 1;
    this.totalAmount = 0;
    this.isStart = false;
    this.menu = menu;
  }

  startOrder() {
    this.orderNumber++;
    this.isStart = true;
  }

  resetOrder() {
    this.orderList = new Map<string, number>();
    this.totalAmount = 0;
  }

  setOrderList(order: IOrder) {
    console.log("setOrderList");
    // this.startOrder();
    this.orderNumber++;
    this.isStart = true;
    const { menu, count } = order;
    this.orderList.set(menu, count);
  }

  calculateExchangeAmount(receivedMoney: number) {
    //캐셔가 사용
    console.log("calculateExchangeAmount");
    const exchange = this.totalAmount - receivedMoney;
    exchange >= 0 ? exchange : alert(`${Math.abs(exchange)}원이 부족합니다.`);
  }

  endOrder(): number {
    //캐셔가 사용
    const requestedOrderNumber = this.orderNumber;
    this.resetOrder();

    return requestedOrderNumber;
  }
}

export default POS;
