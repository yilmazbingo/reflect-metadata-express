"use strict";
// it will iterate over all of the different properties of the class' prototype and it's going to see if those methods have any metada associated with them. i fthey do, it  is going to take that medata infromation and associate it with express router
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
//  controller will take prefix "/auth"
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    // target is the constructor function of the class. if we apply decorator to a method, its target would be the prototype
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        // lookign for middleware
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key]; //getLogin
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Middleware, target.prototype, key) ||
                [];
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [routeHandler]));
            }
        }
    };
}
exports.controller = controller;
