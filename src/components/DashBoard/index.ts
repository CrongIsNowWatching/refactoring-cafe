// 현황판(DashBoard)는 음료 주문 완성표를 주기적으로 화면에 출력한다.
// 고객별로 음료수에 대해 대기중/제작중/완료 상태를 표시한다.
interface IDrinkOrder {
  id: number;
  name: string;
  status: "ready" | "making" | "done";
}

class DashBoard {
  // private list : any[];
  #list : IDrinkOrder[];
  
  constructor() {
    this.#list = [];
  }
  
  // POS 주문을 받은걸 대시보드에 업데이트
  updateDashboard(payload: IDrinkOrder): undefined|Error {
    if (!!!payload.id && !!!payload.name && !!!payload.status) {
      return new Error("주문이 잘못 업데이트 되었습니다.");
    }
    this.#list.push(payload);
  }
  
  // 바리스타가 음료를 다 만들면 시스템을 통해 완성됨을 알린다.
  doneMenu(payload: {id: number} ) {
    this.#list = this.#list.filter((order) => order.id !== payload.id);
  }

  // 매니저는 대시보드를 계속 보고있다(checkOrderList).
  returnOrderList () {
    return this.#list;
  }
  
}

export default DashBoard;

// 바리스타(Barista)는 동시에 2개까지 음료를 만들 수 있다고 가정한다.
// 스레드를 직접 생성하는 게 아니라 이벤트 방식으로 동작해야 한다.
  // -> 이거는 우리 설계와 맞지 않는다.

// 바리스타는 음료를 만들기 시작할 때와 끝날 때 마다 이벤트를 발생한다.

// 이벤트가 발생할 때마다 음료 작업에 대한 로그를 출력한다.

//캐셔 주문 받는다 > POS 주문을 받은걸 대시보드에 업데이트 > 대시보드는 업데이트 한걸 배열에 가지고 있다 
//매니저는 대시보드를 계속 보고있다(checkOrderList). 지금 바리스타가 음료를 만들고 있지 않다면 대시보드의 주문표를 준다. 
//바리스타는 받은 주문표리스트에 있는 음료를 최대 2개까지 동시에 만든다. 바리스타가 음료를 다 만들면 시스템을 통해 완성됨을 알린다.
//매니저는 대시보드를 보고있다가 바리스타가 음료 상태 업데이트 해주면 음료를 ?????


//매니저(Manager)는 바리스타가 보낸 특정 고객의 음료 제작 완료 이벤트를 받으면 현황판을 업데이트한다.
//매니저(Manager)는 음료를 확인하기 위해서 주문 대기표를 1초마다 확인한다.
//주문이 있을 경우 작업이 비어있는 (제작할 수 있는) 바리스타에게 작업 이벤트를 전달한다.