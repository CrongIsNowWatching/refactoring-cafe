import Person from "../Person/";

// todo: System 클래스를 만들기

type Action = {
  action: string;
  callback: () => void;
};

class System {
  actionList: Action[];

  constructor() {
    this.actionList = [];
  }

  // todo: notify - 실행되는 이벤트(action)를 파라미터로 받아서 this.actionList에서 일치하는 요소를 찾아 콜백함수를 실행. callback함수는 대상을 포함하고 있어야 함.
  notify(action: string) {
    const targetObserver = this.actionList.find(
      observer => observer.action === action
    );
    targetObserver?.callback();
  }

  // todo: subscribe - this.actionList에 {action:action, callback: fn} 를 push함으로써 구독대상을 최초에 한번 등록.
  subscribe({ action, callback }: Action) {
    this.actionList.push({
      action: action,
      callback: callback,
    });
  }
}

let system = new System();

class Manager extends Person {
  constructor() {
    super();
  }

  // * 주문 대기표(orderList)를 1초마다 확인한다.
  // * 바리스타가 음료제작완료 이벤트를 발생시키면 dashboard를 업데이트 한다.

  subscribeOrderList() {
    system.subscribe({
      action: "newOrderCameIn",
      callback: this.notifyBarista,
    });
    system.subscribe({
      action: "drinkIsReady",
      callback: this.updateDashboard,
    });
    // -------test--------
    system.subscribe({
      action: "makeDrink",
      callback: () => {
        console.log("바리스타가 음료를 만들기 시작했습니다.");
      },
    });
    system.subscribe({
      action: "ringBuzzer",
      callback: () => {
        console.log("현황판에 완성된 주문번호를 업데이트 하였습니다.");
      },
    });
    // ------------------
  }

  notifyBarista() {
    () => {
      //notifyBarista
      console.log("notifyBarista");
      system.notify("makeDrink"); //barista가 makeDrink라는 걸 구독하고 있다는 가정.
    };
  }

  updateDashboard() {
    () => {
      //updateDashboard
      console.log("updateDashboard");
      system.notify("ringBuzzer"); //dashBoard가 ringBuzzer라는 걸 구독하고 있다는 가정.
    };
  }
}

export default Manager;
