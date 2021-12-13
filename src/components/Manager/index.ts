import Person from "../Person/";
import CafeSystem from "components/CafeSystem";
import DashBoard from "components/DashBoard";

//캐셔 주문 받는다 > POS 주문을 받은걸 대시보드에 업데이트 > 대시보드는 업데이트 한걸 배열에 가지고 있다 
//매니저는 대시보드를 계속 보고있다(checkOrderList). 지금 바리스타가 음료를 만들고 있지 않다면 대시보드의 주문표를 준다. 
//바리스타가 음료를 다 만들면 시스템을 통해 완성됨을 알린다.
//매니저는 대시보드를 보고있다가 바리스타가 음료 상태 업데이트 해주면 음료를 ?????
//매니저(Manager)는 바리스타가 보낸 특정 고객의 음료 제작 완료 이벤트를 받으면 현황판을 업데이트한다.
//매니저(Manager)는 음료를 확인하기 위해서 주문 대기표를 1초마다 확인한다.
interface IDrinkOrder {
  id: number;
  name: string;
  status: "ready" | "making" | "done";
}
class Manager extends Person {
  totalOrderList:IDrinkOrder[];
  constructor() {
    super();
    this.totalOrderList = []; //현재 누적된 대시보드 리스트
    this.init();
  }

  init() {
    CafeSystem.register({action: 'doneMenu', callback: this.updateDashboard })
    setInterval(() => this.checkOrderList(), 1000)// * 1초마다 매니저는 대시보드를 확인한다.
  }

  // * 매니저는 1초마다 새로운 주문건이 있는지 대시보드를 확인한다.
  checkOrderList() {
    this.totalOrderList = DashBoard.returnOrderList();
    this.findNewOrder();
  }

  // * 새로운 주문건이 있는지 리스트 반복문을 돌며 주문의 상태를 확인한다.
  // * ready 상태의 주문건이 있으면 makeCoffee 액션을 실행시킨다.
  findNewOrder() {
    const newOrder = this.totalOrderList.find(order => order.status === 'ready')
    newOrder && CafeSystem.execute({action:'makeCoffee', payload:newOrder});
  }

  // * 음료가 다 만들어지면, 대시보드를 업데이트 한다.
  updateDashboard(finishedMenuId: number) {
    this.totalOrderList.forEach(order => {
      if (order.id === finishedMenuId) {
        DashBoard.updateDashboard(order);
      }
    })
  }
}

export default Manager;
