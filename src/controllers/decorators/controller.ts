// it will iterate over all of the different properties of the class' prototype and it's going to see if those methods have any metada associated with them. i fthey do, it  is going to take that medata infromation and associate it with express router

//  controller will take prefix "/auth"
import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler, NextFunction, Request, Response } from "express";

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("invalid request");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send("invalid request");
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  // target is the constructor function of the class. if we apply decorator to a method, its target would be the prototype
  return function (target: Function) {
    const router = AppRouter.getInstance();
    // lookign for middleware
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key]; //getLogin
      const path = Reflect.getMetadata(
        MetadataKeys.Path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.Validator, target.prototype, key) ||
        [];
      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
