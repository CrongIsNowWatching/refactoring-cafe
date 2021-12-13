const menu = new Map([
  ["americano", 4000],
  ["latte", 4500],
  ["milk", 5000],
  ["cappuccino", 5500]],
);

enum menuType {
  AMERICANO = "americano",
  LATTE = "latte",
  MILK= "milk",
  CAPPUCCINO = "cappuccino",
}

type TMenu ="americano" | "latte" | "milk" | "cappuccino";

export {menu, menuType};
export type {TMenu}