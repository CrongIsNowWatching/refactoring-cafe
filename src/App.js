"use strict";
exports.__esModule = true;
var Manager_1 = require("./src/components/Manager");
var Cashier_1 = require("./src/components/Cashier");
var Barista_1 = require("./src/components/Barista");
var App = /** @class */ (function () {
    function App() {
        this.manager = null;
        this.cashier = null;
        this.barista = null;
        this.init();
    }
    App.prototype.init = function () {
        this.manager = new Manager_1["default"]();
        this.cashier = new Cashier_1["default"]();
        this.barista = new Barista_1["default"]();
    };
    App.prototype.execute = function () {
        var _a;
        (_a = this.cashier) === null || _a === void 0 ? void 0 : _a.getOrder('americano', 5000);
    };
    return App;
}());
exports["default"] = App;
