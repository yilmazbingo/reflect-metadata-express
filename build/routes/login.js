"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
// express converts the request into a req object. it even includes the api address of the request. by default "req" has no body property.
// the problem is sometimes those files tell wrong to ts. if, i comment out bodyParser middleware function from index.ts, "  const { email, password } = req.body; this code will not complain. because types files defined "body:any"
router.get("/", function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("<div>\n    <div>you are in</div>\n    <a href=\"/logout\">logout</a></div>");
    }
    else {
        res.send("\n    <div>\n    <div>you are not logged in</div>\n    <a href=\"/login\">Login</a></div>\n    ");
    }
});
router.get("/logout", function (req, res) {
    req.session = null;
    res.redirect("/");
});
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send("Not Permitted");
}
router.get("/protected", requireAuth, function (req, res) {
    res.send("this is protected");
});
