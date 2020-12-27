"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//type definition files are like adapters. it does not tell everything to ts about the js files. only thing it does, it tells us about the different properties js library exposes to us. issue we are having with express is middlewares. they can add, remove or do anything. for example body parser adds body to the req but ts does not know about it.
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/login");
require("./controllers/RootController");
var AppRouter_1 = require("./AppRouter");
var app = express_1.default();
app.use(body_parser_1.default.json());
// this key will be used to encrypt the info inside the cookie
// if you check the types file, interface for session extends Express.request type
// declare namespace Express {
//     interface Request extends CookieSessionInterfaces.CookieSessionRequest {}}
app.use(cookie_session_1.default({
    keys: ["yilmaz"],
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3200, function () { return console.log("listening"); });
