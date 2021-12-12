import Person from "../Person/";
import CafeSystem from "components/CafeSystem";
import DashBoard from "components/DashBoard";

//캐셔 주문 받는다 > POS 주문을 받은걸 대시보드에 업데이트 > 대시보드는 업데이트 한걸 배열에 가지고 있다 
//매니저는 대시보드를 계속 보고있다(checkOrderList). 지금 바리스타가 음료를 만들고 있지 않다면 대시보드의 주문표를 준다. 
//바리스타는 받은 주문표리스트에 있는 음료를 최대 2개까지 동시에 만든다. 바리스타가 음료를 다 만들면 시스템을 통해 완성됨을 알린다.
//매니저는 대시보드를 보고있다가 바리스타가 음료 상태 업데이트 해주면 음료를 ?????
// Manager도 makeCoffee에 대한 action을 register 해야함.
//매니저(Manager)는 바리스타가 보낸 특정 고객의 음료 제작 완료 이벤트를 받으면 현황판을 업데이트한다.
//매니저(Manager)는 음료를 확인하기 위해서 주문 대기표를 1초마다 확인한다.
class Manager extends Person {
  constructor() {
    super();
    this.totalOrderList = [];
  }

  // * 주문 대기표(orderList)를 1초마다 확인한다.
  // * 바리스타가 음료제작완료 이벤트를 발생시키면 dashboard를 업데이트 한다.

  checkOrderList() {
    this.totalOrderList = DashBoard.returnOrderList();
  }


  subscribeDashboard() {
    CafeSystem.register({
      action: "newOrderCameIn",
      callback: this.notifyBarista,
    });
    CafeSystem.register({
      action: "drinkIsReady",
      callback: this.updateDashboard,
    });
    // -------test--------
    CafeSystem.register({
      action: "makeDrink",
      callback: () => {
        console.log("바리스타가 음료를 만들기 시작했습니다.");
      },
    });
    CafeSystem.register({
      action: "ringBuzzer",
      callback: () => {
        console.log("현황판에 완성된 주문번호를 업데이트 하였습니다.");
      },
    });
    // ------------------
  }

  // * manager는 시스템에 업데이트 한다.(o)
  // * 바리스타에 직접 알려주지 않음. 바리스타가 시스템을 구독(x)
  notifyBarista() {
    () => {
      //notifyBarista
      console.log("notifyBarista");
      CafeSystem.execute("makeDrink"); //barista가 makeDrink라는 걸 구독하고 있다는 가정.
    };
  }

  updateDashboard() {
    () => {
      //updateDashboard
      console.log("updateDashboard");
      CafeSystem.execute("ringBuzzer"); //dashBoard가 ringBuzzer라는 걸 구독하고 있다는 가정.
    };
  }
}

export default Manager;
