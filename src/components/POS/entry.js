"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var Person_1 = require("./Person");
var pos = new index_1["default"]();
var person = new Person_1["default"]();
person.subscribe(pos.setOrderList);
person.notify({ menu: "latte", count: 1 });
