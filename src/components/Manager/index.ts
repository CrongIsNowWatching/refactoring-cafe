import Person from "../Person/";

class Manager extends Person {
  constructor() {
    super();
  }

  // * 주문 대기표(orderList)를 1초마다 확인한다. 바리스타가 음료제작완료 이벤트를 발생시키면 dashboard를 업데이트 한다.
}

export default Manager;
