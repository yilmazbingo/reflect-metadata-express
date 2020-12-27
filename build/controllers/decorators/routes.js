"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadaaKeys = exports.patch = exports.del = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.Get);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.put = routeBinder(Methods_1.Methods.Put);
exports.del = routeBinder(Methods_1.Methods.Del);
exports.patch = routeBinder(Methods_1.Methods.Patch);
var MetadaaKeys;
(function (MetadaaKeys) {
    MetadaaKeys["Method"] = "method";
    MetadaaKeys["Path"] = "path";
    MetadaaKeys["Middleware"] = "middleware";
    MetadaaKeys["Validator"] = "validator";
})(MetadaaKeys = exports.MetadaaKeys || (exports.MetadaaKeys = {}));
