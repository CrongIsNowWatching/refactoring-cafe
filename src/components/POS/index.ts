import {menu, menuType} from "../../data/menu";
import DashBoard from "../DashBoard/";
interface IDrinkOrder {
  id: number;
  name: string;
  status: "ready" | "making" | "done";
}

class POS {
  order:IDrinkOrder | null;
  orderNumber: number; //주문번호
  isStart: boolean; //주문 시작 여부
  menuData: typeof menu;

  constructor() {
    this.order = null;
    this.orderNumber = 1;
    this.isStart = false;
    this.menuData = menu;
  }

  startOrder() {
    this.orderNumber++;
    this.isStart = true;
  }

  resetOrder() {
    this.order = null;
  }

  setOrder(order: string) {
    this.startOrder();
    this.order = {
      id: this.orderNumber,
      name: order,
      status: "ready"
    }
  }

  getMenuPriceInfo(order:string){
    const price = this.menuData.get(order)
    return price ? price : 0
  }

  calculateExchangeAmount(receivedMoney: number) {
    if(!this.order) return;
    const {name} = this.order
    const menuPrice = this.getMenuPriceInfo(name);
    const exchange = menuPrice && menuPrice - receivedMoney;

    return exchange >= 0 ? exchange : 0
  }

  endOrder(): number {
    if(this.order) DashBoard.updateDashboard(this.order)
    const currentOrderNumber = this.orderNumber;
    this.resetOrder();

    return currentOrderNumber;
  }
}
const pos = new POS();

export default pos;
