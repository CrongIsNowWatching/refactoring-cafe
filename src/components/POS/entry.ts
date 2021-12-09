import POS from "./index";
import Person from "./Person";

const pos = new POS();
const person = new Person();

person.subscribe(pos.setOrderList);
person.notify({ menu: "latte", count: 1 });
