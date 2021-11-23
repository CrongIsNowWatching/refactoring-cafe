import menu from "../../data/menu.ts"

interface IOrder {
  menu:string;
  count:number;
}

class POS {
  currentOrderList:IOrder[];

  constructor() {
    this.currentOrderNumber = 1; //번
    this.currentOrderList = [];
    this.totalAmount = 0; 
    this.isStart = false;
  }

  private startOrder(){
    this.currentOrderNumber++;
    this.isStart = true;
  }
  
  private resetOrder(){
    this.currentOrderList = [];
    this.totalAmount = 0; 
  }

  checkSameMenuInPOS(menuName){
    return this.currentOrderList.map(order => order.name).includes(menuName)
  }
 
  setCurrentOrderList(order:IOrder){
    if(!this.isStart) return; 
    const {menu,count} = order; 

    this.currentOrderList = [...this.currentOrderList, order] // 연속해서 줄경우
  }
  
  setOrderToDashBoard(){
    //현황판 클래스를 가져와서 등록한다.
     //현황판.등록(this.currentOrderList);
  }
  
  calculateExchangeAmount(receivedMoney :number){
    const {totalAmount} = this.currentOrderList;
    const exchange = totalAmount - receivedMoney
    exchange >= 0 ? return exchange : alert(`${Math.abs(exchange)}원이 부족합니다.`);
  }

  endOrder():number{
    const requestedOrderNumber = this.currentOrderNumber;
    this.resetOrder();
    return requestedOrderNumber;
  }
}

export default POS;
