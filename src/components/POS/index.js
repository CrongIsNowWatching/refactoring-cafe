"use strict";
exports.__esModule = true;
var menu_1 = require("../../data/menu");
var POS = /** @class */ (function () {
    function POS() {
        this.orderList = new Map();
        this.orderNumber = 1;
        this.totalAmount = 0;
        this.isStart = false;
        this.menu = menu_1["default"];
    }
    POS.prototype.startOrder = function () {
        this.orderNumber++;
        this.isStart = true;
    };
    POS.prototype.resetOrder = function () {
        this.orderList = new Map();
        this.totalAmount = 0;
    };
    POS.prototype.setOrderList = function (order) {
        console.log("setOrderList");
        // this.startOrder();
        this.orderNumber++;
        this.isStart = true;
        var menu = order.menu, count = order.count;
        this.orderList.set(menu, count);
    };
    POS.prototype.calculateExchangeAmount = function (receivedMoney) {
        //캐셔가 사용
        console.log("calculateExchangeAmount");
        var exchange = this.totalAmount - receivedMoney;
        exchange >= 0 ? exchange : alert(Math.abs(exchange) + "\uC6D0\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.");
    };
    POS.prototype.endOrder = function () {
        //캐셔가 사용
        var requestedOrderNumber = this.orderNumber;
        this.resetOrder();
        return requestedOrderNumber;
    };
    return POS;
}());
exports["default"] = POS;
