import Person from "../Person/";
import CafeSystem from "components/CafeSystem";
// import POS from "components/POS";

// * 매니저 -> 시스템 -> 바리스타
// 바리스타는 시스템에 등록 되어야 함 (makeCoffee)
// 매니저는 시스템을 통해 바리스타의 makeCoffee를 호출 해야함
// 매니저는 현황판을 본다 -> 

interface IDrinkOrder {
  id: number;
  name: string;
  status: "ready" | "making" | "done";
}

class Barista extends Person{
  currentMenu:string | null ;
  isWorking: boolean;
  menuInfo:IDrinkOrder | null;

  constructor(){
    super()
    this.currentMenu = null;
    this.isWorking = false;
    this.menuInfo = null;
  }

  registerAction() {
    CafeSystem.register({action: 'makeCoffee', callback: this.makeCoffee
    })
  }

  setMenuList(menuInfo:IDrinkOrder){
    this.menuInfo = menuInfo
  }

  setCurrentMenu(menu:string){
    this.currentMenu = menu;
  }

  makeCoffee(menu:IDrinkOrder){
    const {name} = menu;
    this.setCurrentMenu(name);
    this.setMenuList(menu)
    this.printAction("START")

    const timer = setTimeout(( 
      ()=> {
        this.printAction("END")
      }),2000)
    
  }

  endMakeCoffee(){
    if(!this.menuInfo) return;
    const {id} = this.menuInfo;
    CafeSystem.execute({action:"doneMenu", payload: this.menuInfo});
  }

  printAction(action: "START"|"END") {
    if(!this.currentMenu) {
      console.log("현재 접수된 주문이 없습니다.")
      return; 
    }
    
    let message;

    if(action === "START"){
      message = `${this.currentMenu}를 만들기 시작했습니다.`
    }else if(action ==="END"){
      message = `${this.currentMenu}가 완성되었습니다.`
    }
    
    console.log(message);
  }
}

export default Barista;

// * 바리스타(Barista)는 동시에 2개까지 음료를 만들 수 있다고 가정한다.
// * 바리스타는 음료를 만들기 시작할 때와 끝날 때 마다 이벤트를 발생한다.
// * 이벤트가 발생할 때마다 음료 작업에 대한 로그를 출력한다.
// * 바리스타 음료 제작 완료 -> 매니저가 대시보드에 업데이트