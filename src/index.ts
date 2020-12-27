//type definition files are like adapters. it does not tell everything to ts about the js files. only thing it does, it tells us about the different properties js library exposes to us. issue we are having with express is middlewares. they can add, remove or do anything. for example body parser adds body to the req but ts does not know about it.
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/login";
import "./controllers/RootController";
import { AppRouter } from "./AppRouter";
const app = express();

app.use(bodyParser.json());
// this key will be used to encrypt the info inside the cookie
// if you check the types file, interface for session extends Express.request type

// declare namespace Express {
//     interface Request extends CookieSessionInterfaces.CookieSessionRequest {}}
app.use(
  cookieSession({
    keys: ["yilmaz"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3200, () => console.log("listening"));
