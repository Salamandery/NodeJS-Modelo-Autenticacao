const { Router } = require("express");
const UserController = require("./app/controller/userController");
const SessionController = require("./app/controller/sessionController");

class Routes {
  constructor() {
    this.Routers = new Router();
    this.routes();
  }

  routes() {
    this.Routers.post("/auth", SessionController.setToken);

    this.Routers.use(SessionController.getToken);

    this.Routers.get("/user", UserController.index);
  }
}

module.exports = new Routes().Routers;
