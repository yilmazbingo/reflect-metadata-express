import {
  Request,
  Response,
  Router,
  RequestHandler,
  NextFunction,
} from "express";

import { get, controller, use, bodyValidator, post } from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("request was made");
  next();
}

@controller("/auth")
class LoginController {
  @get("/login") // this is going to set up  the metadata
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
        <form action="" method="POST">
        <div class="">
          <label for="">Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label for="">Password</label>
          <input type="password" name="password" />
        </div>
        <button>Submit</button>
      </form>
      
        `);
  }
  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "test@test.com" && password === "12345") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("invali dcredentials");
    }
  }
  @get("logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}
