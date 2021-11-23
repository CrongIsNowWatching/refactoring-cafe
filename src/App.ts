/// <reference path="./@types/App/index.d.ts" />
import { IApp } from "App";

class App implements IApp {
  name: string;
  amount: number;

  constructor() {
    this.name = "app";
    this.amount = 0;
  }
}

export default App;
