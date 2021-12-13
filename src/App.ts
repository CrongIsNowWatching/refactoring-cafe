import Manager from "./src/components/Manager";
import Cashier from "./src/components/Cashier";
import Barista from "./src/components/Barista";

class App {
  manager: null | Manager;
  cashier: null | Cashier;
  barista: null | Barista;
  
  constructor() {
    this.manager = null;
    this.cashier = null;
    this.barista = null;
    this.init();
  }

  init() {
    this.manager = new Manager();
    this.cashier = new Cashier();
    this.barista = new Barista();
  }

  execute() {
    this.cashier?.getOrder('americano', 5000);
  }
  
}

export default App;
