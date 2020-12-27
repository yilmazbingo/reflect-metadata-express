import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  // RequesHandler is a function that takes req,res
  // so we want our decorators to decorate only the methods that are called with req,res
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const del = routeBinder(Methods.Del);
export const patch = routeBinder(Methods.Patch);

export enum MetadaaKeys { // i keep it here for better understanding
  Method = "method",
  Path = "path",
  Middleware = "middleware",
  Validator = "validator",
}
