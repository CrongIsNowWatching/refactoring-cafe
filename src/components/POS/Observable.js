"use strict";
// import { IOrder } from "./index";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var Observable = /** @class */ (function () {
    function Observable() {
        console.log(11);
        this.observers = new Set();
    }
    Observable.prototype.notify = function (arg) {
        __spreadArray([], __read(this.observers)).forEach(function (observer) { return observer(arg); });
    };
    Observable.prototype.subscribe = function (observer) {
        if (this.observers.has(observer))
            return;
        this.observers.add(observer);
    };
    Observable.prototype.unsubscribe = function (observer) {
        if (!this.observers.has(observer))
            return;
        this.observers["delete"](observer);
    };
    return Observable;
}());
var test = new Observable();
exports["default"] = Observable;
